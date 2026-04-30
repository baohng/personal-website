import { ProjectForm } from "../project-form";

export const metadata = {
  title: "New project",
};

export default function NewProjectPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">New project</h1>
      <ProjectForm />
    </section>
  );
}
