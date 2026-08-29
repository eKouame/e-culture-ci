"use client";

import { useEffect, useRef, useState } from "react";

export function ParcoursCarousel({
  children,
}: {
  children: React.ReactNode[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = children.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const first = el.firstElementChild as HTMLElement | null;
      const gap = 16;
      const cardWidth = first ? first.offsetWidth + gap : el.clientWidth;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActive(Math.min(count - 1, Math.max(0, index)));
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);

  function goTo(i: number) {
    const el = containerRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) {
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }
  }

  return (
    <div>
      <div
        ref={containerRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0"
      >
        {children}
      </div>
      {count > 1 && (
        <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Voir l'étape ${i + 1} sur ${count}`}
              aria-current={i === active}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === active ? "bg-primary-dark" : "bg-primary-dark/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
