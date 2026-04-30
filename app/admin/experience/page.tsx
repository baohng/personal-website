import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { listAllExperiences } from "@/lib/admin-data";

import { deleteExperienceAction } from "./actions";

export const metadata = {
  title: "Admin · Experience",
};

export default async function AdminExperiencePage() {
  const experiences = await listAllExperiences().catch(() => []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Work experience</h1>
        <Link
          href="/admin/experience/new"
          className={buttonVariants({ size: "sm" })}
        >
          New experience
        </Link>
      </div>

      {experiences.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No experiences yet.
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {experiences.map((exp) => (
            <li
              key={exp.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="space-y-1">
                <p className="font-medium">
                  {exp.role}{" "}
                  <span className="font-normal text-muted-foreground">
                    · {exp.company_name}
                  </span>
                </p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {exp.start_date} — {exp.end_date ?? "Present"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/experience/${exp.id}`}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Edit
                </Link>
                <form action={deleteExperienceAction}>
                  <input type="hidden" name="id" value={exp.id} />
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
