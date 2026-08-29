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
  const flashInfos = await prisma.flashInfo.findMany({
    where: { actif: true },
    orderBy: { updatedAt: "desc" },
    take: 4,
    select: { id: true, titre: true, lien: true, type: true },
  });

  return (
    <>
      <IndependenceModal />
      <FlashInfoBanner items={flashInfos} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
