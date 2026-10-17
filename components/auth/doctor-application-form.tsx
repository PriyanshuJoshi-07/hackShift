"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock3, Loader2, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SetupNotice } from "@/components/auth/setup-notice";

type Application = {
  specialty: string;
  license_number: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export function DoctorApplicationForm({ configured }: { configured: boolean }) {
  const [application, setApplication] = useState<Application | null>(null);
  const [checking, setChecking] = useState(configured);
  const [specialty, setSpecialty] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!configured) return;
    let active = true;

    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        if (active) setChecking(false);
        return;
      }
      const { data } = await supabase
        .from("doctor_applications")
        .select("specialty, license_number, status, created_at")
        .eq("user_id", user.id)
        .maybeSingle();
      if (active) {
        setApplication((data as Application | null) ?? null);
        setChecking(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [configured]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("Please sign in again before submitting your application.");
        return;
      }

      const { error: insertError } = await supabase.from("doctor_applications").insert({
        user_id: user.id,
        specialty: specialty.trim(),
        license_number: licenseNumber.trim(),
        status: "pending",
      });

      if (insertError) {
        setError(
          insertError.code === "23505"
            ? "You already have a doctor application on file."
            : "Could not submit your application. Please try again."
        );
        return;
      }

      setApplication({
        specialty: specialty.trim(),
        license_number: licenseNumber.trim(),
        status: "pending",
        created_at: new Date().toISOString(),
      });
    } catch {
      setError("Could not submit your application. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!configured) {
    return (
      <div className="space-y-4">
        <SetupNotice />
        <p className="text-xs leading-5 text-muted">
          You can still explore the doctor dashboard in demo mode. Real doctor access
          requires Supabase authentication and an approved application.
        </p>
      </div>
    );
  }

  if (checking) {
    return (
      <p className="flex items-center gap-2 text-sm text-muted">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        Checking your application status...
      </p>
    );
  }

  if (application) {
    const approved = application.status === "approved";
    const pending = application.status === "pending";
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            approved
              ? "bg-teal-50 text-teal-700"
              : pending
                ? "bg-amber-50 text-amber-700"
                : "bg-rose-50 text-rose-700"
          }`}
        >
          {approved ? <CheckCircle2 className="size-3.5" /> : <Clock3 className="size-3.5" />}
          Application {application.status}
        </span>
        <dl className="mt-4 space-y-2 text-xs">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Specialty</dt>
            <dd className="font-medium text-ink">{application.specialty}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Registration / licence</dt>
            <dd className="font-medium text-ink">{application.license_number}</dd>
          </div>
        </dl>
        <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5 text-[11px] leading-5 text-slate-600">
          {approved
            ? "Your doctor role is approved. Doctor workspace access depends on admin verification of your role."
            : pending
              ? "Your application is waiting for admin review. You currently have patient access only and cannot approve yourself."
              : "Your application was not approved. Contact support if you believe this is a mistake."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-700">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="specialty" className="mb-1.5 block text-xs font-semibold text-ink">
          Medical specialty
        </label>
        <input
          id="specialty"
          required
          value={specialty}
          onChange={(event) => setSpecialty(event.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          placeholder="e.g. Cardiology"
        />
      </div>
      <div>
        <label htmlFor="license" className="mb-1.5 block text-xs font-semibold text-ink">
          Medical registration / licence number
        </label>
        <input
          id="license"
          required
          value={licenseNumber}
          onChange={(event) => setLicenseNumber(event.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          placeholder="Use synthetic details in this prototype"
        />
      </div>
      <p className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-[11px] leading-5 text-amber-800">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        Your account stays a patient account until an administrator verifies this
        application. Role changes cannot be made from the browser.
      </p>
      <button
        type="submit"
        disabled={loading}
        className="focus-ring inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {loading ? "Submitting..." : "Submit for review"}
      </button>
      <p className="text-center text-[11px] text-muted">
        Prefer the patient experience?{" "}
        <Link href="/patient" className="font-semibold text-teal-700">
          Go to patient dashboard
        </Link>
      </p>
    </form>
  );
}
