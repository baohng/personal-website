import Link from "next/link";

export const metadata = {
  title: "Contact",
};

const LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Email", href: "mailto:contact.giabao@gmail.com" },
  { label: "GitHub", href: "https://github.com/baohng" },
];

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="text-muted-foreground">
          The fastest ways to reach me.
        </p>
      </header>
      <ul className="space-y-3">
        {LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-primary underline-offset-4 hover:underline"
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
