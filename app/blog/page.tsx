import Link from 'next/link';
import { PageHeader } from '@/components/page-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPortfolioData } from '@/lib/data/portfolio';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Engineering Notes',
  description:
    'Technical notes about software architecture, implementation choices, mobile development, and project lessons.',
  path: '/blog',
});

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(new Date(value));
}

export default async function BlogPage() {
  const { blogPosts } = await getPortfolioData();

  return (
    <>
      <PageHeader
        eyebrow="Engineering Notes"
        title="Blog"
        description="Technical notes about software architecture, implementation choices, mobile development, and lessons from real project work."
      />
      <section className="section-shell pt-0">
        <div className="container-shell">
          {blogPosts.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="flex h-full flex-col"
                >
                  <CardHeader className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {formatDate(post.publishedAt) ? (
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {formatDate(post.publishedAt)}
                        </span>
                      ) : null}
                      {post.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                    <CardTitle className="mt-2">
                      {post.title}
                    </CardTitle>
                    {post.excerpt ? (
                      <CardDescription className="leading-7">
                        {post.excerpt}
                      </CardDescription>
                    ) : null}
                  </CardHeader>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline">
                      Read note
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mx-auto max-w-3xl p-8 text-center sm:p-12">
              <p className="eyebrow">Coming soon</p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Engineering Notes coming soon.
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
                Technical writing will appear here once an
                article is ready to publish. No placeholder
                articles are being presented as real work.
              </p>
              <Link
                href="/projects"
                className="mt-7 inline-flex"
              >
                <Button variant="outline">
                  Explore projects
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
