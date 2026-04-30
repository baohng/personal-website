import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Admin",
};

const SECTIONS = [
  {
    href: "/admin/projects",
    title: "Projects",
    description: "Personal and company projects.",
  },
  {
    href: "/admin/experience",
    title: "Work experience",
    description: "Roles and companies.",
  },
  {
    href: "/admin/skills",
    title: "Technical skills",
    description: "Tools and technologies.",
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Pick a content type to manage.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-3">
        {SECTIONS.map((section) => (
          <Link key={section.href} href={section.href} className="group">
            <Card className="h-full transition-colors group-hover:border-primary/60">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-primary">
                Manage →
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
