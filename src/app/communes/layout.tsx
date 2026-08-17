import { CommunesHeader } from "@/components/communes/CommunesHeader";
import { CommunesFooter } from "@/components/communes/CommunesFooter";

export default function CommunesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommunesHeader />
      <main className="flex-1 bg-[#fafaf9]">{children}</main>
      <CommunesFooter />
    </>
  );
}
