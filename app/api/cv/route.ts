import { createSupabasePublicServerClient } from '@/lib/supabase/public-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const client = createSupabasePublicServerClient();
  if (!client)
    return Response.json(
      { error: 'CV downloads are not configured.' },
      { status: 503 },
    );

  const { data, error } = await client.storage
    .from('portfolio-assets')
    .download('resume/current.pdf');
  if (error) {
    if (Number(error.statusCode) === 404)
      return Response.json(
        { error: 'No CV PDF has been uploaded yet.' },
        { status: 404 },
      );
    return Response.json(
      { error: 'CV download could not be completed.' },
      { status: 502 },
    );
  }
  if (!data)
    return Response.json(
      { error: 'CV download returned no file.' },
      { status: 502 },
    );

  return new Response(data, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'attachment; filename="Mawcha-Haftu-CV.pdf"',
      'Cache-Control': 'no-store',
    },
  });
}
