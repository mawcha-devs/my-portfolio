'use client';

import * as React from 'react';
import { useFormStatus } from 'react-dom';

export function AdminSubmitButton({
  children,
  pendingLabel = 'Saving...',
}: {
  children: React.ReactNode;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export function AdminActionButton({
  children,
  confirmMessage,
  pendingLabel = 'Working...',
}: {
  children: React.ReactNode;
  confirmMessage?: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (
          confirmMessage &&
          !window.confirm(confirmMessage)
        )
          event.preventDefault();
      }}
      className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-primary/10 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
