export function CommunesFooter() {
  return (
    <footer className="mt-16 border-t border-[#1B5E4A]/15 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-[#6b6b6b] sm:px-6">
        <p className="font-medium text-[#1B5E4A]">
          Service Monde — cabinet de design territorial
        </p>
        <p className="mt-2 rounded-lg border border-[#1B5E4A]/20 bg-[#1B5E4A]/[0.03] px-3 py-2 text-xs">
          ℹ️ e-Culture CI est un outil indépendant, en phase de test. Il
          oriente et prépare les organisateurs ; votre mairie reste la seule
          autorité pour recevoir, délivrer et autoriser.
        </p>
        <p className="mt-3 text-xs">
          Contact :{" "}
          <a
            href="mailto:servicemonde77@gmail.com"
            className="underline hover:text-[#1B5E4A]"
          >
            servicemonde77@gmail.com
          </a>
        </p>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-[#1B5E4A]/15 pt-4 text-xs">
          <a href="/" className="underline hover:text-[#1B5E4A]">
            Voir l&apos;application citoyenne
          </a>
          <a href="/mentions-legales" className="underline hover:text-[#1B5E4A]">
            Mentions légales
          </a>
          <a href="/confidentialite" className="underline hover:text-[#1B5E4A]">
            Politique de confidentialité
          </a>
        </nav>
      </div>
    </footer>
  );
}
