"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { projectSchema } from "@/lib/schemas";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type ActionState = { error: string | null };

function parseProjectForm(formData: FormData) {
  return projectSchema.safeParse({
    title: formData.get("title") ?? "",
    description: formData.get("description") ?? "",
    tech_stack: formData.get("tech_stack") ?? "",
    cover_image_url: formData.get("cover_image_url") ?? "",
    github_url: formData.get("github_url") ?? "",
    demo_url: formData.get("demo_url") ?? "",
    start_date: formData.get("start_date") ?? "",
    end_date: formData.get("end_date") ?? "",
    category: formData.get("category") ?? "personal",
    company_name: formData.get("company_name") ?? "",
    display_order: formData.get("display_order") ?? "0",
    is_published: formData.get("is_published") ?? "false",
  });
}

function revalidateProjectPaths() {
  revalidatePath("/admin/projects");
  revalidatePath("/projects/personal");
  revalidatePath("/projects/company");
}

export async function createProjectAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("projects").insert(parsed.data);
  if (error) return { error: error.message };

  revalidateProjectPaths();
  redirect("/admin/projects");
}

export async function updateProjectAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("projects")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: error.message };

  revalidateProjectPaths();
  redirect("/admin/projects");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("projects").delete().eq("id", id);

  revalidateProjectPaths();
}
