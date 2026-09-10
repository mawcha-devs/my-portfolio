'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <div className="surface mx-auto max-w-xl p-10 text-center">
          <p className="eyebrow">Error</p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Something went wrong
          </h1>
          <p className="mt-4 text-muted-foreground">
            The page could not be rendered correctly. Please
            try again.
          </p>
          <div className="mt-8 flex justify-center">
            <Button onClick={() => reset()}>
              Try again
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
