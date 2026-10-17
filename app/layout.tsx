import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Silent Revolution | Connected, compassionate healthcare",
  description:
    "A patient-first healthcare platform connecting people with doctors, AI-guided health support, appointments, and hospital care.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
