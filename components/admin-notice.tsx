'use client';

import { useSearchParams } from 'next/navigation';

export function AdminNotice() {
  const params = useSearchParams();
  const status = params.get('status');
  if (!status) return null;
  const message =
    status === 'deleted'
      ? 'Item deleted.'
      : status === 'published'
        ? 'Publication status updated.'
        : 'Changes saved successfully.';
  return (
    <p
      role="status"
      className="mb-6 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success"
    >
      {message}
    </p>
  );
}
