import { redirect } from "next/navigation";
import { getSessionProfile } from "@/lib/supabase/profile";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isDoctor } from "@/lib/auth/roles";

export default async function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isSupabaseConfigured) {
    const profile = await getSessionProfile();
    if (!profile) redirect("/login");
    if (!isDoctor(profile)) redirect("/patient?notice=doctor-approval");
  }
  return children;
}
