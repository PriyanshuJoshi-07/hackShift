import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your private patient or verified doctor workspace."
      footer={
        <>
          Need doctor access?{" "}
          <Link href="/doctor-apply" className="focus-ring rounded font-semibold text-teal-700 hover:text-teal-600">
            Apply for verification
          </Link>
        </>
      }
    >
      <LoginForm configured={isSupabaseConfigured} />
    </AuthShell>
  );
}
