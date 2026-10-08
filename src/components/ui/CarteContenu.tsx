import Link from "next/link";
import { BadgeEtat, type EtatBadge } from "@/components/ui/BadgeEtat";

// Carte de contenu (index, accueil). Trois présentations : standard, mise en avant (fond
// vert profond) et « Bientôt » (pointillés, jamais cliquable : pas de lien mort).
export function CarteContenu({
  titre,
  texte,
  href,
  etat,
  miseEnAvant = false,
  action = "Découvrir →",
}: {
  titre: string;
  texte: string;
  href?: string;
  etat?: EtatBadge;
  miseEnAvant?: boolean;
  action?: string;
}) {
  const bientot = etat === "bientot" || !href;
  const base = "flex h-full flex-col gap-2.5 rounded-xl p-5";
  const style = bientot
    ? "border border-dashed border-border-strong bg-transparent"
    : miseEnAvant
      ? "bg-deep text-on-deep"
      : "border border-border bg-surface transition-colors hover:border-secondary";

  const contenu = (
    <>
      {etat && <BadgeEtat etat={etat} className="self-start" />}
      <h3 className={`text-lg font-extrabold leading-snug ${miseEnAvant && !bientot ? "" : "text-foreground"}`}>
        {titre}
      </h3>
      <p className={`flex-1 text-sm leading-relaxed ${miseEnAvant && !bientot ? "text-on-deep-muted" : "text-muted"}`}>
        {texte}
      </p>
      {!bientot && (
        <span className={`text-sm font-bold ${miseEnAvant ? "text-accent-on-deep" : "text-primary-dark"}`}>{action}</span>
      )}
    </>
  );

  if (bientot) {
    return (
      <div aria-disabled="true" className={`${base} ${style}`}>
        {contenu}
      </div>
    );
  }
  return (
    <Link href={href} className={`${base} ${style} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}>
      {contenu}
    </Link>
  );
}
