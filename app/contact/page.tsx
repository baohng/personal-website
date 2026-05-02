import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="text-muted-foreground">
          Got a question, an opportunity, or just want to say hi? Send a
          message below and I&apos;ll get back to you.
        </p>
      </header>
      <ContactForm />
    </section>
  );
}
