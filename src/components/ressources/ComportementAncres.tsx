"use client";

import { useEffect } from "react";
import { mesure } from "@/lib/mesure";

function activer(id: string) {
  const cible = document.getElementById(id);
  if (!cible) return;

  // Ouvre l'accordéon qui contient la cible (ou la cible elle-même si c'en est un).
  for (let el: HTMLElement | null = cible; el; el = el.parentElement) {
    if (el instanceof HTMLDetailsElement) el.open = true;
  }

  const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  cible.scrollIntoView({ behavior: reduit ? "auto" : "smooth", block: "start" });

  if (cible.hasAttribute("data-surligner") && !reduit) {
    const visuel = cible.matches("section")
      ? (cible.querySelector<HTMLElement>("h2, h3") ?? cible)
      : cible;
    visuel.classList.remove("ancre-surlignee");
    void visuel.offsetWidth;
    visuel.classList.add("ancre-surlignee");
    window.setTimeout(() => visuel.classList.remove("ancre-surlignee"), 2000);
  }
}

// Comportement des liens d'ancre de la page : ouverture des accordéons fermés,
// défilement doux, contour discret sur la cible (supprimé si prefers-reduced-motion),
// et mesure anonyme des clics sur les questions et les liens du lexique.
export function ComportementAncres({ ressource }: { ressource: string }) {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const officiel = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-lien-officiel]",
      );
      if (officiel) {
        mesure("lien_officiel", {
          ressource,
          lien: officiel.dataset.lienOfficiel ?? "",
        });
        return;
      }

      const lien = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!lien) return;

      const question = lien.dataset.question;
      if (question) mesure("question_cliquee", { ressource, question });
      const terme = lien.dataset.lexique;
      if (terme) mesure("lexique_depuis_corps", { ressource, terme });

      const id = decodeURIComponent(lien.hash.slice(1));
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      history.pushState(null, "", lien.hash);
      activer(id);
    }

    function onHash() {
      const id = decodeURIComponent(location.hash.slice(1));
      if (id) activer(id);
    }

    // Ouverture d'une question de la FAQ (l'événement `toggle` ne remonte pas :
    // on l'écoute en phase de capture).
    function onToggle(e: Event) {
      const d = e.target;
      if (!(d instanceof HTMLDetailsElement) || !d.open) return;
      const faq = d.dataset.faq;
      if (faq) mesure("faq_ouverte", { ressource, question: faq });
    }

    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    window.addEventListener("hashchange", onHash);
    if (location.hash) requestAnimationFrame(onHash);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
      window.removeEventListener("hashchange", onHash);
    };
  }, [ressource]);

  return null;
}
