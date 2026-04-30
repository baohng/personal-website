import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { listAllProjects } from "@/lib/admin-data";

import { deleteProjectAction } from "./actions";

export const metadata = {
  title: "Admin · Projects",
};

export default async function AdminProjectsPage() {
  const projects = await listAllProjects().catch(() => []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <Link
          href="/admin/projects/new"
          className={buttonVariants({ size: "sm" })}
        >
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No projects yet.
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{project.title}</span>
                  <Badge variant="outline">{project.category}</Badge>
                  {!project.is_published ? (
                    <Badge variant="secondary">Draft</Badge>
                  ) : null}
                </div>
                {project.description ? (
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Edit
                </Link>
                <form action={deleteProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    className={buttonVariants({
                      variant: "destructive",
                      size: "sm",
                    })}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
