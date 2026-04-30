import { notFound } from "next/navigation";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { TechnicalSkill } from "@/lib/types";

import { SkillForm } from "../skill-form";

export const metadata = {
  title: "Edit skill",
};

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("technical_skills")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Edit skill</h1>
      <SkillForm skill={data as TechnicalSkill} />
    </section>
  );
}
