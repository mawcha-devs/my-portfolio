'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAuthorizedSupabaseClient } from '@/lib/supabase/auth';

function value(formData: FormData, name: string) {
  return String(formData.get(name) ?? '').trim();
}

function list(valueToSplit: string, separator = ',') {
  return valueToSplit
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

function safeHttpUrl(
  valueToValidate: string,
  label: string,
) {
  if (!valueToValidate) return null;
  try {
    const url = new URL(valueToValidate);
    if (!['http:', 'https:'].includes(url.protocol))
      throw new Error();
    return url.toString();
  } catch {
    throw new Error(
      `${label} must be a valid HTTP or HTTPS URL.`,
    );
  }
}

const assetBucket = 'portfolio-assets';
const allowedImageTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
]);
const maxImageBytes = 5 * 1024 * 1024;

async function uploadImage(
  client: NonNullable<
    Awaited<ReturnType<typeof getAuthorizedSupabaseClient>>
  >,
  file: FormDataEntryValue | null,
  folder: string,
) {
  if (!(file instanceof File) || file.size === 0)
    return null;
  if (
    !allowedImageTypes.has(file.type) ||
    file.size > maxImageBytes
  )
    throw new Error(
      'Images must be JPEG, PNG, WebP, or AVIF files up to 5 MB.',
    );
  const extension = file.type
    .split('/')[1]
    .replace('jpeg', 'jpg');
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage
    .from(assetBucket)
    .upload(path, file, {
      contentType: file.type,
      cacheControl: '31536000',
      upsert: false,
    });
  if (error) throw new Error('Image upload failed.');
  return client.storage.from(assetBucket).getPublicUrl(path)
    .data.publicUrl;
}

async function deleteAsset(
  client: NonNullable<
    Awaited<ReturnType<typeof getAuthorizedSupabaseClient>>
  >,
  url: string | null,
) {
  if (!url) return;
  const marker = `/storage/v1/object/public/${assetBucket}/`;
  const index = url.indexOf(marker);
  if (index >= 0)
    await client.storage
      .from(assetBucket)
      .remove([
        decodeURIComponent(
          url.slice(index + marker.length),
        ),
      ]);
}

function requiredProject(formData: FormData) {
  const title = value(formData, 'title');
  const slug = value(formData, 'slug');
  const description = value(formData, 'description');
  if (!title || !slug || !description)
    throw new Error(
      'Title, slug, and description are required.',
    );
  return { title, slug, description };
}

async function syncProjectRelations(
  client: NonNullable<
    Awaited<ReturnType<typeof getAuthorizedSupabaseClient>>
  >,
  projectId: string,
  formData: FormData,
) {
  const technologies = list(
    value(formData, 'technologies'),
  );
  const features = list(value(formData, 'features'), '\n');
  const screenshots = list(
    value(formData, 'screenshots'),
    '\n',
  );
  const uploadedScreenshots = await Promise.all(
    formData
      .getAll('screenshot_files')
      .map((file) =>
        uploadImage(client, file, `projects/${projectId}`),
      ),
  );
  screenshots.push(
    ...uploadedScreenshots.filter((url): url is string =>
      Boolean(url),
    ),
  );

  await client
    .from('project_technologies')
    .delete()
    .eq('project_id', projectId);
  for (const name of technologies) {
    const { data: existing } = await client
      .from('skills')
      .select('id')
      .eq('name', name)
      .maybeSingle();
    const skill = existing as { id: string } | null;
    let skillId = skill?.id;
    if (!skillId) {
      const { data: inserted } = await client
        .from('skills')
        .insert({
          name,
          category: 'Project technology',
        } as never)
        .select('id')
        .single();
      skillId = (inserted as { id: string } | null)?.id;
    }
    if (skillId)
      await client.from('project_technologies').insert({
        project_id: projectId,
        skill_id: skillId,
      } as never);
  }

  await client
    .from('project_features')
    .delete()
    .eq('project_id', projectId);
  if (features.length)
    await client.from('project_features').insert(
      features.map((title, sort_order) => ({
        project_id: projectId,
        title,
        sort_order,
      })) as never,
    );

  await client
    .from('project_screenshots')
    .delete()
    .eq('project_id', projectId);
  if (screenshots.length)
    await client.from('project_screenshots').insert(
      screenshots.map((image_url, sort_order) => ({
        project_id: projectId,
        image_url,
        sort_order,
      })) as never,
    );
}

