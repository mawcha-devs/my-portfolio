import * as React from 'react';

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="section-shell pb-8">
      <div className="container-shell">
        {eyebrow ? (
          <p className="eyebrow">{eyebrow}</p>
        ) : null}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}

export function SectionBlock({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className ?? 'section-shell'}>
      <div className="container-shell">
        <div className="mb-8 max-w-2xl">
          <h2 className="section-title">{title}</h2>
          {description ? (
            <p className="mt-3 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
