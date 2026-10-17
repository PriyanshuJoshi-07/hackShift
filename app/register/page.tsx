import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start as a patient, or apply for verified doctor access."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="focus-ring rounded font-semibold text-teal-700 hover:text-teal-600">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm configured={isSupabaseConfigured} />
    </AuthShell>
  );
}
