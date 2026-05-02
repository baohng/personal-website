"use server";

import "server-only";

import { Resend } from "resend";

import { contactMessageSchema } from "@/lib/schemas";

export type ContactState = {
  error: string | null;
  success: boolean;
};

export async function sendContactMessageAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactMessageSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input",
      success: false,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return { error: "Email service is not configured.", success: false };
  }

  const resend = new Resend(apiKey);
  const { name, email, message } = parsed.data;

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: [to],
    replyTo: email,
    subject: `New contact message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return { error: error.message ?? "Failed to send message.", success: false };
  }

  return { error: null, success: true };
}
