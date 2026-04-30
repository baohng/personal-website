import { getWorkExperiences } from "@/lib/data";

export const metadata = {
  title: "Work Experience",
};

export default async function ExperiencePage() {
  const experiences = await getWorkExperiences();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Work Experience</h1>
        <p className="text-muted-foreground">Companies I&apos;ve worked with.</p>
      </header>

      {experiences.length === 0 ? (
        <EmptyState />
      ) : (
        <ol className="relative space-y-8 border-l border-border pl-6">
          {experiences.map((exp) => (
            <li key={exp.id} className="space-y-1">
              <div className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {formatRange(exp.start_date, exp.end_date)}
              </p>
              <h2 className="text-lg font-semibold">
                {exp.role}{" "}
                <span className="font-normal text-muted-foreground">
                  · {exp.company_name}
                </span>
              </h2>
              {exp.description ? (
                <p className="whitespace-pre-line text-sm text-muted-foreground">
                  {exp.description}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
      No work experience published yet.
    </div>
  );
}

function formatRange(start: string, end: string | null): string {
  const startLabel = formatMonth(start);
  const endLabel = end ? formatMonth(end) : "Present";
  return `${startLabel} — ${endLabel}`;
}

function formatMonth(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
