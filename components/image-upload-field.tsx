"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Combined URL input + file picker. The file picker uploads to
// /api/admin/upload (server-only, requireAdmin) and writes the
// resulting public URL back into the hidden input that the form
// will submit.
export function ImageUploadField({
  id,
  name,
  label,
  defaultValue,
}: {
  id: string;
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = React.useState(defaultValue ?? "");
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        toast.error(data.error ?? "Upload failed");
        return;
      }

      setUrl(data.url);
      toast.success("Uploaded");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          id={id}
          name={name}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="flex-1"
        />
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
            id={`${id}-file`}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt="preview"
          className="mt-2 max-h-32 rounded-md border border-border object-cover"
        />
      ) : null}
    </div>
  );
}
