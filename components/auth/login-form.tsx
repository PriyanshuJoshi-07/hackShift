"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { homeRouteFor } from "@/lib/auth/roles";
import { SetupNotice } from "@/components/auth/setup-notice";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError || !data.user) {
        setError("Email or password is incorrect.");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, is_verified")
        .eq("id", data.user.id)
        .maybeSingle();

      router.replace(profile ? homeRouteFor({
        role: profile.role === "doctor" ? "doctor" : "patient",
        is_verified: Boolean(profile.is_verified),
      }) : "/patient");
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!configured) {
    return <SetupNotice />;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error && (
        <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-700">
          {error}
        </p>
      )}

      <Field label="Email address" htmlFor="email">
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          placeholder="you@example.com"
        />
      </Field>

      <Field
        label="Password"
        htmlFor="password"
        action={
          <Link href="/forgot-password" className="text-[11px] font-semibold text-teal-700 hover:text-teal-600">
            Forgot password?
          </Link>
        }
      >
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 pr-11 text-sm text-ink placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            placeholder="Your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="focus-ring absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-ink"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="focus-ring inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <LogIn className="size-4" aria-hidden="true" />}
        {loading ? "Signing in..." : "Sign in securely"}
      </button>

      <p className="text-center text-xs text-muted">
        New here?{" "}
        <Link href="/register" className="focus-ring rounded font-semibold text-teal-700 hover:text-teal-600">
          Create an account
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  action,
  children,
}: {
  label: string;
  htmlFor: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={htmlFor} className="block text-xs font-semibold text-ink">
          {label}
        </label>
        {action}
      </div>
      {children}
    </div>
  );
}
