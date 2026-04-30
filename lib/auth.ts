import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminUser = {
  id: string;
  email: string;
};

// Returns the admin user when the current session belongs to ADMIN_EMAIL.
// Returns null otherwise — does NOT redirect; callers decide what to do.
export async function getAdminUser(): Promise<AdminUser | null> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email || user.email !== adminEmail) {
    return null;
  }

  return { id: user.id, email: user.email };
}

// Throws when the caller is not the admin. Use inside route handlers
// to gate any mutation that uses the service-role client.
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) {
    throw new UnauthorizedError();
  }
  return user;
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}
