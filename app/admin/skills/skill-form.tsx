"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TechnicalSkill } from "@/lib/types";

import {
  createSkillAction,
  updateSkillAction,
  type ActionState,
} from "./actions";

const INITIAL: ActionState = { error: null };

export function SkillForm({ skill }: { skill?: TechnicalSkill }) {
  const action = skill
    ? updateSkillAction.bind(null, skill.id)
    : createSkillAction;

  const [state, formAction, pending] = useActionState(action, INITIAL);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">
            Name<span className="text-destructive"> *</span>
          </Label>
          <Input
            id="name"
            name="name"
            required
            defaultValue={skill?.name ?? ""}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            placeholder="Frontend / Backend / DevOps"
            defaultValue={skill?.category ?? ""}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="proficiency">Proficiency (1–5)</Label>
          <Input
            id="proficiency"
            name="proficiency"
            type="number"
            min={1}
            max={5}
            defaultValue={skill?.proficiency ?? ""}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="display_order">Display order</Label>
          <Input
            id="display_order"
            name="display_order"
            type="number"
            defaultValue={skill?.display_order ?? 0}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="icon_url">Icon URL</Label>
          <Input
            id="icon_url"
            name="icon_url"
            type="url"
            defaultValue={skill?.icon_url ?? ""}
          />
        </div>
      </div>
      {state.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : skill ? "Save changes" : "Create skill"}
        </Button>
      </div>
    </form>
  );
}
