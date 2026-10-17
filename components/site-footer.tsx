import Link from "next/link";
import { Brand } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            A patient-first healthcare experience connecting people, doctors, and
            hospitals with calm, clear technology.
          </p>
          <p className="mt-5 text-xs font-medium text-muted">
            Hackathon prototype. Synthetic demonstration data only.
          </p>
        </div>
        <FooterColumn title="Product" links={[["Patient dashboard", "/patient"], ["Doctor workspace", "/doctor"], ["Platform", "/#features"], ["Safety", "/#safety"]]} />
        <FooterColumn title="Care" links={[["AI health assistant", "/#features"], ["Appointments", "/#features"], ["Messaging", "/#features"], ["Emergency", "/#safety"]]} />
        <FooterColumn title="Support" links={[["Help centre", "/#safety"], ["Privacy", "/#safety"], ["Accessibility", "/#safety"], ["Contact", "/#safety"]]} />
      </div>
      <div className="border-t border-slate-200/70">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Silent Revolution.</p>
          <p>Not a substitute for professional medical advice or emergency services.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="focus-ring rounded text-sm text-muted transition hover:text-teal-700">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
