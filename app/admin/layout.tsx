import { redirect } from "next/navigation";
import Link from "next/link";

import { LogoutButton } from "@/components/logout-button";
import { getAdminUser } from "@/lib/auth";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/skills", label: "Skills" },
] as const;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminUser();
  if (!admin) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <nav className="flex flex-wrap gap-1">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">{admin.email}</span>
          <LogoutButton />
        </div>
      </div>
      {children}
    </div>
  );
}
