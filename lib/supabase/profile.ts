import { isSupabaseConfigured } from "./config";
import { createClient } from "./server";
import type { Role } from "@/lib/auth/roles";

export type Profile = {
  full_name: string;
  role: Role;
  is_verified: boolean;
  email: string | null;
};

export async function getSessionProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("full_name, role, is_verified")
    .eq("id", user.id)
    .maybeSingle();

  if (!data) return null;

  return {
    full_name: data.full_name,
    role: data.role as Role,
    is_verified: Boolean(data.is_verified),
    email: user.email ?? null,
  };
}
