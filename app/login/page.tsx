import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { getAdminUser } from "@/lib/auth";

export const metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const admin = await getAdminUser();
  if (admin) {
    redirect("/admin");
  }

  return (
    <section className="mx-auto max-w-sm space-y-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Admin login</h1>
        <p className="text-sm text-muted-foreground">
          Restricted to the site owner.
        </p>
      </header>
      <LoginForm />
    </section>
  );
}
