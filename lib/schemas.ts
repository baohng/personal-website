import { z } from "zod";

// Empty strings from form inputs become null. Date strings come in as
// "YYYY-MM-DD" from <input type="date">.
const optionalString = z
  .string()
  .trim()
  .transform((v) => (v === "" ? null : v))
  .nullable();

const optionalDate = z
  .string()
  .trim()
  .transform((v) => (v === "" ? null : v))
  .nullable();

const optionalUrl = z
  .string()
  .trim()
  .transform((v) => (v === "" ? null : v))
  .nullable()
  .refine(
    (v) => v === null || /^https?:\/\//.test(v),
    "Must be an http(s) URL",
  );

// CSV string -> string[] (trimmed, no empty entries).
const csvList = z
  .string()
  .transform((v) =>
    v
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
  );

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: optionalString,
  tech_stack: csvList,
  cover_image_url: optionalUrl,
  github_url: optionalUrl,
  demo_url: optionalUrl,
  start_date: optionalDate,
  end_date: optionalDate,
  category: z.enum(["personal", "company"]),
  company_name: optionalString,
  display_order: z.coerce.number().int().default(0),
  is_published: z
    .union([z.literal("on"), z.literal("true"), z.literal("false"), z.boolean()])
    .transform((v) => v === true || v === "on" || v === "true")
    .default(false),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const experienceSchema = z.object({
  company_name: z.string().trim().min(1, "Company name is required"),
  role: z.string().trim().min(1, "Role is required"),
  start_date: z.string().trim().min(1, "Start date is required"),
  end_date: optionalDate,
  description: optionalString,
  display_order: z.coerce.number().int().default(0),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;

export const skillSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  category: optionalString,
  proficiency: z
    .string()
    .trim()
    .transform((v) => (v === "" ? null : Number(v)))
    .nullable()
    .refine(
      (v) => v === null || (Number.isInteger(v) && v >= 1 && v <= 5),
      "Must be 1–5",
    ),
  icon_url: optionalUrl,
  display_order: z.coerce.number().int().default(0),
});

export type SkillInput = z.infer<typeof skillSchema>;

export const contactMessageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
