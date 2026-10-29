import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase/client';
import { profile } from '@/lib/data/portfolio';

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimit = new Map<string, RateLimitEntry>();
const windowMs = 10 * 60 * 1000;
const maxRequests = 5;

function textValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function validate(payload: ContactPayload) {
  const name = textValue(payload.name);
  const email = textValue(payload.email).toLowerCase();
  const subject = textValue(payload.subject);
  const message = textValue(payload.message);
  const errors: Record<string, string> = {};

  if (textValue(payload.website)) {
    errors.form = 'Unable to submit this message.';
  }
  if (name.length < 2 || name.length > 100) {
    errors.name =
      'Name must be between 2 and 100 characters.';
  }
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254
  ) {
    errors.email = 'Enter a valid email address.';
  }
  if (subject.length < 2 || subject.length > 160) {
    errors.subject =
      'Subject must be between 2 and 160 characters.';
  }
  if (message.length < 10 || message.length > 5000) {
    errors.message =
      'Message must be between 10 and 5,000 characters.';
  }

  return {
    values: { name, email, subject, message },
    errors,
  };
}

function clientKey(request: Request) {
  return (
    request.headers
      .get('x-forwarded-for')
      ?.split(',')[0]
      ?.trim() ?? 'unknown'
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

async function sendContactEmail(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to =
    process.env.CONTACT_EMAIL_TO ?? profile.email;
  if (!apiKey || !from) {
    return {
      configured: false as const,
    };
  }

  const response = await fetch(
    'https://api.resend.com/emails',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Portfolio contact: ${values.subject}`,
        text: [
          `From: ${values.name} <${values.email}>`,
          '',
          values.message,
        ].join('\n'),
        html: `<p><strong>From:</strong> ${escapeHtml(values.name)} &lt;${escapeHtml(values.email)}&gt;</p><p><strong>Subject:</strong> ${escapeHtml(values.subject)}</p><p>${escapeHtml(values.message).replace(/\n/g, '<br>')}</p>`,
      }),
    },
  );
  if (!response.ok) {
    return {
      configured: true as const,
      sent: false as const,
      status: response.status,
    };
  }

  return {
    configured: true as const,
    sent: true as const,
  };
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const configuredOrigin =
    process.env.NEXT_PUBLIC_APP_URL ??
    new URL(request.url).origin;
  if (origin) {
    try {
      if (
        new URL(origin).origin !==
        new URL(configuredOrigin).origin
      ) {
        return NextResponse.json(
          { error: 'Invalid request origin.' },
          { status: 403 },
        );
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid request origin.' },
        { status: 403 },
      );
    }
  }

  const contentLength = Number(
    request.headers.get('content-length') ?? 0,
  );
  if (contentLength > 64 * 1024) {
    return NextResponse.json(
      { error: 'Request is too large.' },
      { status: 413 },
    );
  }

  const key = clientKey(request);
  const now = Date.now();
  const current = rateLimit.get(key);

  if (
    current &&
    current.resetAt > now &&
    current.count >= maxRequests
  ) {
    return NextResponse.json(
      {
        error: 'Too many messages. Please try again later.',
      },
      { status: 429 },
    );
  }

  try {
    const payload =
      (await request.json()) as ContactPayload;
    const result = validate(payload);

    if (Object.keys(result.errors).length) {
      return NextResponse.json(
        {
          error: 'Please correct the highlighted fields.',
          fields: result.errors,
        },
        { status: 400 },
      );
    }

    const supabase = createSupabaseClient();
    if (!supabase) {
      return NextResponse.json(
        {
          error:
            'The contact service is not configured yet.',
        },
        { status: 503 },
      );
    }

    rateLimit.set(key, {
      count:
        current && current.resetAt > now
          ? current.count + 1
          : 1,
      resetAt:
        current && current.resetAt > now
          ? current.resetAt
          : now + windowMs,
    });

    const emailResult = await sendContactEmail(
      result.values,
    );
    if (!emailResult.configured) {
      return NextResponse.json(
        {
          error:
            'Email delivery is not configured. Please contact the site owner directly.',
        },
        { status: 503 },
      );
    }
    if (!emailResult.sent) {
      console.error(
        'Contact email delivery failed with provider status:',
        emailResult.status,
      );
      return NextResponse.json(
        {
          error:
            'Your message could not be emailed right now. Please try again later.',
        },
        { status: 502 },
      );
    }

    const { error } = await supabase
      .from('contact_messages')
      .insert(result.values as never);
    if (error) {
      console.error(
        'Contact message insert failed:',
        error.message,
      );
      return NextResponse.json(
        {
          error:
            'Your email was sent, but the message could not be archived.',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Your message was emailed and saved successfully.',
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Please send a valid message request.' },
        { status: 400 },
      );
    }
    console.error(
      'Contact request failed unexpectedly:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return NextResponse.json(
      {
        error:
          'Unable to process your message right now. Please try again later.',
      },
      { status: 502 },
    );
  }
}
