"use client";

import { useEffect, useState } from "react";
import { INDEPENDENCE_DISCLAIMER } from "@/lib/disclaimer";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "ecci-independence-seen";

export function IndependenceModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="independence-modal-title"
      onClick={dismiss}
    >
      <div
        className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          id="independence-modal-title"
          className="text-xs font-bold uppercase tracking-wide text-muted"
        >
          À savoir avant de commencer
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          {INDEPENDENCE_DISCLAIMER}
        </p>
        <Button size="lg" className="mt-5 w-full" onClick={dismiss}>
          J&apos;ai compris
        </Button>
      </div>
    </div>
  );
}
