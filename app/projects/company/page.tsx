import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/data";

export const metadata = {
  title: "Company Projects",
};

export default async function CompanyProjectsPage() {
  const projects = await getProjects("company");

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Company projects
        </h1>
        <p className="text-muted-foreground">Work shipped while employed.</p>
      </header>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No company projects published yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
