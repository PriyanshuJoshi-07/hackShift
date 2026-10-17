"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FileHeart,
  HeartPulse,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  MessageSquare,
  Pill,
  Search,
  Settings,
  Siren,
  Stethoscope,
  Users,
  Video,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Brand } from "@/components/brand";

type Role = "patient" | "doctor";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

const patientNav: NavItem[] = [
  { label: "Overview", href: "/patient", icon: LayoutDashboard },
  { label: "Appointments", href: "/patient", icon: CalendarDays, badge: "2" },
  { label: "Messages", href: "/patient", icon: MessageSquare, badge: "3" },
  { label: "AI assistant", href: "/patient", icon: HeartPulse },
  { label: "Medications", href: "/patient", icon: Pill },
  { label: "Reports", href: "/patient", icon: FileHeart },
];

const doctorNav: NavItem[] = [
  { label: "Overview", href: "/doctor", icon: LayoutDashboard },
  { label: "Today's clinic", href: "/doctor", icon: CalendarDays, badge: "8" },
  { label: "Patients", href: "/doctor", icon: Users },
  { label: "Messages", href: "/doctor", icon: MessageSquare, badge: "2" },
  { label: "Consultations", href: "/doctor", icon: Video },
  { label: "Clinical notes", href: "/doctor", icon: ClipboardList },
];

export function DashboardShell({
  role,
  name,
  subtitle,
  children,
}: {
  role: Role;
  name: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const nav = role === "patient" ? patientNav : doctorNav;
  const roleLabel = role === "patient" ? "Patient" : "Doctor";
  const switchHref = role === "patient" ? "/doctor" : "/patient";

  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      <button
        type="button"
        className={`fixed inset-0 z-40 cursor-default bg-ink/40 backdrop-blur-sm transition lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-label="Close navigation overlay"
        tabIndex={open ? 0 : -1}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200/80 bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Dashboard navigation"
      >
        <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-5">
          <Brand compact />
          <button
            type="button"
            className="focus-ring grid size-9 place-items-center rounded-lg text-muted hover:bg-slate-100 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-4 py-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700">
            <span className="size-1.5 rounded-full bg-teal-500" />
            {roleLabel} workspace
          </span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {nav.map((item, index) => {
            const active = index === 0 && pathname === item.href;
            return (
              <Link
                key={`${item.label}-${index}`}
                href={item.href}
                className={`focus-ring flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-ink text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-ink"
                }`}
              >
                <item.icon className={`size-[18px] ${active ? "text-teal-300" : "text-slate-400"}`} aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                      active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-4">
            <Link
              href="/"
              className="focus-ring flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-ink"
            >
              <Settings className="size-[18px] text-slate-400" aria-hidden="true" />
              Settings
            </Link>
          </div>
        </nav>

        <div className="border-t border-slate-100 p-3">
          <Link
            href="/#safety"
            className="focus-ring block rounded-xl bg-rose-50 p-3.5 transition hover:bg-rose-100/70"
          >
            <span className="flex items-center gap-2 text-xs font-bold text-rose-700">
              <Siren className="size-4" aria-hidden="true" />
              Emergency SOS
            </span>
            <span className="mt-1 block text-[11px] leading-4 text-rose-600/90">
              Life-threatening symptoms? Call local emergency services first.
            </span>
          </Link>
          <Link
            href={switchHref}
            className="focus-ring mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-muted hover:bg-slate-50 hover:text-ink"
          >
            <Stethoscope className="size-4" aria-hidden="true" />
            Switch to {role === "patient" ? "doctor" : "patient"} view
          </Link>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-[#F7F9F8]/90 backdrop-blur-xl">
          <div className="flex h-[72px] items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="focus-ring grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-ink lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>
            <div className="relative hidden max-w-md flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                placeholder={role === "patient" ? "Search doctors, records, medicines" : "Search patients or records"}
                aria-label="Search"
                className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-ink placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <span className="hidden rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted sm:inline-flex">
                Demo data
              </span>
              <button
                type="button"
                className="focus-ring relative grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-ink"
                aria-label="Notifications"
              >
                <Bell className="size-[18px]" />
                <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>
              <button
                type="button"
                className="focus-ring flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-2 sm:pr-3"
                aria-label="Account menu"
              >
                <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-teal-500 to-medical-600 text-xs font-bold text-white">
                  {name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-xs font-semibold leading-4 text-ink">{name}</span>
                  <span className="block text-[10px] leading-4 text-muted">{roleLabel}</span>
                </span>
                <ChevronDown className="hidden size-3.5 text-slate-400 sm:block" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-700">
                {subtitle}
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-[28px]">
                Good morning, {name.split(" ")[0]}
              </h1>
            </div>
            <p className="text-xs text-muted">Monday, 17 October · Synthetic demo workspace</p>
          </div>
          {children}
        </main>

        <footer className="px-6 pb-6 text-center text-[11px] leading-5 text-muted">
          Silent Revolution prototype · Demonstration data only · Not for clinical use
        </footer>
      </div>

      <Link
        href="/#safety"
        className="focus-ring fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-rose-700 lg:hidden"
      >
        <LifeBuoy className="size-4" aria-hidden="true" />
        SOS
      </Link>
    </div>
  );
}
