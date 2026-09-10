import { PageHeader } from '@/components/page-shell';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AdminActionButton } from '@/components/admin-controls';
import { getAuthorizedSupabaseClient } from '@/lib/supabase/auth';
import {
  deleteMessage,
  markMessageRead,
} from '@/app/admin/actions';

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};
export default async function AdminMessagesPage() {
  const client = await getAuthorizedSupabaseClient();
  const { data } = client
    ? await client
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
    : { data: null };
  const messages = (data ?? []) as Message[];
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Messages"
        description="Review inbound contact submissions, mark them as read, and remove them when handled."
      />
      <section className="section-shell pt-0">
        <div className="container-shell space-y-5">
          {messages.length ? (
            messages.map((message) => (
              <Card key={message.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <CardTitle>
                        {message.subject || 'No subject'}
                      </CardTitle>
                      <CardDescription>
                        {message.name} · {message.email} ·{' '}
                        {new Date(
                          message.created_at,
                        ).toLocaleString()}
                      </CardDescription>
                    </div>
                    <Badge>
                      {message.is_read ? 'Read' : 'Unread'}
                    </Badge>
                  </div>
                </CardHeader>
                <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
                  {message.message}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {!message.is_read ? (
                    <form action={markMessageRead}>
                      <input
                        type="hidden"
                        name="id"
                        value={message.id}
                      />
                      <AdminActionButton>
                        Mark as read
                      </AdminActionButton>
                    </form>
                  ) : null}
                  <form action={deleteMessage}>
                    <input
                      type="hidden"
                      name="id"
                      value={message.id}
                    />
                    <AdminActionButton confirmMessage="Delete this message? This cannot be undone.">
                      Delete message
                    </AdminActionButton>
                  </form>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-muted-foreground">
                No contact messages yet.
              </p>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
