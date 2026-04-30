import { NextResponse } from "next/server";

import { UnauthorizedError, requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    throw err;
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type}` },
      { status: 400 },
    );
  }

  const ext = guessExtension(file.type, file.name);
  const safeName = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "upload";
  const path = `${Date.now()}-${safeName}${ext}`;

  const supabase = createSupabaseAdminClient();
  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabase.storage
    .from("media")
    .upload(path, arrayBuffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: pub } = supabase.storage.from("media").getPublicUrl(path);

  return NextResponse.json({ url: pub.publicUrl });
}

function guessExtension(mime: string, name: string): string {
  const fromName = name.match(/\.[a-z0-9]+$/i)?.[0];
  if (fromName) return fromName.toLowerCase();
  switch (mime) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    case "image/webp":
      return ".webp";
    case "image/gif":
      return ".gif";
    case "image/svg+xml":
      return ".svg";
    default:
      return "";
  }
}
