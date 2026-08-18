import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IndependenceModal } from "@/components/layout/IndependenceModal";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IndependenceModal />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
