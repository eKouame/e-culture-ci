"use client";

import { ReactNode } from "react";
import { mesure } from "@/lib/mesure";

// Lien « Demander une rencontre » (mailto) de la page Communes, avec mesure anonyme du
// clic : seulement l'emplacement. Aucune donnée personnelle.
export function LienRencontre({
  href,
  emplacement,
  className,
  children,
}: {
  href: string;
  emplacement: "haut" | "bas";
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => mesure("rencontre_demandee", { emplacement })}
    >
      {children}
    </a>
  );
}
