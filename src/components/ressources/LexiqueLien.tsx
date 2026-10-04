import { ReactNode } from "react";

// Lien discret vers l'entrée du lexique, à la première occurrence du terme dans le
// corps. Pas d'infobulle (elle n'existe pas sur téléphone) : un lien simple,
// accessible au clavier. L'entrée du lexique renvoie ici via « ↑ Revenir au texte ».
export function LexiqueLien({
  terme,
  children,
}: {
  terme: string;
  children: ReactNode;
}) {
  return (
    <a
      id={`lx-ref-${terme}`}
      href={`#lx-${terme}`}
      data-lexique={terme}
      className="scroll-mt-28 underline decoration-dotted decoration-primary-dark underline-offset-4 hover:decoration-solid"
    >
      {children}
    </a>
  );
}
