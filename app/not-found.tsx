import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <div className="surface mx-auto max-w-xl p-10 text-center">
          <p className="eyebrow">404</p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="mt-4 text-muted-foreground">
            The page you were looking for does not exist or
            has moved.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/">
              <Button>Back to home</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
