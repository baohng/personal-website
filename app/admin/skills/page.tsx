import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { listAllSkills } from "@/lib/admin-data";

import { deleteSkillAction } from "./actions";

export const metadata = {
  title: "Admin · Skills",
};

export default async function AdminSkillsPage() {
  const skills = await listAllSkills().catch(() => []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Technical skills</h1>
        <Link
          href="/admin/skills/new"
          className={buttonVariants({ size: "sm" })}
        >
          New skill
        </Link>
      </div>

      {skills.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No skills yet.
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {skills.map((skill) => (
            <li
              key={skill.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium">{skill.name}</span>
                {skill.category ? (
                  <Badge variant="outline">{skill.category}</Badge>
                ) : null}
                {skill.proficiency ? (
                  <Badge variant="secondary">{skill.proficiency}/5</Badge>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/skills/${skill.id}`}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Edit
                </Link>
                <form action={deleteSkillAction}>
                  <input type="hidden" name="id" value={skill.id} />
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
