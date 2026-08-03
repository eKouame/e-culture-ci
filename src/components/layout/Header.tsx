"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/suis-je-concerne", label: "Suis-je concerné ?" },
  { href: "/declaration", label: "Déclaration Express" },
  { href: "/immatriculation", label: "Immatriculation" },
  { href: "/ressources", label: "Ressources" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            eC
          </span>
          <span className="text-base font-bold text-foreground">
            e-Culture CI
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5 ${
                pathname?.startsWith(item.href)
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="ml-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted hover:bg-black/5"
          >
            Espace ministère
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                pathname?.startsWith(item.href)
                  ? "bg-primary-light text-primary"
                  : "text-foreground hover:bg-black/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-black/5"
          >
            Espace ministère
          </Link>
        </nav>
      )}
    </header>
  );
}
