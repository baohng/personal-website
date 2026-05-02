"use client";

import { useActionState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { sendContactMessageAction, type ContactState } from "./actions";

const INITIAL: ContactState = { error: null, success: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessageAction,
    INITIAL,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">
          Name<span className="text-destructive"> *</span>
        </Label>
        <Input id="name" name="name" required maxLength={100} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">
          Email<span className="text-destructive"> *</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">
          Message<span className="text-destructive"> *</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={5000}
        />
      </div>
      {state.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Thanks! Your message has been sent.
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
