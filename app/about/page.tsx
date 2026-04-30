export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="text-muted-foreground">
        A short introduction will live here. This page is intentionally simple
        for now — content can be expanded later, or moved into the CMS.
      </p>
    </article>
  );
}
