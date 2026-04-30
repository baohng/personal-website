"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { skillSchema } from "@/lib/schemas";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type ActionState = { error: string | null };

function parseSkillForm(formData: FormData) {
  return skillSchema.safeParse({
    name: formData.get("name") ?? "",
    category: formData.get("category") ?? "",
    proficiency: formData.get("proficiency") ?? "",
    icon_url: formData.get("icon_url") ?? "",
    display_order: formData.get("display_order") ?? "0",
  });
}

function revalidateSkillPaths() {
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
}

export async function createSkillAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseSkillForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("technical_skills").insert(parsed.data);
  if (error) return { error: error.message };

  revalidateSkillPaths();
  redirect("/admin/skills");
}

export async function updateSkillAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseSkillForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("technical_skills")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: error.message };

  revalidateSkillPaths();
  redirect("/admin/skills");
}

export async function deleteSkillAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("technical_skills").delete().eq("id", id);

  revalidateSkillPaths();
}
