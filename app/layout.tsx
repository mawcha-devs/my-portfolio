import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { cn } from '@/lib/utils';
import {
  getSiteDescription,
  getSiteName,
  getSiteUrl,
} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  alternates: { canonical: getSiteUrl() },
  title: {
    default: getSiteName(),
    template: `%s | ${getSiteName()}`,
  },
  description: getSiteDescription(),
  openGraph: {
    title: getSiteName(),
    description: getSiteDescription(),
    url: getSiteUrl(),
    siteName: getSiteName(),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: getSiteName(),
    description: getSiteDescription(),
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
