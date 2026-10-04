"use client";

import { CSSProperties, useRef, useState } from "react";
import { mesure } from "@/lib/mesure";

const PALIERS = [25, 50, 75] as const;

function formater(secondes: number): string {
  const s = Math.max(0, Math.floor(secondes));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function IconeLecture() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l11-6.8a1 1 0 0 0 0-1.72l-11-6.8A1 1 0 0 0 8 5.2z" />
    </svg>
  );
}

function IconePause() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4.2" height="14" rx="1.2" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1.2" />
    </svg>
  );
}

function IconeRejouer() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12a8 8 0 1 0 2.6-5.9" />
      <path d="M4 4.5v4.6h4.6" />
    </svg>
  );
}

function IconeChargement() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      className="motion-safe:animate-spin"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" opacity="0.28" />
      <path d="M12 4a8 8 0 0 1 8 8" />
    </svg>
  );
}

// Version à écouter : lecteur aux couleurs de la charte (vert profond, accent orange clair).
// Jamais de lecture automatique, rien n'est téléchargé avant le premier appui sur lecture.
// L'écrit reste la référence : l'audio ne fait que résumer ce que la page dit déjà.
export function AudioResume({
  ressource,
  src,
  dureeLabel,
  dureeSecondes,
  poidsLabel,
  enregistre,
  accroche = "L'essentiel en deux minutes, à écouter.",
}: {
  ressource: string;
  src: string;
  dureeLabel: string;
  dureeSecondes: number;
  poidsLabel: string;
  enregistre: string;
  // Première phrase du bloc : elle annonce la durée, à ajuster à chaque enregistrement.
  accroche?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const atteints = useRef(new Set<number>());
  const [lecture, setLecture] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [fini, setFini] = useState(false);
  const [erreur, setErreur] = useState(false);
  const [temps, setTemps] = useState(0);
  const [duree, setDuree] = useState(dureeSecondes);

  function palier(valeur: number | "debut") {
    const cle = valeur === "debut" ? 0 : valeur;
    if (atteints.current.has(cle)) return;
    atteints.current.add(cle);
    mesure("audio_progression", { ressource, palier: valeur });
  }

  async function basculer() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused || a.ended) {
      setErreur(false);
      setChargement(true);
      try {
        await a.play();
      } catch {
        setChargement(false);
        setFini(false);
        setErreur(true);
      }
    } else {
      a.pause();
    }
  }

  const pct = duree > 0 ? Math.min(100, (temps / duree) * 100) : 0;
  const libelle = chargement
    ? "Chargement de l'audio"
    : lecture
      ? "Mettre en pause"
      : fini
        ? "Réécouter depuis le début"
        : "Lire la version audio";

  return (
    <section
      aria-labelledby="audio-titre"
      className="no-print rounded-xl bg-deep p-4 text-on-deep shadow-sm sm:p-5"
    >
      <h2
        id="audio-titre"
        className="text-xs font-bold uppercase tracking-wide text-accent-on-deep"
      >
        Version à écouter
      </h2>

      <div className="mt-3 flex items-center gap-3.5">
        <button
          type="button"
          onClick={basculer}
          aria-label={libelle}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-on-deep text-deep-strong shadow-sm transition-transform active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          {chargement ? (
            <IconeChargement />
          ) : lecture ? (
            <IconePause />
          ) : fini ? (
            <IconeRejouer />
          ) : (
            <IconeLecture />
          )}
        </button>
        <p className="text-sm leading-snug text-on-deep">
          {accroche} L&apos;écrit ci-dessous reste la référence.
        </p>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={Math.max(1, Math.floor(duree))}
          step={1}
          value={Math.min(Math.floor(temps), Math.floor(duree))}
          aria-label="Position de lecture"
          aria-valuetext={`${formater(temps)} sur ${formater(duree)}`}
          className="lecteur-range flex-1"
          style={{ "--pct": `${pct}%` } as CSSProperties}
          onChange={(e) => {
            const a = audioRef.current;
            const valeur = Number(e.target.value);
            if (a) a.currentTime = valeur;
            setTemps(valeur);
            setFini(false);
          }}
        />
        <span className="min-w-[5.2rem] text-right text-xs tabular-nums text-on-deep-muted">
          {formater(temps)} / {formater(duree)}
        </span>
      </div>

      <p className="text-xs text-on-deep-muted">
        {dureeLabel} · {poidsLabel} · Enregistré en {enregistre}
      </p>

      <p role="status" className="sr-only">
        {chargement ? "Chargement de l'audio…" : ""}
      </p>
      {erreur && (
        <p
          role="alert"
          className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-sm text-on-deep"
        >
          La lecture n&apos;a pas démarré. Vérifiez votre connexion, puis appuyez
          de nouveau sur lecture.
        </p>
      )}

      <audio
        ref={audioRef}
        preload="none"
        src={src}
        onPlaying={() => {
          setLecture(true);
          setChargement(false);
          setFini(false);
          palier("debut");
        }}
        onPause={() => setLecture(false)}
        onWaiting={() => setChargement(true)}
        onCanPlay={() => setChargement(false)}
        onLoadedMetadata={(e) => {
          if (Number.isFinite(e.currentTarget.duration)) {
            setDuree(e.currentTarget.duration);
          }
        }}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setTemps(a.currentTime);
          if (!a.duration) return;
          const avancement = (a.currentTime / a.duration) * 100;
          PALIERS.forEach((p) => {
            if (avancement >= p) palier(p);
          });
        }}
        onEnded={() => {
          setLecture(false);
          setFini(true);
          setTemps(0);
          palier(100);
        }}
        onError={() => {
          setChargement(false);
          setLecture(false);
          setFini(false);
          setErreur(true);
        }}
      />
      <noscript>
        <audio controls preload="none" src={src} className="mt-3 w-full" />
      </noscript>
    </section>
  );
}