export async function saveProject(formData: FormData) {
  const client = await getAuthorizedSupabaseClient();
  if (!client) throw new Error('Unauthorized.');
  const id = value(formData, 'id');
  const base = requiredProject(formData);
  const oldScreenshotUrls = list(
    value(formData, 'screenshots'),
    '\n',
  );
  const payload = {
    ...base,
    short_description:
      value(formData, 'short_description') || null,
    status: value(formData, 'status') || 'draft',
    contribution_type:
      value(formData, 'contribution_type') || 'individual',
    repository_url: safeHttpUrl(
      value(formData, 'repository_url'),
      'Repository URL',
    ),
    live_url: safeHttpUrl(
      value(formData, 'live_url'),
      'Live URL',
    ),
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
  };
  let projectId = id;
  if (id)
    await client
      .from('projects')
      .update(payload as never)
      .eq('id', id);
  else {
    const { data } = await client
      .from('projects')
      .insert(payload as never)
      .select('id')
      .single();
    projectId = (data as { id: string } | null)?.id ?? '';
  }
  if (projectId)
    await syncProjectRelations(client, projectId, formData);
  if (projectId && oldScreenshotUrls.length) {
    const requested = list(
      value(formData, 'screenshots'),
      '\n',
    );
    for (const oldUrl of oldScreenshotUrls)
      if (!requested.includes(oldUrl))
        await deleteAsset(client, oldUrl);
  }
  revalidatePath('/projects');
  revalidateTag('portfolio-data');
  redirect('/admin/projects?status=saved');
  revalidatePath(`/projects/${base.slug}`);
  revalidatePath('/admin/projects');
}

export async function deleteProject(formData: FormData) {
  const client = await getAuthorizedSupabaseClient();
  const id = value(formData, 'id');
  if (!client || !id) throw new Error('Unauthorized.');
  const { data: screenshotRows } = await client
    .from('project_screenshots')
    .select('image_url')
    .eq('project_id', id);
  for (const row of (screenshotRows ?? []) as Array<{
    image_url: string;
  }>)
    await deleteAsset(client, row.image_url);
  await client.from('projects').delete().eq('id', id);
  revalidatePath('/projects');
  revalidateTag('portfolio-data');
  redirect('/admin/projects?status=deleted');
  revalidatePath('/admin/projects');
}

export async function toggleProjectPublished(
  formData: FormData,
) {
  const client = await getAuthorizedSupabaseClient();
  const id = value(formData, 'id');
  if (!client || !id) throw new Error('Unauthorized.');
  await client
    .from('projects')
    .update({
      published: value(formData, 'published') !== 'true',
    } as never)
    .eq('id', id);
  revalidatePath('/projects');
  revalidateTag('portfolio-data');
  redirect('/admin/projects?status=published');
  revalidatePath('/admin/projects');
}

export async function saveExperience(formData: FormData) {
  const client = await getAuthorizedSupabaseClient();
  if (!client) throw new Error('Unauthorized.');
  const id = value(formData, 'id');
  const company_name = value(formData, 'company_name');
  const role = value(formData, 'role');
  const description = value(formData, 'description');
  if (!company_name || !role || !description)
    throw new Error(
      'Company, role, and description are required.',
    );
  const payload = {
    company_name,
    role,
    description,
    location: value(formData, 'location') || null,
    start_date: value(formData, 'start_date') || null,
    end_date: value(formData, 'end_date') || null,
    published: formData.get('published') === 'on',
    sort_order: Number(value(formData, 'sort_order') || 0),
  };
  if (id)
    await client
      .from('experiences')
      .update(payload as never)
      .eq('id', id);
  else
    await client
      .from('experiences')
      .insert(payload as never);
  revalidatePath('/experience');
  revalidateTag('portfolio-data');
  redirect('/admin/experience?status=saved');
  revalidatePath('/admin/experience');
}

export async function deleteExperience(formData: FormData) {
  const client = await getAuthorizedSupabaseClient();
  const id = value(formData, 'id');
  if (!client || !id) throw new Error('Unauthorized.');
  await client.from('experiences').delete().eq('id', id);
  revalidatePath('/experience');
  revalidateTag('portfolio-data');
  redirect('/admin/experience?status=deleted');
  revalidatePath('/admin/experience');
}

export async function reorderExperience(
  formData: FormData,
) {
  const client = await getAuthorizedSupabaseClient();
  if (!client) throw new Error('Unauthorized.');
  const ids = list(value(formData, 'ids'));
  for (const [sort_order, id] of ids.entries())
    await client
      .from('experiences')
      .update({ sort_order } as never)
      .eq('id', id);
  revalidatePath('/experience');
  revalidateTag('portfolio-data');
  revalidatePath('/admin/experience');
}

