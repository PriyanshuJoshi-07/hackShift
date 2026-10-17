"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SetupNotice } from "@/components/auth/setup-notice";

export function ResetPasswordForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [ready, setReady] = useState(!configured);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!configured) return;
    let active = true;

    async function load() {
      try {
        const {
          data: { user },
        } = await createClient().auth.getUser();
        if (!active) return;
        setHasSession(Boolean(user));
      } finally {
        if (active) setReady(true);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [configured]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await createClient().auth.updateUser({ password });
      if (updateError) {
        setError("Could not update your password. Request a new reset link.");
        return;
      }
      router.replace("/patient");
      router.refresh();
    } catch {
      setError("Could not update your password. Request a new reset link.");
    } finally {
      setLoading(false);
    }
  }

  if (!configured) {
    return <SetupNotice />;
  }

  if (!ready) {
    return (
      <p className="flex items-center gap-2 text-sm text-muted">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        Checking your reset link...
      </p>
    );
  }

  if (!hasSession) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-bold text-amber-900">This reset link is invalid or expired</p>
        <p className="mt-1.5 text-xs leading-5 text-amber-800">
          Reset links can only be used once. Request a new link to continue.
        </p>
        <Link
          href="/forgot-password"
          className="focus-ring mt-4 inline-flex rounded-lg text-xs font-bold text-amber-900 underline underline-offset-2"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error && (
        <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-700">
          {error}
        </p>
      )}
      {[["New password", password, setPassword, "new-password"], ["Confirm new password", confirm, setConfirm, "new-password"]].map(
        ([label, value, setter, autoComplete], index) => (
          <div key={label as string}>
            <label htmlFor={index === 0 ? "password" : "confirm"} className="mb-1.5 block text-xs font-semibold text-ink">
              {label as string}
            </label>
            <div className="relative">
              <input
                id={index === 0 ? "password" : "confirm"}
                type={index === 0 && showPassword ? "text" : "password"}
                autoComplete={autoComplete as string}
                required
                minLength={8}
                value={value as string}
                onChange={(event) => (setter as (v: string) => void)(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 pr-11 text-sm text-ink placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                placeholder="At least 8 characters"
              />
              {index === 0 && (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="focus-ring absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-ink"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              )}
            </div>
          </div>
        )
      )}
      <button
        type="submit"
        disabled={loading}
        className="focus-ring inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <ShieldCheck className="size-4" aria-hidden="true" />}
        {loading ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}
