import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { EmailOtpType } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseConfig } from "@/lib/supabase/config";
import { homeRouteFor, safePostAuthPath } from "@/lib/auth/roles";

type PendingCookie = { name: string; value: string; options?: CookieOptions };

const OTP_TYPES: readonly EmailOtpType[] = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
];

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.search = "";

  if (!isSupabaseConfigured) {
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  const code = request.nextUrl.searchParams.get("code");
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const otpType = request.nextUrl.searchParams.get("type");
  const next = request.nextUrl.searchParams.get("next");
  const safeNext =
    safePostAuthPath(next) ??
    (otpType === "recovery" ? "/reset-password" : null);

  const validOtpType =
    otpType && (OTP_TYPES as readonly string[]).includes(otpType)
      ? (otpType as EmailOtpType)
      : null;

  if (!code && !(tokenHash && validOtpType)) {
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("error", "missing_code");
    return NextResponse.redirect(redirectUrl);
  }

  let pendingCookies: PendingCookie[] = [];
  const { url, anonKey } = supabaseConfig();

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        pendingCookies = cookiesToSet;
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
      },
    },
  });

  const { error } =
    tokenHash && validOtpType
      ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type: validOtpType })
      : await supabase.auth.exchangeCodeForSession(code!);

  if (error) {
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("error", "confirmation_failed");
    return NextResponse.redirect(redirectUrl);
  }

  if (safeNext) {
    redirectUrl.pathname = safeNext;
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: profile } = user
      ? await supabase
          .from("profiles")
          .select("role, is_verified")
          .eq("id", user.id)
          .maybeSingle()
      : { data: null };

    redirectUrl.pathname = profile
      ? homeRouteFor({
          role: profile.role === "doctor" ? "doctor" : "patient",
          is_verified: Boolean(profile.is_verified),
        })
      : "/register";
  }

  const finalResponse = NextResponse.redirect(redirectUrl);
  pendingCookies.forEach(({ name, value, options }) =>
    finalResponse.cookies.set(name, value, options)
  );
  return finalResponse;
}
