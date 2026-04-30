import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Project,
  ProjectCategory,
  TechnicalSkill,
  WorkExperience,
} from "@/lib/types";

// Server-only data access for public pages. All reads use the anon
// key + RLS, so unpublished rows are filtered automatically. Each
// helper returns an empty array on error so pages can render even
// when Supabase isn't configured yet.

async function safeQuery<T>(
  query: PromiseLike<{ data: T[] | null; error: unknown }>,
): Promise<T[]> {
  try {
    const { data, error } = await query;
    if (error) {
      console.warn("Supabase query failed:", error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.warn("Supabase request threw:", err);
    return [];
  }
}

export async function getProjects(category: ProjectCategory): Promise<Project[]> {
  const supabase = await createSupabaseServerClient();
  return safeQuery<Project>(
    supabase
      .from("projects")
      .select("*")
      .eq("category", category)
      .order("display_order", { ascending: true })
      .order("start_date", { ascending: false, nullsFirst: false }),
  );
}

export async function getWorkExperiences(): Promise<WorkExperience[]> {
  const supabase = await createSupabaseServerClient();
  return safeQuery<WorkExperience>(
    supabase
      .from("work_experiences")
      .select("*")
      .order("start_date", { ascending: false }),
  );
}

export async function getTechnicalSkills(): Promise<TechnicalSkill[]> {
  const supabase = await createSupabaseServerClient();
  return safeQuery<TechnicalSkill>(
    supabase
      .from("technical_skills")
      .select("*")
      .order("category", { ascending: true, nullsFirst: false })
      .order("display_order", { ascending: true }),
  );
}
