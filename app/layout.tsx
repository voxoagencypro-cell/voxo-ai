import type { Metadata } from "next";
import { voxoSans } from "@/lib/fonts";
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
    <html lang="fr" className={voxoSans.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
