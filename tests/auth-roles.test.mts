import test from "node:test";
import assert from "node:assert/strict";
import {
  canAccessDashboard,
  homeRouteFor,
  isDoctor,
  isProtectedPath,
  type SessionProfile,
} from "../lib/auth/roles.ts";

const patient: SessionProfile = { role: "patient", is_verified: false };
const unverifiedDoctor: SessionProfile = { role: "doctor", is_verified: false };
const verifiedDoctor: SessionProfile = { role: "doctor", is_verified: true };

test("unverified doctors cannot access doctor workspaces", () => {
  assert.equal(isDoctor(unverifiedDoctor), false);
  assert.equal(canAccessDashboard(unverifiedDoctor, "/doctor"), false);
  assert.equal(homeRouteFor(unverifiedDoctor), "/patient");
});

test("verified doctors can access both dashboards", () => {
  assert.equal(isDoctor(verifiedDoctor), true);
  assert.equal(canAccessDashboard(verifiedDoctor, "/doctor"), true);
  assert.equal(canAccessDashboard(verifiedDoctor, "/patient"), true);
  assert.equal(homeRouteFor(verifiedDoctor), "/doctor");
});

test("patients cannot access doctor workspaces", () => {
  assert.equal(canAccessDashboard(patient, "/doctor"), false);
  assert.equal(canAccessDashboard(patient, "/patient"), true);
  assert.equal(homeRouteFor(patient), "/patient");
});

test("anonymous sessions are denied protected dashboards", () => {
  assert.equal(canAccessDashboard(null, "/patient"), false);
  assert.equal(canAccessDashboard(null, "/doctor"), false);
});

test("protected paths are identified consistently", () => {
  assert.equal(isProtectedPath("/patient"), true);
  assert.equal(isProtectedPath("/doctor-apply"), true);
  assert.equal(isProtectedPath("/doctor/settings"), true);
  assert.equal(isProtectedPath("/login"), false);
  assert.equal(isProtectedPath("/"), false);
});
