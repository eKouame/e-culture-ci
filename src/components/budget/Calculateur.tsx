"use client";

import Link from "next/link";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { mesure } from "@/lib/mesure";
import {
  CONFIG_CALCULATEUR,
  ChampId,
  MENTION_INDEPENDANCE,
  MESSAGE_ATTENTE,
  MESSAGE_PLACES_MANQUANTES,
  MESSAGE_PRIX_MANQUANT,
  Resultat,
  SAISIES_EXEMPLE,
  SAISIES_VIDES,
  Saisies,
  VERDICTS,
  calculer,
  formaterFcfa,
  formaterNombre,
  ligneEcart,
  recapitulatif,
  texteVerdict,
} from "@/lib/calculateur-budget";

type ChampSimple = Exclude<ChampId, "imprevus">;

interface Def {
  id: ChampSimple;
  label: string;
  aide: ReactNode;
  unite?: boolean; // affiche « FCFA » dans le champ
  marque?: string; // « obligatoire » / « facultatif »
}

const BLOC_SALLE: Def[] = [
  {
    id: "places",
    label: "Nombre de places",
    aide: "Le nombre maximum de personnes que votre lieu peut accueillir.",
    marque: "obligatoire",
  },
  {
    id: "prix",
    label: "Prix du billet (FCFA)",
    aide: "Indiquez 0 si l'entrée est gratuite.",
    unite: true,
    marque: "obligatoire",
  },
  {
    id: "entrees",
    label: "Entrées que vous pensez vendre",
    aide: "Soyez prudent : on remplit rarement une salle à 100 % pour un premier événement.",
    marque: "facultatif",
  },
];

const BLOC_DEPENSES: Def[] = [
  {
    id: "artistique",
    label: "Artistique",
    unite: true,
    aide: (
      <>
        Cachets des artistes, conteurs, musiciens, droits d&apos;auteur,
        répétitions. <strong>Saisissez le cachet brut</strong>, c&apos;est-à-dire
        avant la retenue à la source (voir «{" "}
        <Link
          href="/ressources/payer-artistes"
          className="font-medium text-primary-dark underline"
        >
          Déclarer et payer vos artistes
        </Link>{" "}
        »).
      </>
    ),
  },
  {
    id: "technique",
    label: "Technique",
    unite: true,
    aide: "Sonorisation, lumière, matériel, régie, personnel technique, location d'équipement. La location de la salle se met dans « Lieu ».",
  },
  {
    id: "lieu",
    label: "Lieu",
    unite: true,
    aide: "Location de l'espace, aménagement, chaises, électricité, nettoyage.",
  },
  {
    id: "communication",
    label: "Communication",
    unite: true,
    aide: "Affiches, impression, animation des réseaux, relations avec la presse, visuels.",
  },
  {
    id: "organisation",
    label: "Organisation",
    unite: true,
    aide: "Frais de licence et démarches s'ils vous concernent, assurance, transport, hébergement et restauration des équipes, sécurité et accueil, petit matériel.",
  },
];

const BLOC_RECETTES: Def[] = [
  {
    id: "subventions",
    label: "Subventions et appels à projets",
    unite: true,
    aide: "Comptez-les seulement si la réponse est confirmée par écrit.",
  },
  {
    id: "sponsoring",
    label: "Sponsoring et mécénat",
    unite: true,
    aide: "En argent, et en nature pour sa valeur (affiches offertes, par exemple).",
  },
  {
    id: "coproduction",
    label: "Coproduction",
    unite: true,
    aide: "La part d'un partenaire qui partage la charge et le risque.",
  },
  {
    id: "apports",
    label: "Apports propres",
    unite: true,
    aide: "Ce que vous mettez vous-même, ou ce que votre structure engage.",
  },
];

const CLASSE_CHAMP =
  "min-h-[44px] w-full rounded-lg border bg-surface px-3 py-2 text-base tabular-nums text-foreground placeholder:text-muted/60";

