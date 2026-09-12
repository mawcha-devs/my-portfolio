import type { MetadataRoute } from 'next';
import { getPortfolioData } from '@/lib/data/portfolio';
import { getSiteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects, blogPosts } = await getPortfolioData();
  const staticRoutes = [
    ['/', 1],
    ['/projects', 0.9],
    ['/experience', 0.7],
    ['/about', 0.7],
    ['/skills', 0.7],
    ['/education', 0.6],
    ['/certifications', 0.6],
    ['/achievements', 0.6],
    ['/blog', 0.8],
    ['/resume', 0.8],
    ['/contact', 0.6],
  ] as const;
  const baseUrl = getSiteUrl();
  const now = new Date();

  return [
    ...staticRoutes.map(([route, priority]) => ({
      url: new URL(route, baseUrl).toString(),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority,
    })),
    ...projects
      .filter((project) => project.published)
      .map((project) => ({
        url: new URL(
          `/projects/${project.slug}`,
          baseUrl,
        ).toString(),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
    ...blogPosts
      .filter((post) => post.published)
      .map((post) => ({
        url: new URL(
          `/blog/${post.slug}`,
          baseUrl,
        ).toString(),
        lastModified: post.updatedAt
          ? new Date(post.updatedAt)
          : now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
  ];
}
