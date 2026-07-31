import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://voxo-ai.ch"),
  title: { default: "VOXO AI — Réceptionniste téléphonique IA", template: "%s | VOXO AI" },
  description: "VOXO AI répond à vos appels, qualifie vos prospects et réserve vos rendez-vous 24h/24.",
  openGraph: {
    title: "VOXO AI",
    description: "Votre réceptionniste téléphonique IA pour les entreprises suisses.",
    url: "https://voxo-ai.ch",
    siteName: "VOXO AI",
    locale: "fr_CH",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
