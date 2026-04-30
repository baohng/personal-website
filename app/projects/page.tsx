import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Projects",
};

const SECTIONS = [
  {
    href: "/projects/personal",
    title: "Personal projects",
    description: "Things I built on my own time.",
  },
  {
    href: "/projects/company",
    title: "Company projects",
    description: "Work shipped while employed.",
  },
] as const;

export default function ProjectsLandingPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Split between things built for fun and work shipped at companies.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group block focus:outline-none"
          >
            <Card className="h-full transition-colors group-hover:border-primary/60">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-primary">
                View →
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
