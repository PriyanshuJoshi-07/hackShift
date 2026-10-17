import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  FileLock2,
  HeartHandshake,
  HeartPulse,
  Languages,
  MessageSquareHeart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Siren,
  UserRound,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
}[] = [
  {
    icon: Sparkles,
    title: "AI health assistant",
    description:
      "Plain-language guidance, symptom checklists, and doctor-ready summaries with clear safety limits.",
    tag: "Guidance, not diagnosis",
  },
  {
    icon: CalendarCheck,
    title: "Effortless appointments",
    description:
      "Find the right doctor, request a slot, and keep every consultation in one calm timeline.",
    tag: "Care coordination",
  },
  {
    icon: MessageSquareHeart,
    title: "Private messaging",
    description:
      "Secure patient-doctor conversations with medical reports shared only with authorised care teams.",
    tag: "Consent-first",
  },
  {
    icon: Video,
    title: "Video consultations",
    description:
      "Meet your clinician remotely and receive a doctor-reviewed AI summary after the call.",
    tag: "Human reviewed",
  },
  {
    icon: BedDouble,
    title: "Hospital discovery",
    description:
      "Explore nearby hospitals and request bed availability without fabricated live promises.",
    tag: "Verified requests",
  },
  {
    icon: Siren,
    title: "Emergency SOS",
    description:
      "Immediate, clear emergency guidance and one-tap access to local emergency services.",
    tag: "Safety first",
  },
];

const patientBenefits = [
  "One timeline for appointments, reports, and medicines",
  "AI guidance in English and Hindi",
  "Private records you control",
];

