import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileHeart,
  HeartPulse,
  MessageSquare,
  Pill,
  Plus,
  Sparkles,
  Stethoscope,
  Video,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { getSessionProfile } from "@/lib/supabase/profile";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Badge, Card, CardHeader, EmptyNote, StatCard } from "@/components/ui";

const stats = [
  { label: "Next appointment", value: "Today, 10:30", helper: "Dr. Devika Rao · Cardiology", icon: CalendarCheck, tone: "teal" as const },
  { label: "Resting heart rate", value: "72 bpm", helper: "Within your recent range", icon: HeartPulse, tone: "rose" as const },
  { label: "Medicines due", value: "2 today", helper: "Next dose at 2:00 PM", icon: Pill, tone: "amber" as const },
  { label: "Unread messages", value: "3 messages", helper: "From your care team", icon: MessageSquare, tone: "blue" as const },
];

const medicines = [
  { name: "Metformin 500 mg", schedule: "After breakfast · 8:00 AM", status: "Taken" },
  { name: "Vitamin D3", schedule: "After lunch · 2:00 PM", status: "Due" },
  { name: "Amlodipine 5 mg", schedule: "After dinner · 9:00 PM", status: "Upcoming" },
];

const messages = [
  { name: "Dr. Devika Rao", preview: "Your latest report looks stable. Let's review it together on the call.", time: "9:12 AM" },
  { name: "Care coordinator", preview: "Your appointment link is ready. Join five minutes early.", time: "Yesterday" },
  { name: "Dr. Arjun Mehta", preview: "Please continue the current plan until we meet on Thursday.", time: "Mon" },
];

export default async function PatientDashboard() {
  const profile = await getSessionProfile();
  const name = profile?.full_name?.trim() || "Ananya Sharma";

  return (
    <DashboardShell role="patient" name={name} subtitle="Patient overview" demoMode={!isSupabaseConfigured}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          <Card>
            <CardHeader
              title="Next appointment"
              icon={CalendarDays}
              action={<Badge tone="teal">Confirmed · demo</Badge>}
            />
            <div className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-medical-600 text-sm font-bold text-white">
                    DR
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">Dr. Devika Rao</h3>
                    <p className="text-xs text-muted">Cardiology · Video consultation</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="size-3.5 text-teal-600" aria-hidden="true" />
                        Today, 10:30 – 10:50 AM
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Video className="size-3.5 text-teal-600" aria-hidden="true" />
                        Secure video room
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/patient"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 sm:shrink-0"
                >
                  View details
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50/60 px-4 py-3">
                <p className="text-xs leading-5 text-teal-900">
                  <span className="font-semibold">Prepare for your visit:</span> note any
                  new symptoms and keep your medicine list nearby. The video room
                  opens 5 minutes before the appointment.
                </p>
              </div>
              <EmptyNote>
                Appointment status is synthetic for this prototype. No real booking or
                video consultation is created from this screen.
              </EmptyNote>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="AI health assistant"
              icon={Sparkles}
              action={<Badge tone="amber">Guidance only</Badge>}
            />
            <div className="p-5">
              <div className="rounded-xl bg-ink p-5 text-white">
                <p className="text-sm leading-6">
                  Hello Ananya. I can help you understand symptoms, prepare questions
                  for your doctor, or explain your medicines in simple language. I do
                  not diagnose conditions or prescribe medicines.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Explain my blood report", "Prepare for my visit", "When should I seek urgent care?"].map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="focus-ring rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-200 transition hover:bg-white/10"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-[11px] leading-4 text-muted">
                  Conversation history will appear here once the assistant module is
                  connected.
                </p>
                <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                  Preview
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Recent reports"
              icon={FileHeart}
              action={
                <button type="button" className="focus-ring rounded-lg p-1 text-muted hover:text-ink" aria-label="Upload report">
                  <Plus className="size-4" />
                </button>
              }
            />
            <div className="divide-y divide-slate-100">
              {[
                ["Complete blood count", "Dr. Rao · 12 Oct 2026", "Reviewed"],
                ["Lipid profile", "City Diagnostics · 02 Oct 2026", "Shared"],
                ["Chest X-ray report", "Dr. Mehta · 18 Sep 2026", "Reviewed"],
              ].map(([title, meta, status]) => (
                <div key={title} className="flex items-center gap-3 px-5 py-3.5">
                  <span className="grid size-9 place-items-center rounded-lg bg-medical-50 text-medical-600">
                    <FileHeart className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{title}</p>
                    <p className="truncate text-[11px] text-muted">{meta}</p>
                  </div>
                  <Badge tone={status === "Reviewed" ? "teal" : "slate"}>{status}</Badge>
                  <ChevronRight className="size-4 text-slate-300" aria-hidden="true" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Today's plan" icon={CalendarCheck} />
            <div className="space-y-4 p-5">
              {[
                ["8:00 AM", "Metformin with breakfast", "done"],
                ["10:30 AM", "Cardiology video consult", "next"],
                ["2:00 PM", "Vitamin D3 after lunch", "upcoming"],
                ["6:30 PM", "15-minute walk", "upcoming"],
              ].map(([time, label, state]) => (
                <div key={`${time}-${label}`} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className={`mt-0.5 size-2.5 rounded-full ${state === "done" ? "bg-teal-500" : state === "next" ? "bg-medical-600 ring-4 ring-medical-100" : "border-2 border-slate-300 bg-white"}`} />
                    {label !== "15-minute walk" && <span className="mt-1 h-full w-px bg-slate-200" />}
                  </div>
                  <div className="pb-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">{time}</p>
                    <p className={`text-xs font-medium ${state === "done" ? "text-muted line-through" : "text-ink"}`}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Medications" icon={Pill} action={<Badge tone="slate">2 due</Badge>} />
            <div className="divide-y divide-slate-100">
              {medicines.map((medicine) => (
                <div key={medicine.name} className="px-5 py-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-ink">{medicine.name}</p>
                    <span className={`text-[10px] font-bold ${medicine.status === "Taken" ? "text-teal-700" : medicine.status === "Due" ? "text-amber-600" : "text-slate-400"}`}>
                      {medicine.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted">{medicine.schedule}</p>
                </div>
              ))}
            </div>
            <p className="border-t border-slate-100 px-5 py-3 text-[10px] leading-4 text-muted">
              Always follow your clinician&apos;s instructions. This demo does not provide
              medicine or dosage advice.
            </p>
          </Card>

          <Card>
            <CardHeader title="Care team" icon={Stethoscope} />
            <div className="divide-y divide-slate-100">
              {[
                ["DR", "Dr. Devika Rao", "Cardiology"],
                ["AM", "Dr. Arjun Mehta", "General medicine"],
                ["SK", "Sana Khan", "Care coordinator"],
              ].map(([initials, name, specialty]) => (
                <div key={name} className="flex items-center gap-3 px-5 py-3.5">
                  <span className="grid size-9 place-items-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                    {initials}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-ink">{name}</p>
                    <p className="text-[11px] text-muted">{specialty}</p>
                  </div>
                  <button type="button" className="focus-ring rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-teal-700" aria-label={`Message ${name}`}>
                    <MessageSquare className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Recent messages" icon={MessageSquare} action={<Badge tone="blue">3 new</Badge>} />
            <div className="divide-y divide-slate-100">
              {messages.map((message) => (
                <div key={message.name} className="px-5 py-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-ink">{message.name}</p>
                    <span className="text-[10px] text-muted">{message.time}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-muted">{message.preview}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
