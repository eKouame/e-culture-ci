import Link from "next/link";
import { ReactNode } from "react";
import { ReadingProgress } from "./ReadingProgress";
import { TableOfContents } from "./TableOfContents";

export function RessourceArticle({
  kicker,
  titre,
  dek,
  meta,
  sommaire,
  children,
}: {
  kicker: string;
  titre: string;
  dek: string;
  meta: { lecture: string; niveau: string };
  sommaire: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <div>
      <ReadingProgress />

      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <nav className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link href="/">Accueil</Link>
            <span>›</span>
            <Link href="/ressources">Ressources</Link>
            <span>›</span>
            <span className="font-semibold text-foreground">{titre}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-wide text-primary-dark">
            {kicker}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {titre}
          </h1>
          <p className="mt-3 max-w-prose text-lg text-muted">{dek}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-semibold text-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-primary"
              />
              Lecture {meta.lecture}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-primary"
              />
              Niveau {meta.niveau}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-primary"
              />
              Gratuit
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-[220px_1fr] md:gap-12">
        <TableOfContents items={sommaire} />
        <article className="max-w-[680px] text-[1.08rem] leading-[1.72] text-foreground">
          {children}
        </article>
      </div>
    </div>
  );
}
