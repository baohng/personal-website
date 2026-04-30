import { ExperienceForm } from "../experience-form";

export const metadata = {
  title: "New experience",
};

export default function NewExperiencePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">New experience</h1>
      <ExperienceForm />
    </section>
  );
}
