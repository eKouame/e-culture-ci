"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

export function TableOfContents({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const linkClass = (id: string) =>
    `-ml-0.5 block border-l-2 py-1.5 pl-4 text-sm font-medium transition-colors ${
      active === id
        ? "border-primary text-secondary-dark"
        : "border-transparent text-muted hover:text-secondary-dark"
    }`;

  return (
    <>
      <nav aria-label="Sommaire" className="hidden md:sticky md:top-24 md:block">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">
          Dans cette page
        </p>
        <ol className="flex flex-col gap-0.5 border-l-2 border-border">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={linkClass(item.id)}>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <details className="mb-2 rounded-xl border border-border bg-black/[0.02] md:hidden">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-bold text-secondary-dark marker:content-none">
          <span className="flex items-center justify-between">
            Dans cette page
            <span aria-hidden="true">▾</span>
          </span>
        </summary>
        <ol className="flex flex-col gap-1 px-4 pb-3">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block rounded-lg px-2 py-1.5 text-sm font-medium text-muted hover:bg-background hover:text-secondary-dark"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </>
  );
}
