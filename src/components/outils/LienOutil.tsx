"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { mesure } from "@/lib/mesure";

// Lien vers un outil, avec mesure anonyme et agrégée du clic : d'où l'on vient, quel
// outil, et quel emplacement (appel dans le texte ou bloc « Outils liés »).
// Aucune donnée personnelle, aucune valeur saisie.
export function LienOutil({
  href,
  depuis,
  outil,
  emplacement,
  className,
  children,
}: {
  href: string;
  depuis: string;
  outil: string;
  emplacement: "appel" | "outils-lies" | "page-outils" | "lateral";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => mesure("outil_clique", { depuis, outil, emplacement })}
    >
      {children}
    </Link>
  );
}
