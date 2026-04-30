export type ProjectCategory = "personal" | "company";

export type Project = {
  id: string;
  title: string;
  description: string | null;
  tech_stack: string[];
  cover_image_url: string | null;
  gallery_urls: string[];
  github_url: string | null;
  demo_url: string | null;
  start_date: string | null;
  end_date: string | null;
  category: ProjectCategory;
  company_name: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type WorkExperience = {
  id: string;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type TechnicalSkill = {
  id: string;
  name: string;
  category: string | null;
  proficiency: number | null;
  icon_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
};
