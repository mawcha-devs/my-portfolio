import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase/client';

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

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
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
            'Unable to send your message right now. Please try again later.',
        },
        { status: 502 },
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

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Please send a valid message request.' },
      { status: 400 },
    );
  }
}
