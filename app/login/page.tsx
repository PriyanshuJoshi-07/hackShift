import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const errorMessages: Record<string, string> = {
  missing_code: "That confirmation link is incomplete. Please sign in or request a new email.",
  confirmation_failed: "That confirmation link is invalid or expired. Please sign in or register again.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const notice = error ? errorMessages[error] ?? null : null;
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
      {notice && (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium leading-5 text-amber-800">
          {notice}
        </p>
      )}
      <LoginForm configured={isSupabaseConfigured} />
    </AuthShell>
  );
}
