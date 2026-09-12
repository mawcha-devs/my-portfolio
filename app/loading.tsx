export default function Loading() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <div className="surface mx-auto max-w-xl p-10">
          <div className="animate-pulse motion-reduce:animate-none space-y-4">
            <div className="h-4 w-24 rounded-full bg-muted" />
            <div className="h-10 w-3/4 rounded-md bg-muted" />
            <div className="h-4 w-full rounded-md bg-muted" />
            <div className="h-4 w-5/6 rounded-md bg-muted" />
          </div>
        </div>
      </div>
    </section>
  );
}
