import Link from 'next/link';

const footerLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container-shell flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">
            Mawcha Haftu
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Software Developer based in Mekelle
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
