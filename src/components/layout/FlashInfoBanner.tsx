"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ecci-flash-dismissed";

export function FlashInfoBanner({
  flashInfo,
}: {
  flashInfo: { id: string; titre: string; lien: string | null } | null;
}) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!flashInfo) return;
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === flashInfo.id);
    } catch {
      setDismissed(false);
    }
  }, [flashInfo]);

  if (!flashInfo || dismissed) return null;

  function dismiss() {
    if (!flashInfo) return;
    try {
      localStorage.setItem(STORAGE_KEY, flashInfo.id);
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
    setDismissed(true);
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
          <strong className="font-semibold">Flash info —</strong>{" "}
          {flashInfo.lien ? (
            <a href={flashInfo.lien} className="underline">
              {flashInfo.titre}
            </a>
          ) : (
            flashInfo.titre
          )}
        </p>
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