const doctorBenefits = [
  "A focused view of today's patients",
  "Doctor-reviewed AI consultation summaries",
  "Secure reports and follow-up messaging",
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-32 top-8 size-[420px] rounded-full bg-teal-100/50 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-40 bottom-0 size-[360px] rounded-full bg-medical-100/50 blur-3xl" aria-hidden="true" />

          <div className="container-page relative grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="animate-fade-up">
              <span className="eyebrow">
                <span className="size-1.5 rounded-full bg-teal-500" />
                A calmer way to receive care
              </span>
              <h1 className="mt-6 max-w-2xl text-[42px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl">
                Healthcare that moves at the speed of{" "}
                <span className="relative whitespace-nowrap text-teal-700">
                  trust.
                  <svg className="absolute -bottom-2 left-0 h-3 w-full text-teal-300" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M2 9C50 3 150 3 198 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
                Silent Revolution connects patients, doctors, and hospitals through
                one thoughtful platform — from AI-guided questions to appointments,
                private records, and follow-up care.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/patient"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-slate-800"
                >
                  Open patient dashboard
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/doctor"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-ink transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <Stethoscope className="size-4 text-teal-600" aria-hidden="true" />
                  View doctor workspace
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex -space-x-2" aria-hidden="true">
                  {["AS", "RK", "MP", "NJ"].map((initials, index) => (
                    <span
                      key={initials}
                      className={`grid size-9 place-items-center rounded-full border-2 border-canvas text-[10px] font-bold text-white ${
                        ["bg-teal-600", "bg-medical-600", "bg-slate-600", "bg-amber-600"][index]
                      }`}
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <p className="text-xs leading-5 text-muted">
                  <span className="font-semibold text-ink">Built for both sides of care.</span>
                  <br />
                  Patients, clinicians, and hospital teams in one place.
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg animate-fade-up lg:mx-0">
              <div className="card relative z-10 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-700">Your care today</p>
                    <p className="mt-1 text-sm font-semibold text-ink">Monday, 17 October</p>
                  </div>
                  <span className="grid size-9 place-items-center rounded-xl bg-teal-50 text-teal-700">
                    <HeartPulse className="size-4" aria-hidden="true" />
                  </span>
                </div>

                <div className="space-y-3 p-4">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-medical-600 text-xs font-bold text-white">DR</span>
                        <div>
                          <p className="text-sm font-semibold text-ink">Dr. Devika Rao</p>
                          <p className="text-xs text-muted">Cardiology · Video consult</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-700">Confirmed</span>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                      <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" aria-hidden="true" /> 10:30 AM</span>
                      <span className="inline-flex items-center gap-1.5"><Video className="size-3.5" aria-hidden="true" /> 20 min</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-100 bg-white p-3.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Resting HR</p>
                      <p className="mt-1.5 text-xl font-bold text-ink">72 <span className="text-xs font-medium text-muted">bpm</span></p>
                      <p className="mt-1 text-[10px] font-medium text-teal-700">Within your usual range</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-white p-3.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Next medicine</p>
                      <p className="mt-1.5 text-xl font-bold text-ink">2:00 <span className="text-xs font-medium text-muted">PM</span></p>
                      <p className="mt-1 text-[10px] font-medium text-slate-500">As prescribed</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-ink p-4 text-white">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4 text-teal-300" aria-hidden="true" />
                      <p className="text-xs font-semibold">AI assistant note</p>
                      <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-teal-200">Demo</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-300">
                      Your blood pressure readings have been steady this week. Share
                      this summary with Dr. Rao before your consultation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card absolute -bottom-7 -left-3 z-20 flex items-center gap-3 p-3.5 sm:-left-8">
                <span className="grid size-9 place-items-center rounded-xl bg-teal-50 text-teal-700">
                  <ShieldCheck className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-bold text-ink">Private by design</p>
                  <p className="text-[10px] text-muted">You control every record share</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/70 bg-white">
          <div className="container-page grid grid-cols-2 gap-px overflow-hidden py-6 sm:grid-cols-4">
            {[
              ["01", "Unified patient timeline"],
              ["02", "Patient and doctor roles"],
              ["03", "English + Hindi"],
              ["04", "Emergency-first guidance"],
            ].map(([number, label]) => (
              <div key={number} className="flex items-center gap-3 px-2 py-2 sm:px-5">
                <span className="text-xs font-bold text-teal-600">{number}</span>
                <span className="text-xs font-semibold leading-5 text-slate-600">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="roles" className="container-page py-20">
          <div className="max-w-2xl">
            <span className="eyebrow">Made for real care journeys</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              One platform. Two clear experiences.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
              Patients get calm, connected care. Clinicians get signal instead of
              noise. Both stay in control of what is shared.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <RoleCard
              icon={UserRound}
              label="For patients"
              title="Your health, in one calm place"
              description="Ask questions, prepare for visits, and keep your care team aligned without chasing paperwork."
              benefits={patientBenefits}
              href="/patient"
              cta="Open patient dashboard"
              accent="teal"
            />
            <RoleCard
              icon={Stethoscope}
              label="For doctors"
              title="Focus on the person, not the admin"
              description="See the day ahead, review patient context, and follow up securely from a single workspace."
              benefits={doctorBenefits}
              href="/doctor"
              cta="Explore doctor workspace"
              accent="blue"
            />
          </div>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="eyebrow">The complete care loop</span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Every step, thoughtfully connected.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted">
                Purpose-built modules that work together — so care does not restart
                at every conversation.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title} className="group rounded-2xl border border-slate-200/80 bg-canvas p-5 transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-card">
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-white text-teal-700 shadow-sm ring-1 ring-slate-100">
                      <feature.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200/70">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[15px] font-bold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-muted">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="eyebrow">How it works</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Less friction between feeling unwell and feeling heard.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                A guided path keeps patients informed and gives clinicians the
                context they need before the conversation begins.
              </p>
              <div className="mt-7 flex items-center gap-3 rounded-2xl border border-teal-100 bg-teal-50/70 p-4">
                <HeartHandshake className="size-5 shrink-0 text-teal-700" aria-hidden="true" />
                <p className="text-xs leading-5 text-teal-900">
                  Designed with a human-in-the-loop: AI supports care teams, never
                  replaces them.
                </p>
              </div>
            </div>

            <ol className="relative space-y-3 before:absolute before:bottom-8 before:left-[27px] before:top-8 before:w-px before:bg-slate-200">
              {[
                ["Tell us what is happening", "Share symptoms and health context in a private intake flow."],
                ["Meet the right clinician", "Request an appointment or video consultation with a suitable doctor."],
                ["Keep care moving", "Messages, reports, and reviewed summaries stay together after the visit."],
              ].map(([title, description], index) => (
                <li key={title} className="relative flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
                  <span className="relative z-10 grid size-7 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-ink">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="safety" className="bg-ink py-20 text-white">
          <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-200">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                Safety is the feature
              </span>
              <h2 className="mt-5 max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
                Technology should make care safer, not bolder.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300">
                Silent Revolution is a demonstration prototype. It does not provide
                definitive diagnoses, prescribe medicines, confirm appointments, or
                dispatch emergency services. Every clinical decision belongs to a
                qualified professional.
              </p>
              <div className="mt-8 rounded-2xl border border-rose-300/20 bg-rose-400/10 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-rose-200">
                  <Siren className="size-4" aria-hidden="true" />
                  In an emergency
                </p>
                <p className="mt-2 text-xs leading-5 text-rose-100/90">
                  Chest pain, severe breathing difficulty, stroke signs, heavy
                  bleeding, or thoughts of self-harm require immediate help. Call
                  your local emergency number or go to the nearest emergency
                  department. Do not wait for an app response.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Sparkles, title: "No definitive AI diagnosis", copy: "AI output is educational guidance and must be reviewed by a clinician." },
                { icon: FileLock2, title: "Consent before sharing", copy: "Records and reports are visible only to the patient and authorised care team." },
                { icon: CheckCircle2, title: "Honest system status", copy: "Bed availability and appointments are requests, never guaranteed promises." },
                { icon: Languages, title: "Clear in both languages", copy: "The interface and safety notices are designed for English and Hindi." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <span className="grid size-10 place-items-center rounded-xl bg-teal-400/15 text-teal-300">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-400">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page py-20">
          <div className="relative overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-medical-50 p-8 sm:p-12">
            <div className="max-w-2xl">
              <span className="eyebrow bg-white">Start exploring</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                See the care experience for yourself.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Both workspaces use synthetic data so you can explore freely without
                any real patient information.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/patient" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Explore as a patient
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href="/doctor" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-slate-300">
                  Explore as a doctor
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-16 -right-10 hidden size-64 rounded-full border-[24px] border-teal-100/70 lg:block" aria-hidden="true" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function RoleCard({
  icon: Icon,
  label,
  title,
  description,
  benefits,
  href,
  cta,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  benefits: string[];
  href: string;
  cta: string;
  accent: "teal" | "blue";
}) {
  const styles =
    accent === "teal"
      ? { icon: "bg-teal-50 text-teal-700", button: "bg-teal-700 hover:bg-teal-600", check: "text-teal-600" }
      : { icon: "bg-medical-50 text-medical-600", button: "bg-medical-600 hover:bg-medical-700", check: "text-medical-600" };

  return (
    <article className="card flex flex-col p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <span className={`grid size-12 place-items-center rounded-2xl ${styles.icon}`}>
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{label}</span>
      </div>
      <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-700">
            <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${styles.check}`} aria-hidden="true" />
            {benefit}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`focus-ring mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${styles.button}`}
      >
        {cta}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
