import { AuthShell } from "@/components/auth/auth-shell";
import { DoctorApplicationForm } from "@/components/auth/doctor-application-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function DoctorApplyPage() {
  return (
    <AuthShell
      title="Doctor verification"
      subtitle="Doctor access is reviewed, never self-assigned. Submit your details for admin approval."
    >
      <DoctorApplicationForm configured={isSupabaseConfigured} />
    </AuthShell>
  );
}
