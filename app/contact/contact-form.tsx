"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { sendContactMessageAction, type ContactState } from "./actions";

const INITIAL: ContactState = { error: null, success: false, submittedAt: 0 };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessageAction,
    INITIAL,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [dialog, setDialog] = useState<
    | { open: false }
    | { open: true; kind: "success" | "error"; message: string }
  >({ open: false });

  useEffect(() => {
    if (!state.submittedAt) return;
    if (state.success) {
      formRef.current?.reset();
      setDialog({
        open: true,
        kind: "success",
        message: "Thanks for reaching out! I'll get back to you soon.",
      });
    } else if (state.error) {
      setDialog({ open: true, kind: "error", message: state.error });
    }
  }, [state.submittedAt, state.success, state.error]);

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
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </Button>
      <Dialog
        open={dialog.open}
        onOpenChange={(open) => {
          if (!open) setDialog({ open: false });
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialog.open && dialog.kind === "success"
                ? "Message sent"
                : "Something went wrong"}
            </DialogTitle>
            <DialogDescription>
              {dialog.open ? dialog.message : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialog({ open: false })}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
