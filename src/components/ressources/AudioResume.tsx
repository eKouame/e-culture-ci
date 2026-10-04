"use client";

import { useRef } from "react";
import { mesure } from "@/lib/mesure";

const PALIERS = [25, 50, 75] as const;

// Version à écouter : lecteur natif, jamais de lecture automatique, rien n'est
// téléchargé avant le clic. L'écrit reste la référence ; la transcription reproduit
// le script mot pour mot (accessibilité, absence de son, référencement).
export function AudioResume({
  ressource,
  src,
  dureeLabel,
  poidsLabel,
  enregistre,
  transcription,
}: {
  ressource: string;
  src: string;
  dureeLabel: string;
  poidsLabel: string;
  enregistre: string;
  transcription: string[];
}) {
  const atteints = useRef(new Set<number>());

  function palier(valeur: number | "debut") {
    const cle = valeur === "debut" ? 0 : valeur;
    if (atteints.current.has(cle)) return;
    atteints.current.add(cle);
    mesure("audio_progression", { ressource, palier: valeur });
  }

  return (
    <section
      aria-labelledby="audio-titre"
      className="rounded-xl border border-secondary/30 bg-secondary-light p-5"
    >
      <h2
        id="audio-titre"
        className="text-xs font-bold uppercase tracking-wide text-secondary-dark"
      >
        Version à écouter
      </h2>
      <p className="mt-1.5 text-sm text-foreground">
        L&apos;essentiel en deux minutes, à écouter. L&apos;écrit ci-dessous reste
        la référence.
      </p>
      <audio
        controls
        preload="none"
        src={src}
        className="mt-3 w-full"
        onPlay={() => palier("debut")}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (!a.duration) return;
          const pct = (a.currentTime / a.duration) * 100;
          PALIERS.forEach((p) => {
            if (pct >= p) palier(p);
          });
        }}
        onEnded={() => palier(100)}
      />
      <p className="mt-2 text-xs text-muted">
        {dureeLabel} · {poidsLabel} · Enregistré en {enregistre}
      </p>
      <details
        className="mt-3 rounded-lg border border-border bg-surface px-4 py-2.5"
        onToggle={(e) => {
          if (e.currentTarget.open) mesure("transcription_ouverte", { ressource });
        }}
      >
        <summary className="cursor-pointer list-none text-sm font-semibold text-secondary-dark marker:content-none">
          Lire la transcription
        </summary>
        <div className="mt-2.5 flex max-w-prose flex-col gap-2.5 text-sm text-muted">
          {transcription.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </details>
    </section>
  );
}
