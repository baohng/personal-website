"use client";

import * as React from "react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "@/lib/types";

import {
  createProjectAction,
  updateProjectAction,
  type ActionState,
} from "./actions";

const INITIAL: ActionState = { error: null };

export function ProjectForm({ project }: { project?: Project }) {
  const action = project
    ? updateProjectAction.bind(null, project.id)
    : createProjectAction;

  const [state, formAction, pending] = useActionState(action, INITIAL);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" htmlFor="title" required>
          <Input
            id="title"
            name="title"
            required
            defaultValue={project?.title ?? ""}
          />
        </Field>
        <Field label="Category" htmlFor="category" required>
          <select
            id="category"
            name="category"
            defaultValue={project?.category ?? "personal"}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="personal">Personal</option>
            <option value="company">Company</option>
          </select>
        </Field>
        <Field label="Company name (if company)" htmlFor="company_name">
          <Input
            id="company_name"
            name="company_name"
            defaultValue={project?.company_name ?? ""}
          />
        </Field>
        <Field label="Display order" htmlFor="display_order">
          <Input
            id="display_order"
            name="display_order"
            type="number"
            defaultValue={project?.display_order ?? 0}
          />
        </Field>
        <Field label="Start date" htmlFor="start_date">
          <Input
            id="start_date"
            name="start_date"
            type="date"
            defaultValue={project?.start_date ?? ""}
          />
        </Field>
        <Field label="End date" htmlFor="end_date">
          <Input
            id="end_date"
            name="end_date"
            type="date"
            defaultValue={project?.end_date ?? ""}
          />
        </Field>
        <Field label="GitHub URL" htmlFor="github_url">
          <Input
            id="github_url"
            name="github_url"
            type="url"
            defaultValue={project?.github_url ?? ""}
          />
        </Field>
        <Field label="Demo URL" htmlFor="demo_url">
          <Input
            id="demo_url"
            name="demo_url"
            type="url"
            defaultValue={project?.demo_url ?? ""}
          />
        </Field>
        <Field label="Cover image URL" htmlFor="cover_image_url">
          <Input
            id="cover_image_url"
            name="cover_image_url"
            type="url"
            defaultValue={project?.cover_image_url ?? ""}
          />
        </Field>
        <Field
          label="Tech stack (comma-separated)"
          htmlFor="tech_stack"
        >
          <Input
            id="tech_stack"
            name="tech_stack"
            defaultValue={project?.tech_stack.join(", ") ?? ""}
            placeholder="Next.js, TypeScript, Postgres"
          />
        </Field>
      </div>
      <Field label="Description" htmlFor="description">
        <Textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={project?.description ?? ""}
        />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={project?.is_published ?? true}
        />
        Published
      </label>
      {state.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : project ? "Save changes" : "Create project"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      {children}
    </div>
  );
}
