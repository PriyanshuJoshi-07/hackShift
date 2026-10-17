import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  MessageSquare,
  Sparkles,
  Stethoscope,
  Users,
  Video,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Badge, Card, CardHeader, EmptyNote, StatCard } from "@/components/ui";

const stats = [
  { label: "Appointments today", value: "8 patients", helper: "3 video · 5 in clinic", icon: CalendarCheck, tone: "teal" as const },
  { label: "Waiting now", value: "3 patients", helper: "Average wait 12 min", icon: Users, tone: "amber" as const },
  { label: "Follow-ups due", value: "5 reviews", helper: "Across this week", icon: ClipboardList, tone: "blue" as const },
  { label: "Unread messages", value: "2 threads", helper: "Patient questions", icon: MessageSquare, tone: "rose" as const },
];

const schedule = [
  { time: "09:00", name: "Rohan Kapoor", type: "Follow-up · In clinic", status: "Completed", initials: "RK" },
  { time: "09:45", name: "Meera Pillai", type: "New consultation · Video", status: "In progress", initials: "MP" },
  { time: "10:30", name: "Ananya Sharma", type: "Report review · Video", status: "Next", initials: "AS" },
  { time: "11:15", name: "Nikhil Jain", type: "Follow-up · In clinic", status: "Upcoming", initials: "NJ" },
  { time: "12:00", name: "Sara Ali", type: "New consultation · Video", status: "Upcoming", initials: "SA" },
];

const queue = [
  {
    name: "Meera Pillai",
    age: "34 · Female",
    reason: "Recurring headaches for 3 weeks",
    note: "AI draft: reports regular sleep, no fever, no neurological red flags recorded. Review needed.",
    wait: "8 min",
  },
  {
    name: "Nikhil Jain",
    age: "58 · Male",
    reason: "Blood pressure follow-up",
    note: "AI draft: home readings averaged 138/86 this week. Medicine adherence reported as consistent.",
    wait: "14 min",
  },
  {
    name: "Sara Ali",
    age: "27 · Female",
    reason: "Persistent fatigue and low appetite",
    note: "AI draft: recent lab report uploaded. No urgent symptoms recorded in intake.",
    wait: "21 min",
  },
];

