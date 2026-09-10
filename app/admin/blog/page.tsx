import { PageHeader } from '@/components/page-shell';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AdminActionButton,
  AdminSubmitButton,
} from '@/components/admin-controls';
import { getAuthorizedSupabaseClient } from '@/lib/supabase/auth';
import {
  deletePost,
  savePost,
  togglePostPublished,
} from '@/app/admin/actions';

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
};
function PostForm({ post }: { post?: Post }) {
  return (
    <form
      action={savePost}
      className="grid gap-3 md:grid-cols-2"
    >
      {post ? (
        <input type="hidden" name="id" value={post.id} />
      ) : null}
      <input
        name="title"
        required
        defaultValue={post?.title}
        placeholder="Title"
        className="field"
      />
      <input
        name="slug"
        required
        defaultValue={post?.slug}
        placeholder="Slug"
        className="field"
      />
      <input
        name="tags"
        defaultValue={post?.tags.join(', ')}
        placeholder="Tags, comma separated"
        className="field"
      />
      <input
        name="cover_image_url"
        defaultValue={post?.cover_image_url ?? ''}
        placeholder="Optional cover image URL"
        className="field"
      />
      <label className="text-sm text-muted-foreground">
        Upload cover (JPEG, PNG, WebP, or AVIF; up to 5 MB)
        <input
          name="cover_image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="field mt-2"
        />
      </label>
      <textarea
        name="excerpt"
        defaultValue={post?.excerpt ?? ''}
        placeholder="Excerpt"
        className="field min-h-24 md:col-span-2"
      />
      <textarea
        name="content"
        required
        defaultValue={post?.content}
        placeholder="Markdown-style content"
        className="field min-h-64 md:col-span-2"
      />
      <label className="text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published}
        />{' '}
        Published
      </label>
      <div className="md:justify-self-end">
        <AdminSubmitButton>
          {post ? 'Update note' : 'Create note'}
        </AdminSubmitButton>
      </div>
    </form>
  );
}
export default async function AdminBlogPage() {
  const client = await getAuthorizedSupabaseClient();
  const { data } = client
    ? await client
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
    : { data: null };
  const posts = (data ?? []) as Post[];
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Blog"
        description="Create, edit, publish, unpublish, and delete Engineering Notes."
      />
      <section className="section-shell pt-0">
        <div className="container-shell space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create a note</CardTitle>
              <CardDescription>
                Use headings, lists, links, blockquotes, and
                fenced code blocks.
              </CardDescription>
            </CardHeader>
            <PostForm />
          </Card>
          {posts.length ? (
            posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>
                        {post.slug}
                      </CardDescription>
                    </div>
                    <Badge>
                      {post.published
                        ? 'Published'
                        : 'Draft'}
                    </Badge>
                  </div>
                </CardHeader>
                <PostForm post={post} />
                <div className="mt-4 flex flex-wrap gap-3">
                  <form action={togglePostPublished}>
                    <input
                      type="hidden"
                      name="id"
                      value={post.id}
                    />
                    <input
                      type="hidden"
                      name="published"
                      value={String(post.published)}
                    />
                    <AdminActionButton>
                      {post.published
                        ? 'Unpublish'
                        : 'Publish'}
                    </AdminActionButton>
                  </form>
                  <form action={deletePost}>
                    <input
                      type="hidden"
                      name="id"
                      value={post.id}
                    />
                    <AdminActionButton
                      confirmMessage={`Delete ${post.title}?`}
                    >
                      Delete note
                    </AdminActionButton>
                  </form>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-muted-foreground">
                No notes yet. Create the first draft above.
              </p>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