function Champ({
  def,
  valeur,
  erreur,
  onChange,
  aide,
  actions,
  automatique,
}: {
  def: { id: ChampId; label: string; unite?: boolean; marque?: string };
  valeur: string;
  erreur?: string;
  onChange: (v: string) => void;
  aide: ReactNode;
  actions?: ReactNode;
  automatique?: boolean;
}) {
  const idAide = `${def.id}-aide`;
  const idErr = `${def.id}-err`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={def.id} className="text-sm font-bold text-foreground">
          {def.label}
          {def.marque && (
            <span className="ml-1.5 text-xs font-normal text-muted">
              ({def.marque})
            </span>
          )}
        </label>
        {actions}
      </div>
      <div className="relative mt-1.5">
        <input
          id={def.id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          enterKeyHint="next"
          value={valeur}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={erreur ? `${idAide} ${idErr}` : idAide}
          aria-invalid={erreur ? true : undefined}
          className={`${CLASSE_CHAMP} ${def.unite ? "pr-16" : ""} ${
            erreur ? "border-danger" : "border-border"
          } ${automatique ? "text-muted" : ""}`}
        />
        {def.unite && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-muted"
          >
            FCFA
          </span>
        )}
      </div>
      <p id={idAide} className="mt-1 text-xs leading-snug text-muted">
        {aide}
      </p>
      {erreur && (
        <p id={idErr} role="alert" className="mt-1 text-sm font-medium text-danger">
          {erreur}
        </p>
      )}
    </div>
  );
}

