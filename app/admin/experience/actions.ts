"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { experienceSchema } from "@/lib/schemas";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type ActionState = { error: string | null };

function parseExperienceForm(formData: FormData) {
  return experienceSchema.safeParse({
    company_name: formData.get("company_name") ?? "",
    role: formData.get("role") ?? "",
    start_date: formData.get("start_date") ?? "",
    end_date: formData.get("end_date") ?? "",
    description: formData.get("description") ?? "",
    display_order: formData.get("display_order") ?? "0",
  });
}

function revalidateExperiencePaths() {
  revalidatePath("/admin/experience");
  revalidatePath("/experience");
}

export async function createExperienceAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseExperienceForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("work_experiences").insert(parsed.data);
  if (error) return { error: error.message };

  revalidateExperiencePaths();
  redirect("/admin/experience");
}

export async function updateExperienceAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseExperienceForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("work_experiences")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: error.message };

  revalidateExperiencePaths();
  redirect("/admin/experience");
}

export async function deleteExperienceAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("work_experiences").delete().eq("id", id);

  revalidateExperiencePaths();
}
