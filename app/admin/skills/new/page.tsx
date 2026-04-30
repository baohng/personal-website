import { SkillForm } from "../skill-form";

export const metadata = {
  title: "New skill",
};

export default function NewSkillPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">New skill</h1>
      <SkillForm />
    </section>
  );
}