export async function savePost(formData: FormData) {
  const client = await getAuthorizedSupabaseClient();
  if (!client) throw new Error('Unauthorized.');
  const id = value(formData, 'id');
  const title = value(formData, 'title');
  const slug = value(formData, 'slug');
  const content = value(formData, 'content');
  if (!title || !slug || !content)
    throw new Error(
      'Title, slug, and content are required.',
    );
  const published = formData.get('published') === 'on';
  const payload = {
    title,
    slug,
    content,
    excerpt: value(formData, 'excerpt') || null,
    cover_image_url:
      value(formData, 'cover_image_url') || null,
    tags: list(value(formData, 'tags')),
    published,
    published_at: published
      ? value(formData, 'published_at') ||
        new Date().toISOString()
      : null,
  };
  let previousCover: string | null = null;
  if (id) {
    const { data: existing } = await client
      .from('blog_posts')
      .select('cover_image_url')
      .eq('id', id)
      .maybeSingle();
    previousCover =
      (
        existing as {
          cover_image_url: string | null;
        } | null
      )?.cover_image_url ?? null;
  }
  const uploadedCover = await uploadImage(
    client,
    formData.get('cover_image'),
    `blog/${id || crypto.randomUUID()}`,
  );
  if (uploadedCover)
    payload.cover_image_url = uploadedCover;
  if (id)
    await client
      .from('blog_posts')
      .update(payload as never)
      .eq('id', id);
  else
    await client
      .from('blog_posts')
      .insert(payload as never);
  if (uploadedCover && previousCover)
    await deleteAsset(client, previousCover);
  revalidatePath('/blog');
  revalidateTag('portfolio-data');
  redirect('/admin/blog?status=saved');
  revalidatePath(`/blog/${slug}`);
  revalidatePath('/admin/blog');
}

export async function deletePost(formData: FormData) {
  const client = await getAuthorizedSupabaseClient();
  const id = value(formData, 'id');
  if (!client || !id) throw new Error('Unauthorized.');
  const { data: existing } = await client
    .from('blog_posts')
    .select('cover_image_url')
    .eq('id', id)
    .maybeSingle();
  await client.from('blog_posts').delete().eq('id', id);
  await deleteAsset(
    client,
    (existing as { cover_image_url: string | null } | null)
      ?.cover_image_url ?? null,
  );
  revalidatePath('/blog');
  revalidateTag('portfolio-data');
  redirect('/admin/blog?status=deleted');
  revalidatePath('/admin/blog');
}

export async function togglePostPublished(
  formData: FormData,
) {
  const client = await getAuthorizedSupabaseClient();
  const id = value(formData, 'id');
  if (!client || !id) throw new Error('Unauthorized.');
  const published = value(formData, 'published') === 'true';
  await client
    .from('blog_posts')
    .update({
      published: !published,
      published_at: !published
        ? new Date().toISOString()
        : null,
    } as never)
    .eq('id', id);
  revalidatePath('/blog');
  revalidateTag('portfolio-data');
  revalidatePath('/admin/blog');
}

export async function markMessageRead(formData: FormData) {
  const client = await getAuthorizedSupabaseClient();
  const id = value(formData, 'id');
  if (!client || !id) throw new Error('Unauthorized.');
  await client
    .from('contact_messages')
    .update({ is_read: true } as never)
    .eq('id', id);
  revalidatePath('/admin/messages');
  redirect('/admin/messages?status=saved');
}

export async function deleteMessage(formData: FormData) {
  const client = await getAuthorizedSupabaseClient();
  const id = value(formData, 'id');
  if (!client || !id) throw new Error('Unauthorized.');
  await client
    .from('contact_messages')
    .delete()
    .eq('id', id);
  revalidatePath('/admin/messages');
  redirect('/admin/messages?status=deleted');
}

export async function saveTestimonial(formData: FormData) {
  const client = await getAuthorizedSupabaseClient();
  if (!client) throw new Error('Unauthorized.');
  const id = value(formData, 'id');
  const quote = value(formData, 'quote');
  const author_name = value(formData, 'author_name');
  if (!quote || !author_name)
    throw new Error('Quote and author name are required.');
  const payload = {
    quote,
    author_name,
    author_role: value(formData, 'author_role') || null,
    organization: value(formData, 'organization') || null,
    avatar_url: value(formData, 'avatar_url') || null,
    published: formData.get('published') === 'on',
    sort_order: Number(value(formData, 'sort_order') || 0),
  };
  if (id)
    await client
      .from('testimonials')
      .update(payload as never)
      .eq('id', id);
  else
    await client
      .from('testimonials')
      .insert(payload as never);
  revalidatePath('/');
  revalidateTag('portfolio-data');
  revalidatePath('/admin/testimonials');
  redirect('/admin/testimonials?status=saved');
}

export async function deleteTestimonial(
  formData: FormData,
) {
  const client = await getAuthorizedSupabaseClient();
  const id = value(formData, 'id');
  if (!client || !id) throw new Error('Unauthorized.');
  await client.from('testimonials').delete().eq('id', id);
  revalidatePath('/');
  revalidateTag('portfolio-data');
  redirect('/admin/testimonials?status=deleted');
}

export async function toggleTestimonialPublished(
  formData: FormData,
) {
  const client = await getAuthorizedSupabaseClient();
  const id = value(formData, 'id');
  if (!client || !id) throw new Error('Unauthorized.');
  const published = value(formData, 'published') === 'true';
  await client
    .from('testimonials')
    .update({ published: !published } as never)
    .eq('id', id);
  revalidatePath('/');
  revalidateTag('portfolio-data');
  redirect('/admin/testimonials?status=published');
}
