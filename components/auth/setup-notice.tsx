import { AlertTriangle } from "lucide-react";
import { SUPABASE_ANON_KEY_ENV, SUPABASE_URL_ENV } from "@/lib/supabase/config";

export function SetupNotice() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <p className="flex items-center gap-2 text-sm font-bold text-amber-800">
        <AlertTriangle className="size-4" aria-hidden="true" />
        Authentication is not configured
      </p>
      <p className="mt-2 text-xs leading-5 text-amber-800/90">
        Real sign-in, registration, and role checks are disabled until Supabase
        credentials are added. No fake authentication is performed.
      </p>
      <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-[11px] leading-4 text-amber-900/90">
        <li>Create a Supabase project and run the migration in `supabase/migrations/`.</li>
        <li>
          Add `{SUPABASE_URL_ENV}` and `{SUPABASE_ANON_KEY_ENV}` to `.env.local`.
        </li>
        <li>Restart the dev server, then sign in or create an account.</li>
      </ol>
      <p className="mt-2 text-[11px] text-amber-700">
        Use only the anon (public) key in the app. Never expose the service role key.
      </p>
    </div>
  );
}
