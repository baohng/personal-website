export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 mt-auto">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 text-sm text-muted-foreground">
        © {year} baohng. Built with Next.js and Supabase.
      </div>
    </footer>
  );
}
