import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerBar } from "@/components/layout/DisclaimerBar";

const SITE_URL = "https://e-culture-ci.vercel.app";
const SITE_TITLE = "e-Culture CI | Comprendre et préparer vos démarches du spectacle vivant";
const SITE_DESCRIPTION =
  "Orientez-vous, déclarez votre événement ou immatriculez-vous auprès du ministère de la Culture — pour les acteurs du spectacle vivant en Côte d'Ivoire.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Dois-tu payer une licence pour ton spectacle ?",
    description:
      "Découvre ta situation en 1 minute et déclare gratuitement ton événement — e-Culture CI.",
    url: SITE_URL,
    siteName: "e-Culture CI",
    locale: "fr_CI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dois-tu payer une licence pour ton spectacle ?",
    description:
      "Découvre ta situation en 1 minute et déclare gratuitement ton événement — e-Culture CI.",
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
