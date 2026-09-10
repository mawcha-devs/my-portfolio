import type { Metadata } from 'next';
//import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ??
      'http://localhost:3000',
  ),
  title: {
    default:
      process.env.NEXT_PUBLIC_SITE_NAME ??
      'Mawcha Haftu Portfolio',
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME ?? 'Mawcha Haftu Portfolio'}`,
  },
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
    'Portfolio of Mawcha Haftu, a software developer focused on mobile, full-stack, and backend engineering.',
  openGraph: {
    title:
      process.env.NEXT_PUBLIC_SITE_NAME ??
      'Mawcha Haftu Portfolio',
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
      'Portfolio of Mawcha Haftu, a software developer focused on mobile, full-stack, and backend engineering.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      process.env.NEXT_PUBLIC_SITE_NAME ??
      'Mawcha Haftu Portfolio',
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
      'Portfolio of Mawcha Haftu, a software developer focused on mobile, full-stack, and backend engineering.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background text-foreground antialiased',
        )}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