export default function DoctorDashboard() {
  return (
    <DashboardShell role="doctor" name="Dr. Devika Rao" subtitle="Clinician overview">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="space-y-5">
          <Card>
            <CardHeader
              title="Today's schedule"
              icon={CalendarDays}
              action={<Badge tone="teal">8 appointments</Badge>}
            />
            <div className="divide-y divide-slate-100">
              {schedule.map((appointment) => (
                <div key={appointment.time} className="flex items-center gap-3 px-5 py-3.5 sm:gap-4">
                  <div className="w-12 shrink-0">
                    <p className="text-xs font-bold text-ink">{appointment.time}</p>
                    <p className="text-[10px] text-muted">AM</p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                    {appointment.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-ink">{appointment.name}</p>
                    <p className="truncate text-[11px] text-muted">{appointment.type}</p>
                  </div>
                  <span
                    className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold sm:inline-flex ${
                      appointment.status === "Completed"
                        ? "bg-slate-100 text-slate-500"
                        : appointment.status === "In progress"
                          ? "bg-medical-50 text-medical-600"
                          : appointment.status === "Next"
                            ? "bg-teal-50 text-teal-700"
                            : "bg-slate-50 text-slate-500"
                    }`}
                  >
                    {appointment.status}
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-slate-300" aria-hidden="true" />
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 px-5 py-3">
              <button type="button" className="focus-ring inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-600">
                View full clinic day
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Patient queue"
              icon={Users}
              action={<Badge tone="amber">3 waiting</Badge>}
            />
            <div className="space-y-4 p-5">
              {queue.map((patient) => (
                <div key={patient.name} className="rounded-xl border border-slate-200/80 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-ink">{patient.name}</p>
                      <p className="text-[11px] text-muted">{patient.age} · {patient.reason}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                      <Clock3 className="size-3" aria-hidden="true" />
                      Waiting {patient.wait}
                    </span>
                  </div>
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 p-3">
                    <Sparkles className="mt-0.5 size-3.5 shrink-0 text-teal-600" aria-hidden="true" />
                    <p className="text-[11px] leading-4 text-slate-600">{patient.note}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" className="focus-ring rounded-lg bg-ink px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-slate-800">
                      Open records
                    </button>
                    <button type="button" className="focus-ring rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:bg-slate-50">
                      Start consultation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Recent consultation summaries" icon={ClipboardList} action={<Badge tone="blue">Doctor review required</Badge>} />
            <div className="divide-y divide-slate-100">
              {[
                ["Rohan Kapoor", "Follow-up · today, 9:45 AM", "Summary approved"],
                ["Ananya Sharma", "Cardiology · 12 Oct 2026", "Awaiting review"],
                ["Kavya Nair", "General medicine · 10 Oct 2026", "Summary approved"],
              ].map(([name, meta, status]) => (
                <div key={name} className="flex items-center gap-3 px-5 py-3.5">
                  <span className={`grid size-8 place-items-center rounded-lg ${status === "Awaiting review" ? "bg-amber-50 text-amber-600" : "bg-teal-50 text-teal-700"}`}>
                    {status === "Awaiting review" ? <Clock3 className="size-4" aria-hidden="true" /> : <CheckCircle2 className="size-4" aria-hidden="true" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-ink">{name}</p>
                    <p className="truncate text-[11px] text-muted">{meta}</p>
                  </div>
                  <Badge tone={status === "Awaiting review" ? "amber" : "teal"}>{status}</Badge>
                </div>
              ))}
            </div>
            <EmptyNote>
              <span className="block px-5 py-2">
                AI summaries are drafts only and must be reviewed and edited by the
                treating clinician before use.
              </span>
            </EmptyNote>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Next consultation" icon={Video} action={<Badge tone="teal">In 12 min</Badge>} />
            <div className="p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-medical-600 text-xs font-bold text-white">AS</span>
                <div>
                  <p className="text-sm font-bold text-ink">Ananya Sharma</p>
                  <p className="text-[11px] text-muted">Report review · 10:30 AM</p>
                </div>
              </div>
              <div className="mt-4 space-y-2.5 rounded-xl bg-slate-50 p-4">
                {["Complete blood count · 12 Oct", "Lipid profile · 02 Oct", "Current medicines reconciled"].map((item) => (
                  <p key={item} className="flex items-start gap-2 text-[11px] text-slate-600">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-teal-600" aria-hidden="true" />
                    {item}
                  </p>
                ))}
              </div>
              <button type="button" className="focus-ring mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800">
                <Video className="size-3.5" aria-hidden="true" />
                Open consultation room
              </button>
              <p className="mt-2 text-center text-[10px] text-muted">
                Video integration is not configured in this prototype.
              </p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Availability" icon={Stethoscope} action={<Badge tone="teal">Available</Badge>} />
            <div className="space-y-3 p-5">
              {[
                ["Morning clinic", "09:00 – 12:30", "8 slots"],
                ["Video consults", "14:00 – 16:00", "5 slots"],
                ["Follow-up block", "16:30 – 17:30", "3 slots"],
              ].map(([label, time, slots]) => (
                <div key={label} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-3.5 py-3">
                  <div>
                    <p className="text-xs font-semibold text-ink">{label}</p>
                    <p className="text-[11px] text-muted">{time}</p>
                  </div>
                  <span className="rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500">{slots}</span>
                </div>
              ))}
              <EmptyNote>
                Availability is demonstration data. No real appointment slots are
                published or confirmed.
              </EmptyNote>
            </div>
          </Card>

          <Card>
            <CardHeader title="Patient messages" icon={MessageSquare} action={<Badge tone="blue">2 new</Badge>} />
            <div className="divide-y divide-slate-100">
              {[
                ["Meera Pillai", "Should I continue the same tablets until Friday?", "9:08 AM"],
                ["Ananya Sharma", "I have uploaded my latest blood report.", "8:54 AM"],
                ["Rohan Kapoor", "Thank you, doctor. The new routine is helping.", "Yesterday"],
              ].map(([name, preview, time]) => (
                <div key={name} className="px-5 py-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-ink">{name}</p>
                    <span className="text-[10px] text-muted">{time}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-muted">{preview}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 px-5 py-3">
              <button type="button" className="focus-ring inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-600">
                Open inbox
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </Card>

          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <p className="flex items-center gap-2 text-xs font-bold text-rose-700">
              <Stethoscope className="size-4" aria-hidden="true" />
              Clinical safety reminder
            </p>
            <p className="mt-1.5 text-[11px] leading-5 text-rose-700/90">
              AI notes are informational drafts. Verify all patient information and
              make every clinical decision yourself.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
