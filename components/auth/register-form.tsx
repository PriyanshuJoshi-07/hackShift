"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Eye, EyeOff, Loader2, Stethoscope, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SetupNotice } from "@/components/auth/setup-notice";

type AccountKind = "patient" | "doctor";

export function RegisterForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [kind, setKind] = useState<AccountKind>("patient");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;
    setError(null);
    setMessage(null);

    if (password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        setError(
          signUpError.message.toLowerCase().includes("already registered")
            ? "An account with this email already exists. Try signing in."
            : "Unable to create your account right now. Please try again."
        );
        return;
      }

      if (!data.session) {
        setMessage(
          "Check your email to confirm your account, then sign in. " +
            (kind === "doctor"
              ? "After signing in, complete your doctor verification from the doctor application page."
              : "")
        );
        return;
      }

      if (kind === "doctor") {
        const { error: applicationError } = await supabase
          .from("doctor_applications")
          .insert({
            user_id: data.user!.id,
            specialty: specialty.trim(),
            license_number: licenseNumber.trim(),
            status: "pending",
          });
        if (applicationError) {
          setMessage("Account created. Please submit your doctor verification from the doctor application page.");
          return;
        }
        router.replace("/doctor-apply?submitted=1");
        router.refresh();
        return;
      }

      router.replace("/patient");
      router.refresh();
    } catch {
      setError("Unable to create your account right now. Please try again.");
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
      {message && (
        <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3">
          <p className="flex items-start gap-2 text-xs font-medium leading-5 text-teal-800">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {message}
          </p>
          <Link href="/login" className="mt-2 inline-block text-xs font-bold text-teal-700 underline underline-offset-2">
            Go to sign in
          </Link>
        </div>
      )}

      <fieldset>
        <legend className="mb-1.5 text-xs font-semibold text-ink">I am registering as</legend>
        <div className="grid grid-cols-2 gap-2">
          <RoleOption
            active={kind === "patient"}
            onClick={() => setKind("patient")}
            icon={UserRound}
            title="Patient"
            description="Book care and keep records"
          />
          <RoleOption
            active={kind === "doctor"}
            onClick={() => setKind("doctor")}
            icon={Stethoscope}
            title="Doctor"
            description="Apply for verified access"
          />
        </div>
        {kind === "doctor" && (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-[11px] leading-4 text-amber-800">
            Doctor accounts start as patients. Access to the doctor workspace is enabled
            only after an admin reviews your application. You cannot self-approve.
          </p>
        )}
      </fieldset>

      <Field label="Full name" htmlFor="fullName">
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          placeholder="e.g. Ananya Sharma"
        />
      </Field>

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

      <Field label="Password" htmlFor="password">
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 pr-11 text-sm text-ink placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            placeholder="At least 8 characters"
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

      {kind === "doctor" && (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <Field label="Medical specialty" htmlFor="specialty">
            <input
              id="specialty"
              type="text"
              required
              value={specialty}
              onChange={(event) => setSpecialty(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              placeholder="e.g. Cardiology"
            />
          </Field>
          <Field label="Medical registration / licence number" htmlFor="license">
            <input
              id="license"
              type="text"
              required
              value={licenseNumber}
              onChange={(event) => setLicenseNumber(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              placeholder="For verification review"
            />
          </Field>
          <p className="text-[10px] leading-4 text-muted">
            Use synthetic details in this prototype. Do not submit real licence data.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="focus-ring inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {loading ? "Creating account..." : "Create secure account"}
      </button>

      <p className="text-center text-xs text-muted">
        Already registered?{" "}
        <Link href="/login" className="focus-ring rounded font-semibold text-teal-700 hover:text-teal-600">
          Sign in
        </Link>
      </p>
    </form>
  );
}

function RoleOption({
  active,
  onClick,
  icon: Icon,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof UserRound;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring rounded-xl border p-3 text-left transition ${
        active
          ? "border-teal-500 bg-teal-50/70 ring-1 ring-teal-500"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <Icon className={`size-4 ${active ? "text-teal-700" : "text-slate-400"}`} aria-hidden="true" />
      <span className="mt-1.5 block text-xs font-bold text-ink">{title}</span>
      <span className="mt-0.5 block text-[10px] leading-4 text-muted">{description}</span>
    </button>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
