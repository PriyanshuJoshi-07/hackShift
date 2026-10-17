"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SetupNotice } from "@/components/auth/setup-notice";

export function ForgotPasswordForm({ configured }: { configured: boolean }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        }
      );

      if (resetError) {
        setError("Could not send a reset email right now. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setError("Could not send a reset email right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!configured) {
    return <SetupNotice />;
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
        <MailCheck className="size-5 text-teal-700" aria-hidden="true" />
        <p className="mt-3 text-sm font-bold text-teal-900">Check your email</p>
        <p className="mt-1.5 text-xs leading-5 text-teal-800">
          If an account exists for {email.trim()}, we sent a secure link to reset
          your password. The link expires shortly for your safety.
        </p>
        <Link
          href="/login"
          className="focus-ring mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 underline underline-offset-2"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to sign in
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
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-ink">
          Email address
        </label>
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
      </div>
      <button
        type="submit"
        disabled={loading}
        className="focus-ring inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {loading ? "Sending..." : "Send reset link"}
      </button>
      <p className="text-center text-xs text-muted">
        Remembered it?{" "}
        <Link href="/login" className="focus-ring rounded font-semibold text-teal-700 hover:text-teal-600">
          Sign in
        </Link>
      </p>
    </form>
  );
}
