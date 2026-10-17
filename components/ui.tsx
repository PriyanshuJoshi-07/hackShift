import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`card ${className}`}>{children}</section>;
}

export function CardHeader({
  title,
  action,
  icon: Icon,
}: {
  title: string;
  action?: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
      <div className="flex items-center gap-2.5">
        {Icon && <Icon className="size-4 text-teal-600" aria-hidden="true" />}
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Badge({
  children,
  tone = "teal",
}: {
  children: ReactNode;
  tone?: "teal" | "blue" | "amber" | "slate" | "rose";
}) {
  const tones: Record<string, string> = {
    teal: "bg-teal-50 text-teal-700 ring-teal-600/15",
    blue: "bg-medical-50 text-medical-600 ring-medical-600/15",
    amber: "bg-amber-50 text-amber-700 ring-amber-600/15",
    slate: "bg-slate-100 text-slate-600 ring-slate-500/15",
    rose: "bg-rose-50 text-rose-700 ring-rose-600/15",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "teal",
}: {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  tone?: "teal" | "blue" | "amber" | "rose";
}) {
  const tones: Record<string, string> = {
    teal: "bg-teal-50 text-teal-700",
    blue: "bg-medical-50 text-medical-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">{label}</p>
        <span className={`grid size-9 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{helper}</p>
    </div>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-3 text-xs leading-5 text-muted">
      {children}
    </p>
  );
}
