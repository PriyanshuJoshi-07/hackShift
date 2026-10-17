import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="focus-ring flex items-center gap-2.5 rounded-lg">
      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-teal-600 to-medical-600 text-white shadow-soft">
        <HeartPulse className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-bold tracking-tight text-ink">
          Silent Revolution
        </span>
        {!compact && (
          <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            Care, connected
          </span>
        )}
      </span>
    </Link>
  );
}
