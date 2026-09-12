'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

type FieldErrors = Partial<
  Record<keyof FormValues | 'form', string>
>;

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2)
    errors.name = 'Enter your name.';
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = 'Enter a valid email address.';
  }
  if (values.subject.trim().length < 2)
    errors.subject = 'Add a subject.';
  if (values.message.trim().length < 10)
    errors.message = 'Write at least 10 characters.';
  return errors;
}

export function ContactForm() {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState<FieldErrors>(
    {},
  );
  const [status, setStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [serverMessage, setServerMessage] =
    React.useState('');

  function updateValue(
    field: keyof FormValues,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: undefined,
      form: undefined,
    }));
    if (status !== 'idle') setStatus('idle');
  }

  async function submit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setStatus('error');
      setServerMessage(
        'Please correct the highlighted fields.',
      );
      return;
    }

    setStatus('loading');
    setErrors({});
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fields?: FieldErrors;
      };

      if (!response.ok) {
        setErrors(result.fields ?? {});
        setServerMessage(
          result.error ?? 'Unable to send your message.',
        );
        setStatus('error');
        return;
      }

      setValues(initialValues);
      setServerMessage(
        'Thanks. Your message has been sent.',
      );
      setStatus('success');
    } catch {
      setServerMessage(
        'Unable to reach the contact service. Please try again later.',
      );
      setStatus('error');
    }
  }

  const fields = [
    {
      name: 'name' as const,
      label: 'Name',
      type: 'text',
      placeholder: 'Your name',
      autoComplete: 'name',
    },
    {
      name: 'email' as const,
      label: 'Email',
      type: 'email',
      placeholder: 'you@example.com',
      autoComplete: 'email',
    },
    {
      name: 'subject' as const,
      label: 'Subject',
      type: 'text',
      placeholder: 'What would you like to discuss?',
      autoComplete: 'off',
    },
  ];

  return (
    <form
      onSubmit={submit}
      noValidate
      className="space-y-5"
      aria-describedby="contact-status"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) =>
            updateValue('website', event.target.value)
          }
        />
      </div>
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-2 block text-sm font-medium"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            required
            autoComplete={field.autoComplete}
            value={values[field.name]}
            onChange={(event) =>
              updateValue(field.name, event.target.value)
            }
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={
              errors[field.name]
                ? `${field.name}-error`
                : undefined
            }
            placeholder={field.placeholder}
            className="field"
          />
          {errors[field.name] ? (
            <p
              id={`${field.name}-error`}
              className="mt-2 text-sm text-danger"
            >
              {errors[field.name]}
            </p>
          ) : null}
        </div>
      ))}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={values.message}
          onChange={(event) =>
            updateValue('message', event.target.value)
          }
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? 'message-error' : undefined
          }
          placeholder="Tell me a little about your project or question."
          className="field min-h-40 resize-y"
        />
        {errors.message ? (
          <p
            id="message-error"
            className="mt-2 text-sm text-danger"
          >
            {errors.message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading'
            ? 'Sending...'
            : 'Send message'}
        </Button>
        <p
          id="contact-status"
          role="status"
          aria-live="polite"
          className={
            status === 'success'
              ? 'text-sm text-success'
              : 'text-sm text-danger'
          }
        >
          {serverMessage}
        </p>
      </div>
      {errors.form ? (
        <p role="alert" className="text-sm text-danger">
          {errors.form}
        </p>
      ) : null}
    </form>
  );
}
