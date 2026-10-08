import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Pages internes (démonstration des composants) : même cadre que le site, sans lecture de
// la base de données.
export default function InterneLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
