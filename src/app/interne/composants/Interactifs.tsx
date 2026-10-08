"use client";

import { useState } from "react";
import { Accordeon } from "@/components/ui/Accordeon";
import { Pastilles } from "@/components/ui/Pastilles";

// Les composants à état de la page de démonstration (filtres, accordéons).
export function Interactifs() {
  const [filtre, setFiltre] = useState("toutes");
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-sm font-semibold text-muted">Filtres en pastilles (compteurs, un état « vide »)</p>
        <Pastilles
          libelle="Filtrer la démonstration"
          actif={filtre}
          onChoisir={setFiltre}
          pastilles={[
            { id: "toutes", label: "Toutes", compteur: 12 },
            { id: "licences", label: "Licences", compteur: 4 },
            { id: "droits", label: "Droits d'auteur", compteur: 3 },
            { id: "vide", label: "Sans résultat", compteur: 0 },
          ]}
        />
        <p className="mt-2 text-sm text-muted">Filtre actif : {filtre}</p>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted">Accordéon, un seul ouvert à la fois</p>
        <Accordeon
          unSeulOuvert
          ouvertParDefaut="a"
          elements={[
            { id: "a", titre: "Ressources", contenu: "Contenu du premier volet." },
            { id: "b", titre: "Outils", contenu: "Contenu du second volet : le premier se referme." },
          ]}
        />
      </div>
    </div>
  );
}
