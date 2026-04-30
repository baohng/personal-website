import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type {
  Project,
  TechnicalSkill,
  WorkExperience,
} from "@/lib/types";

// Server-only data access for the admin section. Uses the service-role
// client and bypasses RLS — every caller must have already gone through
// requireAdmin().

export async function listAllProjects(): Promise<Project[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Project[]) ?? [];
}

export async function listAllExperiences(): Promise<WorkExperience[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("work_experiences")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) throw error;
  return (data as WorkExperience[]) ?? [];
}

export async function listAllSkills(): Promise<TechnicalSkill[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("technical_skills")
    .select("*")
    .order("category", { ascending: true, nullsFirst: false })
    .order("display_order", { ascending: true });

  if (error) throw error;
  return (data as TechnicalSkill[]) ?? [];
}
