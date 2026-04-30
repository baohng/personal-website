import { notFound } from "next/navigation";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { WorkExperience } from "@/lib/types";

import { ExperienceForm } from "../experience-form";

export const metadata = {
  title: "Edit experience",
};

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("work_experiences")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Edit experience</h1>
      <ExperienceForm experience={data as WorkExperience} />
    </section>
  );
}
