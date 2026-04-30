import { notFound } from "next/navigation";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Project } from "@/lib/types";

import { ProjectForm } from "../project-form";

export const metadata = {
  title: "Edit project",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Edit project</h1>
      <ProjectForm project={data as Project} />
    </section>
  );
}
