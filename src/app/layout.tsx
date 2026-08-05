import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerBar } from "@/components/layout/DisclaimerBar";

const SITE_URL = "https://e-culture-ci.vercel.app";
const SITE_TITLE = "e-Culture CI | Comprendre et préparer vos démarches du spectacle vivant";
const SITE_DESCRIPTION =
  "Comprendre et préparer vos démarches du spectacle vivant, partout en Côte d'Ivoire : vérifiez si une licence vous concerne, préparez votre déclaration ou votre immatriculation — un outil indépendant.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "e-Culture CI",
    locale: "fr_CI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <DisclaimerBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
