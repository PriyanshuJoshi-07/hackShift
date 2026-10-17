"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";

const links = [
  { href: "/#features", label: "Platform" },
  { href: "/#roles", label: "For you" },
  { href: "/#safety", label: "Safety" },
  { href: "/patient", label: "Patient demo" },
  { href: "/doctor", label: "Doctor demo" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-canvas/85 backdrop-blur-xl">
      <div className="container-page flex h-[72px] items-center justify-between">
        <Brand />
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-md text-sm font-medium text-muted transition hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="focus-ring rounded-xl px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-slate-100"
          >
            Sign in
          </Link>
          <Link
            href="/patient"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-slate-800"
          >
            Open dashboard
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <button
          type="button"
          className="focus-ring grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-slate-200/70 bg-canvas px-5 pb-5 pt-2 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-lg px-2 py-3 text-sm font-medium text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/patient"
              onClick={() => setOpen(false)}
              className="focus-ring mt-2 rounded-xl bg-ink px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Open patient dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
