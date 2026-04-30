"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { WorkExperience } from "@/lib/types";

import {
  createExperienceAction,
  updateExperienceAction,
  type ActionState,
} from "./actions";

const INITIAL: ActionState = { error: null };

export function ExperienceForm({
  experience,
}: {
  experience?: WorkExperience;
}) {
  const action = experience
    ? updateExperienceAction.bind(null, experience.id)
    : createExperienceAction;

  const [state, formAction, pending] = useActionState(action, INITIAL);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="company_name">
            Company name<span className="text-destructive"> *</span>
          </Label>
          <Input
            id="company_name"
            name="company_name"
            required
            defaultValue={experience?.company_name ?? ""}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="role">
            Role<span className="text-destructive"> *</span>
          </Label>
          <Input
            id="role"
            name="role"
            required
            defaultValue={experience?.role ?? ""}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="start_date">
            Start date<span className="text-destructive"> *</span>
          </Label>
          <Input
            id="start_date"
            name="start_date"
            type="date"
            required
            defaultValue={experience?.start_date ?? ""}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="end_date">End date (blank = present)</Label>
          <Input
            id="end_date"
            name="end_date"
            type="date"
            defaultValue={experience?.end_date ?? ""}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="display_order">Display order</Label>
          <Input
            id="display_order"
            name="display_order"
            type="number"
            defaultValue={experience?.display_order ?? 0}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={experience?.description ?? ""}
        />
      </div>
      {state.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Saving..."
            : experience
              ? "Save changes"
              : "Create experience"}
        </Button>
      </div>
    </form>
  );
}
