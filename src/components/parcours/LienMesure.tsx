"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { appareil, mesure } from "@/lib/mesure";

// Lien interne avec mesure anonyme du clic : un nom d'événement et quelques libellés
// (porte, question, emplacement), plus « mobile » ou « ordinateur ». Aucune donnée
// personnelle, aucune réponse saisie.
export function LienMesure({
  href,
  evenement,
  donnees,
  className,
  onClick,
  children,
}: {
  href: string;
  evenement: string;
  donnees?: Record<string, string | number>;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        mesure(evenement, { ...donnees, appareil: appareil() });
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
