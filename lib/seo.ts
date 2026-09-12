import type { Metadata } from 'next';

export function getSiteUrl() {
  return new URL(
    process.env.NEXT_PUBLIC_APP_URL ??
      'http://localhost:3000',
  );
}

export function getSiteName() {
  return (
    process.env.NEXT_PUBLIC_SITE_NAME ??
    'Mawcha Haftu Portfolio'
  );
}

export function getSiteDescription() {
  return (
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
    'Portfolio of Mawcha Haftu, a software developer focused on mobile, full-stack, backend, and applied machine learning work.'
  );
}

export function createPageMetadata({
  title,
  description,
  path,
  type = 'website',
  image,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string | null;
}): Metadata {
  const siteName = getSiteName();
  const url = new URL(path, getSiteUrl());
  const images = image
    ? [{ url: image, alt: title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type,
      images,
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
