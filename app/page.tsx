import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-6 py-12">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        Personal Website
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Hi, I&apos;m baohng.
      </h1>
      <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
        Software engineer. This site is a living record of what I&apos;ve been
        building, the companies I&apos;ve worked with, and how to get in touch.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/projects" className={buttonVariants({ size: "lg" })}>
          View projects
        </Link>
        <Link
          href="/contact"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
