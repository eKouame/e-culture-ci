"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ecci-flash-dismissed";
const ROTATE_MS = 6000;

type FlashItem = {
  id: string;
  titre: string;
  lien: string | null;
  type: "INTERNE" | "EXTERNE";
};

function readDismissed(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function FlashInfoBanner({ items }: { items: FlashItem[] }) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDismissed(readDismissed());
    setHydrated(true);
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible.length]);

  if (!hydrated || visible.length === 0) return null;

  const current = visible[index % visible.length];

  function dismiss() {
    const next = [...dismissed, current.id];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
    setDismissed(next);
    setIndex(0);
  }

  return (
    <div className="no-print border-b border-primary/20 bg-primary-light">
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
        <p className="flex-1 text-sm text-primary-dark">
          <span
            className={`mr-1.5 inline-block rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${
              current.type === "EXTERNE"
                ? "bg-amber-100 text-amber-800"
                : "bg-secondary-light text-secondary-dark"
            }`}
          >
            {current.type === "EXTERNE" ? "Externe" : "Interne"}
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
                  i === index % visible.length
                    ? "bg-primary-dark"
                    : "bg-primary-dark/25"
                }`}
              />
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fermer"
          className="shrink-0 rounded-md p-1 text-primary-dark hover:bg-primary/10"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
