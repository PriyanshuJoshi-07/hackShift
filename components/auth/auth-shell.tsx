import Link from "next/link";
import { ArrowLeft, CheckCircle2, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { Brand } from "@/components/brand";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas lg:grid lg:grid-cols-[1fr_1.05fr]">
      <div className="relative flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <Brand />
          <Link
            href="/"
            className="focus-ring inline-flex items-center gap-1.5 rounded-lg text-xs font-semibold text-muted hover:text-ink"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to site
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <div>
            <span className="eyebrow">Secure access</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
          </div>
          <div className="mt-7">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
        </div>

        <p className="text-center text-[11px] leading-5 text-muted">
          Demonstration prototype · Synthetic data only · Never enter real patient records
        </p>
      </div>

      <aside className="relative hidden overflow-hidden bg-ink p-14 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-teal-500/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-medical-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-200">
            <HeartPulse className="size-3.5" aria-hidden="true" />
            Silent Revolution
          </span>
          <h2 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight">
            Care that stays private, connected, and human.
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              ["Role separation by design", "Patients and verified doctors see different workspaces."],
              ["Records stay protected", "Row-level security keeps every health record with its owner."],
              ["No self-promotion", "Doctor access requires a reviewed application and admin approval."],
            ].map(([title, copy]) => (
              <li key={title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal-300" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-400">{copy}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="flex items-center gap-2 text-xs font-bold text-teal-200">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Safety first
            </p>
            <p className="mt-1.5 text-[11px] leading-5 text-slate-400">
              This platform does not diagnose, prescribe, confirm appointments, or
              dispatch emergency services. In an emergency, contact local emergency
              services immediately.
            </p>
          </div>
          <p className="mt-8 flex items-center gap-2 text-[11px] text-slate-500">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Protected by Supabase Auth and PostgreSQL row-level security.
          </p>
        </div>
      </aside>
    </div>
  );
}
