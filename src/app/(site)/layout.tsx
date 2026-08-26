import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IndependenceModal } from "@/components/layout/IndependenceModal";
import { FlashInfoBanner } from "@/components/layout/FlashInfoBanner";
import { prisma } from "@/lib/prisma";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const flashInfo = await prisma.flashInfo.findFirst({
    where: { actif: true },
    orderBy: { updatedAt: "desc" },
    select: { id: true, titre: true, lien: true },
  });

  return (
    <>
      <IndependenceModal />
      <FlashInfoBanner flashInfo={flashInfo} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
