export type Role = "patient" | "doctor";

export type SessionProfile = {
  role: Role;
  is_verified: boolean;
};

export function isDoctor(profile: SessionProfile | null): boolean {
  return Boolean(profile && profile.role === "doctor" && profile.is_verified);
}

export function homeRouteFor(profile: SessionProfile | null): string {
  return isDoctor(profile) ? "/doctor" : "/patient";
}

export function canAccessDashboard(
  profile: SessionProfile | null,
  pathname: string
): boolean {
  if (!profile) return false;
  if (pathname.startsWith("/doctor")) return isDoctor(profile);
  if (pathname.startsWith("/patient")) return true;
  return true;
}

export const AUTH_PATHS = ["/login", "/register", "/forgot-password"] as const;

export function isAuthPath(pathname: string): boolean {
  return (AUTH_PATHS as readonly string[]).includes(pathname);
}

export function safePostAuthPath(next: string | null): string | null {
  return next === "/reset-password" ? "/reset-password" : null;
}

export function isProtectedPath(pathname: string): boolean {
  return (
    pathname.startsWith("/patient") ||
    pathname.startsWith("/doctor") ||
    pathname.startsWith("/doctor-apply")
  );
}
