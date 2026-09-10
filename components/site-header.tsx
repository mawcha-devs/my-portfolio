'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AppLink } from '@/components/ui/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/education', label: 'Education' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Go to homepage"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.2)]">
            MH
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
              Mawcha
            </span>
            <span className="text-[10px] text-muted-foreground">
              Software Developer
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 xl:gap-4 lg:flex">
          {navItems.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              className={cn(
                'relative py-2 text-[0.62rem] font-medium uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground xl:text-[0.68rem] xl:tracking-[0.14em]',
                pathname === item.href &&
                  'text-foreground after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-primary',
              )}
            >
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link href="/contact" className="shrink-0">
            <Button size="sm">Let’s Connect</Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
          >
            <span className="sr-only">Open menu</span>
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-4 rounded bg-current" />
              <span className="block h-0.5 w-4 rounded bg-current" />
              <span className="block h-0.5 w-4 rounded bg-current" />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border bg-background/95 lg:hidden">
          <nav className="container-shell flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground',
                  pathname === item.href &&
                    'bg-muted text-foreground',
                )}
              >
                {item.label}
              </AppLink>
            ))}
            <Link href="/contact" className="mt-2">
              <Button className="w-full">
                Let’s Connect
              </Button>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
