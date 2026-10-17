import { redirect } from "next/navigation";
import { getSessionProfile } from "@/lib/supabase/profile";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isSupabaseConfigured) {
    const profile = await getSessionProfile();
    if (!profile) redirect("/login");
  }
  return children;
}
