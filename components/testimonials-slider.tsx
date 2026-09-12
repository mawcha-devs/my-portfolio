'use client';

import * as React from 'react';
import type { TestimonialRecord } from '@/lib/data/portfolio';

export function TestimonialsSlider({
  testimonials,
}: {
  testimonials: TestimonialRecord[];
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const hasTestimonials = testimonials.length > 0;

  React.useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % testimonials.length,
      );
    }, 7000);
    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  if (!hasTestimonials) {
    return (
      <div className="surface border-dashed p-6 sm:p-8">
        <p className="eyebrow">Testimonials</p>
        <p className="text-xl font-semibold tracking-tight">
          Testimonials coming soon.
        </p>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          This space is ready for verified feedback from
          collaborators, teammates, or clients. No
          testimonial has been fabricated.
        </p>
      </div>
    );
  }

  const active = testimonials[activeIndex];
  const previous = () =>
    setActiveIndex(
      (current) =>
        (current - 1 + testimonials.length) %
        testimonials.length,
    );
  const next = () =>
    setActiveIndex(
      (current) => (current + 1) % testimonials.length,
    );

  return (
    <div
      className="surface overflow-hidden p-6 sm:p-8"
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 motion-reduce:transition-none"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="min-w-full"
              aria-hidden={testimonial.id !== active.id}
            >
              <p className="text-xl leading-9 text-foreground sm:text-2xl">
                “{testimonial.quote}”
              </p>
              <footer className="mt-7 border-t border-border pt-5">
                <p className="font-semibold">
                  {testimonial.authorName}
                </p>
                {testimonial.authorRole ||
                testimonial.organization ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[
                      testimonial.authorRole,
                      testimonial.organization,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                ) : null}
              </footer>
            </article>
          ))}
        </div>
      </div>
      {testimonials.length > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div
            className="flex gap-2"
            aria-label="Testimonial slides"
          >
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={
                  index === activeIndex ? 'true' : undefined
                }
                onClick={() => setActiveIndex(index)}
                className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40 transition-colors hover:bg-primary aria-[current=true]:bg-primary"
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
              className="rounded-lg border border-border px-3 py-2 text-sm hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="rounded-lg border border-border px-3 py-2 text-sm hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              &rarr;
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
