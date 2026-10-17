import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseConfig } from "@/lib/supabase/config";
import {
  canAccessDashboard,
  homeRouteFor,
  isProtectedPath,
  type SessionProfile,
} from "@/lib/auth/roles";

const AUTH_PATHS = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  if (!isSupabaseConfigured) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const { url, anonKey } = supabaseConfig();

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (!user) {
    if (isProtectedPath(pathname)) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.search = "";
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  const { data: profileRow } = await supabase
    .from("profiles")
    .select("role, is_verified")
    .eq("id", user.id)
    .maybeSingle();

  const profile: SessionProfile | null = profileRow
    ? {
        role: profileRow.role === "doctor" ? "doctor" : "patient",
        is_verified: Boolean(profileRow.is_verified),
      }
    : null;

  if (!profile) {
    if (pathname !== "/register") {
      const registerUrl = request.nextUrl.clone();
      registerUrl.pathname = "/register";
      registerUrl.search = "";
      return NextResponse.redirect(registerUrl);
    }
    return response;
  }

  if (AUTH_PATHS.includes(pathname)) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = homeRouteFor(profile);
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  if (pathname.startsWith("/doctor-apply")) {
    if (profile.role === "doctor" && profile.is_verified) {
      const doctorUrl = request.nextUrl.clone();
      doctorUrl.pathname = "/doctor";
      doctorUrl.search = "";
      return NextResponse.redirect(doctorUrl);
    }
    return response;
  }

  if (isProtectedPath(pathname) && !canAccessDashboard(profile, pathname)) {
    const deniedUrl = request.nextUrl.clone();
    deniedUrl.pathname = "/patient";
    deniedUrl.search = "?notice=doctor-approval";
    return NextResponse.redirect(deniedUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/patient/:path*",
    "/doctor/:path*",
    "/doctor-apply",
    "/login",
    "/register",
  ],
};
