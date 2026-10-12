import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://voxo-ai.ch"),
  title: {
    default: "VOXO AI — Consulting & Systèmes IA",
    template: "%s | VOXO AI",
  },
  description:
    "VOXO AI conçoit des systèmes qui relient acquisition, messages, appels, rendez-vous et suivi client.",
  openGraph: {
    title: "VOXO AI — Consulting & Systèmes IA",
    description:
      "Consulting et systèmes IA pour les entreprises : acquisition, agents, CRM et automatisation.",
    url: "https://voxo-ai.ch",
    siteName: "VOXO AI",
    locale: "fr_CH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}