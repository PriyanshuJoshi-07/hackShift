import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Use at least 8 characters. Your previous password will stop working immediately."
    >
      <ResetPasswordForm configured={isSupabaseConfigured} />
    </AuthShell>
  );
}
