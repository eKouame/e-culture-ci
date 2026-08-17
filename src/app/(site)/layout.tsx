import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerBar } from "@/components/layout/DisclaimerBar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DisclaimerBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
