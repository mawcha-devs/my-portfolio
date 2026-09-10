import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PageHeader } from '@/components/page-shell';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArticleContent } from '@/components/blog/article-content';
import { getPortfolioData } from '@/lib/data/portfolio';

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
  }).format(new Date(value));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { blogPosts } = await getPortfolioData();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Engineering Note"
        title={post.title}
        description={post.excerpt ?? undefined}
      />
      <section className="section-shell pt-0">
        <div className="container-shell">
          <article className="mx-auto max-w-3xl">
            <Card className="overflow-hidden p-0">
              {post.coverImageUrl ? (
                <Image
                  src={post.coverImageUrl}
                  alt=""
                  width={1600}
                  height={900}
                  className="max-h-[28rem] w-full object-cover"
                />
              ) : null}
              <div className="p-6 sm:p-10">
                <div className="mb-9 flex flex-wrap items-center gap-2 border-b border-border pb-6">
                  {formatDate(post.publishedAt) ? (
                    <span className="text-sm text-muted-foreground">
                      Published{' '}
                      {formatDate(post.publishedAt)}
                    </span>
                  ) : null}
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <ArticleContent content={post.content} />
              </div>
            </Card>
          </article>
        </div>
      </section>
    </>
  );
}
