import { getTechnicalSkills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Technical Skills",
};

export default async function SkillsPage() {
  const skills = await getTechnicalSkills();

  const grouped = new Map<string, typeof skills>();
  for (const skill of skills) {
    const key = skill.category ?? "Other";
    const list = grouped.get(key) ?? [];
    list.push(skill);
    grouped.set(key, list);
  }

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Technical Skills</h1>
        <p className="text-muted-foreground">
          Tools and technologies I work with regularly.
        </p>
      </header>

      {grouped.size === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          {Array.from(grouped.entries()).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {category}
              </h2>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge key={skill.id} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
      No skills published yet.
    </div>
  );
}
