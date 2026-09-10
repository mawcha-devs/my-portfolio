import { PageHeader } from '@/components/page-shell';
import { Card } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Connect"
        title="Contact"
        description="Have a software project, technical question, or opportunity to discuss? Send a message and I will have the details in one place."
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
          <Card className="h-fit p-6 sm:p-8">
            <p className="eyebrow">Contact details</p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Let&apos;s start a conversation.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              The best way to reach me is by email. You can
              also find my software work and professional
              profile through the links below.
            </p>
            <div className="mt-7 space-y-5 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Email
                </p>
                <a
                  href="mailto:mawcha.haftu@gmail.com"
                  className="mt-1 inline-flex font-medium text-primary hover:text-foreground"
                >
                  mawcha.haftu@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  GitHub
                </p>
                <a
                  href="https://github.com/mawcha-devs"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex break-all font-medium text-primary hover:text-foreground"
                >
                  github.com/mawcha-devs{' '}
                  <span className="ml-2" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  LinkedIn
                </p>
                <a
                  href="https://www.linkedin.com/in/mawcha-h-67a93b3a8/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex break-all font-medium text-primary hover:text-foreground"
                >
                  linkedin.com/in/mawcha-h-67a93b3a8{' '}
                  <span className="ml-2" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </Card>
          <Card className="p-6 sm:p-8">
            <p className="eyebrow">Message</p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Tell me what you are working on.
            </h2>
            <p className="mt-3 mb-7 text-sm leading-6 text-muted-foreground">
              Required fields are validated in the browser
              and again on the server before anything is
              stored.
            </p>
            <ContactForm />
          </Card>
        </div>
      </section>
    </>
  );
}
