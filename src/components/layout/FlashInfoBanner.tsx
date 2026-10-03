"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "ecci-flash-dismissed";
const ROTATE_MS = 6000;

type FlashItem = {
  id: string;
  titre: string;
  lien: string | null;
  type: "INTERNE" | "EXTERNE";
};

// Les ids fermés sont lus dans localStorage via useSyncExternalStore : le snapshot
// serveur vaut `null` (rien n'est rendu), puis la vraie valeur est lue après
// l'hydratation. `dismissedInMemory` garde la fermeture effective si le stockage
// est indisponible (navigation privée, etc.).
let dismissedInMemory: string | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    dismissedInMemory = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): string {
  if (dismissedInMemory !== null) return dismissedInMemory;
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parseDismissed(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function saveDismissed(ids: string[]) {
  const raw = JSON.stringify(ids);
  dismissedInMemory = raw;
  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // ignore storage errors (private browsing, etc.)
  }
  listeners.forEach((listener) => listener());
}

export function FlashInfoBanner({ items }: { items: FlashItem[] }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const hydrated = raw !== null;
  const dismissed = useMemo(() => (raw ? parseDismissed(raw) : []), [raw]);
  const [index, setIndex] = useState(0);

  const visible = hydrated ? items.filter((i) => !dismissed.includes(i.id)) : [];

  useEffect(() => {
    if (visible.length < 2) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % visible.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [visible.length]);

  if (!hydrated || visible.length === 0) return null;

  const current = visible[index % visible.length];

  function dismiss() {
    saveDismissed([...dismissed, current.id]);
    setIndex(0);
  }

  return (
    <div className="no-print border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2 sm:px-6">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="shrink-0 text-primary-dark"
        >
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
        <p className="flex-1 text-sm text-foreground">
          <span
            className={`mr-1.5 inline-block rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${
              current.type === "EXTERNE"
                ? "bg-primary-light text-primary-dark"
                : "bg-secondary-light text-secondary-dark"
            }`}
          >
            {current.type === "EXTERNE" ? "Actu secteur" : "Sur le site"}
          </span>
          {current.lien ? (
            <a
              href={current.lien}
              target={current.lien.startsWith("http") ? "_blank" : undefined}
              rel={
                current.lien.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="underline"
            >
              {current.titre}
            </a>
          ) : (
            current.titre
          )}
        </p>
        {visible.length > 1 && (
          <div className="hidden shrink-0 items-center gap-1 sm:flex">
            {visible.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Voir l'info ${i + 1} sur ${visible.length}`}
                aria-current={i === index % visible.length}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index % visible.length ? "bg-primary-dark" : "bg-border"
                }`}
              />
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fermer"
          className="shrink-0 rounded-md p-1 text-muted hover:bg-black/5 hover:text-foreground"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