function Bloc({
  titre,
  children,
  colonnes = 1,
}: {
  titre: string;
  children: ReactNode;
  colonnes?: 1 | 3;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <h2 className="text-lg font-extrabold tracking-tight text-secondary-dark">
        {titre}
      </h2>
      <div
        className={`mt-4 grid grid-cols-1 gap-x-5 gap-y-5 ${
          colonnes === 3 ? "md:grid-cols-3" : "sm:grid-cols-2"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function IconeVerdict({ ton }: { ton: "positif" | "attention" | "alerte" }) {
  const commun = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (ton === "positif") {
    return (
      <svg {...commun}>
        <circle cx="12" cy="12" r="9.5" />
        <path d="m7.8 12.4 3 3 5.6-6.2" />
      </svg>
    );
  }
  if (ton === "attention") {
    return (
      <svg {...commun}>
        <path d="M12 3.6 21.4 20H2.6L12 3.6Z" />
        <path d="M12 10v4.4M12 17.2v.1" />
      </svg>
    );
  }
  return (
    <svg {...commun}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m8.8 8.8 6.4 6.4M15.2 8.8l-6.4 6.4" />
    </svg>
  );
}

const TONS = {
  positif: {
    carte: "border-secondary bg-secondary-light",
    icone: "text-secondary",
  },
  attention: {
    carte: "border-primary bg-primary-light",
    icone: "text-primary-dark",
  },
  alerte: {
    carte: "border-danger bg-[#fdecea]",
    icone: "text-danger",
  },
} as const;

function resumeCourt(r: Resultat): string {
  switch (r.type) {
    case "attente":
      return "renseignez vos dépenses et votre prix";
    case "prix_manquant":
      return "indiquez le prix du billet";
    case "places_manquantes":
      return "indiquez le nombre de places";
    case "etat":
      if (r.etat === "A") return "déjà couvert";
      if (r.etat === "B") return `il manque ${formaterFcfa(r.besoin)}`;
      return `${formaterNombre(r.pointEquilibre ?? 0)} entrées`;
  }
}

export function Calculateur() {
  const [saisies, setSaisies] = useState<Saisies>(SAISIES_VIDES);
  const [exemple, setExemple] = useState(false);
  const [ouvert, setOuvert] = useState(false); // volet de résultat, mobile
  const [copie, setCopie] = useState<"non" | "oui" | "manuel">("non");
  const [dateImpression, setDateImpression] = useState("");
  const calculEnvoye = useRef(false);
  // Phase 0 de « Mon espace » : mesure de l'envie d'enregistrer, sans compte ni stockage.
  const [bientot, setBientot] = useState(false);
  const enregistrerEnvoye = useRef(false);
  const copierRef = useRef<HTMLButtonElement>(null);

  const resultat = useMemo(() => calculer(saisies), [saisies]);
  const texte = useMemo(() => recapitulatif(saisies, resultat), [saisies, resultat]);
  const verdict = texteVerdict(resultat);
  const ecart = ligneEcart(resultat);
  const defVerdict = resultat.etat ? VERDICTS[resultat.etat] : null;

  // Au plus un événement anonyme « calcul effectué » par visite, sans aucune valeur
  // saisie. L'exemple fictif ne compte pas.
  useEffect(() => {
    if (resultat.type === "etat" && !exemple && !calculEnvoye.current) {
      calculEnvoye.current = true;
      mesure("calcul_effectue", { ressource: "calculateur-budget" });
    }
  }, [resultat.type, exemple]);

  // Échap referme le volet de résultat (mobile).
  useEffect(() => {
    if (!ouvert) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOuvert(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ouvert]);

  function maj(id: ChampId, valeur: string) {
    setCopie("non");
    setBientot(false);
    setSaisies((s) => {
      if (id === "imprevus") {
        // Champ vidé : retour au calcul automatique.
        return { ...s, imprevus: valeur.trim() === "" ? null : valeur };
      }
      return { ...s, [id]: valeur };
    });
  }

  function chargerExemple() {
    setSaisies(SAISIES_EXEMPLE);
    setExemple(true);
    setCopie("non");
    setBientot(false);
  }

  function effacer() {
    setSaisies(SAISIES_VIDES);
    setExemple(false);
    setCopie("non");
    setBientot(false);
  }

  // Un seul événement anonyme « clic sur Enregistrer » par visite, rapporté au nombre
  // de « calcul effectué » (même population : l'exemple fictif ne compte pas). Aucune
  // valeur saisie, aucune donnée personnelle, rien n'est enregistré.
  function enregistrer() {
    setBientot(true);
    if (!exemple && !enregistrerEnvoye.current) {
      enregistrerEnvoye.current = true;
      mesure("enregistrer_clique", { ressource: "calculateur-budget" });
    }
    copierRef.current?.focus();
  }

  async function copier() {
    if (!texte) return;
    try {
      await navigator.clipboard.writeText(texte);
      setCopie("oui");
      mesure("recapitulatif_copie", { ressource: "calculateur-budget" });
    } catch {
      // Presse-papiers refusé : on affiche le texte dans une zone sélectionnable.
      setCopie("manuel");
    }
  }

  function imprimer() {
    flushSync(() =>
      setDateImpression(
        new Date().toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      ),
    );
    window.print();
  }

  const aVide = Object.values(saisies).every((v) => v === null || v === "");
  const pret = resultat.type === "etat";

  return (
    <div className="pb-24 lg:pb-0">
      <div className="no-print grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={chargerExemple}
              className="min-h-[44px] rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary-light"
            >
              Voir l&apos;exemple Cour commune
            </button>
            {(exemple || !aVide) && (
              <button
                type="button"
                onClick={effacer}
                className="min-h-[44px] rounded-lg px-3 py-2 text-sm font-semibold text-foreground underline underline-offset-4 hover:bg-black/5"
              >
                Effacer et saisir mes chiffres
              </button>
            )}
          </div>

          {exemple && (
            <p
              role="note"
              className="rounded-lg border border-secondary/40 bg-secondary-light px-4 py-3 text-sm text-foreground"
            >
              <strong>Exemple fictif</strong> — ces chiffres illustrent la
              méthode, ce ne sont pas des repères.
            </p>
          )}

          <Bloc titre="Votre salle et votre billet" colonnes={3}>
            {BLOC_SALLE.map((d) => (
              <Champ
                key={d.id}
                def={d}
                valeur={saisies[d.id]}
                erreur={resultat.erreurs[d.id]}
                onChange={(v) => maj(d.id, v)}
                aide={d.aide}
              />
            ))}
          </Bloc>

          <Bloc titre="Vos dépenses">
            {BLOC_DEPENSES.map((d) => (
              <Champ
                key={d.id}
                def={d}
                valeur={saisies[d.id]}
                erreur={resultat.erreurs[d.id]}
                onChange={(v) => maj(d.id, v)}
                aide={d.aide}
              />
            ))}
            <Champ
              def={{ id: "imprevus", label: "Imprévus", unite: true }}
              valeur={
                saisies.imprevus ?? formaterNombre(resultat.imprevusAutomatiques)
              }
              automatique={saisies.imprevus === null}
              erreur={resultat.erreurs.imprevus}
              onChange={(v) => maj("imprevus", v)}
              aide={`Une marge pour ce que vous n'avez pas vu venir. Calculée à ${CONFIG_CALCULATEUR.tauxImprevusPourcent} % des lignes ci-dessus ; vous pouvez la modifier.`}
              actions={
                saisies.imprevus !== null ? (
                  <button
                    type="button"
                    onClick={() => maj("imprevus", "")}
                    className="min-h-[44px] text-xs font-semibold text-primary-dark underline underline-offset-4"
                  >
                    Revenir à {CONFIG_CALCULATEUR.tauxImprevusPourcent} %
                  </button>
                ) : undefined
              }
            />
          </Bloc>

          <Bloc titre="Vos autres recettes (hors billetterie)">
            {BLOC_RECETTES.map((d) => (
              <Champ
                key={d.id}
                def={d}
                valeur={saisies[d.id]}
                erreur={resultat.erreurs[d.id]}
                onChange={(v) => maj(d.id, v)}
                aide={d.aide}
              />
            ))}
          </Bloc>

          <p className="text-sm font-medium text-foreground">
            Vos chiffres restent sur votre appareil : rien n&apos;est envoyé ni
            conservé.
          </p>
          <p className="text-xs leading-relaxed text-muted lg:hidden">
            {MENTION_INDEPENDANCE}
          </p>
        </div>

        {/* Résultat : barre repliable en bas de l'écran sur mobile, colonne fixe à droite
            sur ordinateur. */}
        <div className="fixed inset-x-0 bottom-0 z-30 lg:sticky lg:inset-x-auto lg:bottom-auto lg:top-24 lg:z-auto">
          <div className="rounded-t-2xl border border-border bg-surface shadow-[0_-6px_20px_rgba(24,35,30,0.14)] lg:rounded-xl lg:shadow-sm">
            <button
              type="button"
              onClick={() => setOuvert((o) => !o)}
              aria-expanded={ouvert}
              aria-controls="resultat-detail"
              className="flex min-h-[56px] w-full items-center justify-between gap-3 px-4 py-2 text-left lg:hidden"
            >
              <span role="status" aria-live="polite" className="text-base font-bold text-foreground">
                Résultat : {resumeCourt(resultat)}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`shrink-0 text-primary-dark transition-transform motion-reduce:transition-none ${
                  ouvert ? "rotate-180" : ""
                }`}
              >
                <path d="m6 14 6-6 6 6" />
              </svg>
            </button>

            <div
              id="resultat-detail"
              className={`${ouvert ? "block" : "hidden"} max-h-[68vh] overflow-y-auto border-t border-border p-4 sm:p-5 lg:block lg:max-h-none lg:overflow-visible lg:border-t-0`}
            >
              <h2 className="mb-3 hidden text-lg font-extrabold tracking-tight text-secondary-dark lg:block">
                Votre résultat
              </h2>

              <div aria-live="polite" aria-atomic="true">
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-muted">Total des dépenses</dt>
                    <dd className="mt-0.5 text-lg font-bold tabular-nums text-foreground">
                      {formaterFcfa(resultat.depenses)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Autres recettes</dt>
                    <dd className="mt-0.5 text-lg font-bold tabular-nums text-foreground">
                      {formaterFcfa(resultat.recettes)}
                    </dd>
                  </div>
                </dl>

                {defVerdict && verdict ? (
                  <div
                    className={`mt-4 rounded-xl border-2 p-4 ${TONS[defVerdict.ton].carte}`}
                  >
                    <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground">
                      <span className={TONS[defVerdict.ton].icone}>
                        <IconeVerdict ton={defVerdict.ton} />
                      </span>
                      {defVerdict.titre}
                    </p>
                    <p className="mt-2 text-base leading-snug text-foreground">
                      {verdict.avantGras}
                      {verdict.gras && <strong>{verdict.gras}</strong>}
                      {verdict.apresGras}
                    </p>
                  </div>
                ) : (
                  <p className="mt-4 rounded-xl border border-border bg-background p-4 text-base leading-snug text-foreground">
                    {resultat.type === "places_manquantes"
                      ? MESSAGE_PLACES_MANQUANTES
                      : resultat.type === "prix_manquant"
                        ? MESSAGE_PRIX_MANQUANT
                        : MESSAGE_ATTENTE}
                  </p>
                )}

                {ecart && (
                  <p className="mt-3 text-sm leading-snug text-foreground">{ecart}</p>
                )}
                {resultat.billetterieMax !== null && (
                  <p className="mt-2 text-sm text-muted">
                    Billetterie maximale, salle pleine :{" "}
                    {formaterFcfa(resultat.billetterieMax)}.
                  </p>
                )}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted">
                {MENTION_INDEPENDANCE}
              </p>

              <div className="mt-4 flex flex-col gap-2.5 border-t border-border pt-4">
                <button
                  ref={copierRef}
                  type="button"
                  onClick={copier}
                  disabled={!pret}
                  className={`min-h-[44px] rounded-lg bg-primary-dark px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-90 disabled:opacity-50 ${
                    bientot ? "ring-4 ring-primary/50 ring-offset-2" : ""
                  }`}
                >
                  Copier mon récapitulatif
                </button>
                <button
                  type="button"
                  onClick={imprimer}
                  disabled={!pret}
                  className="min-h-[44px] rounded-lg border-2 border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-black/5 disabled:opacity-50"
                >
                  Imprimer ou enregistrer en PDF
                </button>
                {pret && !exemple && (
                  <button
                    type="button"
                    onClick={enregistrer}
                    aria-describedby="enregistrer-bientot"
                    className="min-h-[44px] rounded-lg border-2 border-dashed border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-black/5"
                  >
                    Enregistrer ce budget (bientôt, en bêta)
                  </button>
                )}
                <p
                  id="enregistrer-bientot"
                  role="status"
                  aria-live="polite"
                  className={bientot ? "text-sm font-medium text-foreground" : "sr-only"}
                >
                  {bientot && pret && !exemple
                    ? "L'enregistrement des budgets arrive. Pour l'instant, copiez votre récapitulatif ci-dessus."
                    : ""}
                </p>
                {!pret && (
                  <p className="text-xs text-muted">
                    Disponible dès qu&apos;un résultat est affiché.
                  </p>
                )}
                <p role="status" aria-live="polite" className="text-sm font-semibold text-secondary-dark">
                  {copie === "oui" ? "Récapitulatif copié" : ""}
                </p>
                {copie === "manuel" && texte && (
                  <div>
                    <label htmlFor="recap-manuel" className="text-xs text-muted">
                      Votre navigateur n&apos;autorise pas la copie automatique :
                      sélectionnez ce texte et copiez-le.
                    </label>
                    <textarea
                      id="recap-manuel"
                      readOnly
                      value={texte}
                      rows={8}
                      onFocus={(e) => e.currentTarget.select()}
                      className="mt-1 w-full rounded-lg border border-border bg-surface p-2 text-xs"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feuille d'impression : seulement le récapitulatif, le verdict, la mention
          d'indépendance et la date du jour. */}
      <div className="print-only">
        <h1 style={{ fontSize: "1.4rem", fontWeight: 800 }}>
          Budget prévisionnel — e-Culture CI
        </h1>
        {dateImpression && <p>Imprimé le {dateImpression}</p>}
        {texte && (
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
              fontSize: "1rem",
              marginTop: "1rem",
              lineHeight: 1.5,
            }}
          >
            {texte}
          </pre>
        )}
        {verdict && defVerdict && (
          <p style={{ marginTop: "1rem" }}>
            <strong>{defVerdict.titre}.</strong> {verdict.avantGras}
            {verdict.gras && <strong>{verdict.gras}</strong>}
            {verdict.apresGras}
          </p>
        )}
        <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>{MENTION_INDEPENDANCE}</p>
      </div>
    </div>
  );
}
