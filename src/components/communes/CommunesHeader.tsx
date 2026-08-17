import Link from "next/link";

export function CommunesHeader() {
  return (
    <header className="border-b border-[#1B5E4A]/15 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1B5E4A] text-sm font-bold text-white">
            SM
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-[#1B5E4A]">Service Monde</p>
            <p className="text-xs text-[#6b6b6b]">
              e-Culture CI pour les communes
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="rounded-lg border border-[#1B5E4A]/30 px-3.5 py-2 text-sm font-medium text-[#1B5E4A] hover:bg-[#1B5E4A]/5"
        >
          Voir l&apos;outil
        </Link>
      </div>
    </header>
  );
}
