import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We will email you a secure, single-use link to choose a new password."
    >
      <ForgotPasswordForm configured={isSupabaseConfigured} />
    </AuthShell>
  );
}
