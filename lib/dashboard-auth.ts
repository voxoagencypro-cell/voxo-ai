import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export function normalizeEmail(email: string | undefined | null): string | null {
  const value = email?.trim().toLowerCase();
  return value || null;
}

export function getAdminEmail(): string | null {
  return normalizeEmail(process.env.VOXO_ADMIN_EMAIL);
}

export function isAdminUser(user: User | null | undefined): boolean {
  const adminEmail = getAdminEmail();
  const userEmail = normalizeEmail(user?.email);
  return Boolean(adminEmail && userEmail && userEmail === adminEmail);
}

/** Session Supabase vérifiée côté serveur (pas de confiance au JWT local seul). */
export async function getVerifiedUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}
