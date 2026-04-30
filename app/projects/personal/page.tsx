import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/data";

export const metadata = {
  title: "Personal Projects",
};

export default async function PersonalProjectsPage() {
  const projects = await getProjects("personal");

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Personal projects
        </h1>
        <p className="text-muted-foreground">Built on my own time.</p>
      </header>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No personal projects published yet.
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
