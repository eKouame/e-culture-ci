"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/Button";
import { PrintButton } from "@/components/ui/PrintButton";
import { mesure } from "@/lib/mesure";
import { COMMUNE_ESSAI, deCommune, estCommuneActive } from "@/lib/communes-guichet-config";

const DISTRICTS_CI = [
  "Abidjan",
  "Bas-Sassandra",
  "Comoé",
  "Denguélé",
  "Gôh-Djiboua",
  "Lacs",
  "Lagunes",
  "Montagnes",
  "Sassandra-Marahoué",
  "Savanes",
  "Vallée du Bandama",
  "Woroba",
  "Yamoussoukro",
  "Zanzan",
] as const;

const TYPES_SPECTACLE = [
  "Concert",
  "Théâtre",
  "Danse",
  "Humour",
  "Conte",
  "Projection",
  "Cirque",
  "Exposition",
  "Autre",
] as const;

type Champ = {
  cle: string;
  label: string;
  requis?: boolean;
  type?: string;
  exemple?: string;
  liste?: readonly string[];
  vide?: string;
  case?: boolean;
  pleineLargeur?: boolean;
};

const ETAPES: { titre: string; entete: string; aide: string; champs: Champ[] }[] = [
  {
    titre: "Organisateur",
    entete: "Qui organise l'événement ?",
    aide: "Ces informations identifient la personne à contacter au sujet de l'événement.",
    champs: [
      { cle: "nom", label: "Nom", requis: true, exemple: "Koné" },
      { cle: "prenom", label: "Prénom", exemple: "Awa" },
      {
        cle: "telephone",
        label: "Téléphone",
        requis: true,
        type: "tel",
        exemple: "07 00 00 00 00",
      },
      { cle: "email", label: "Email", type: "email", exemple: "vous@exemple.ci" },
      {
        cle: "structure",
        label: "Structure ou association",
        exemple: "Collectif Cour commune",
        pleineLargeur: true,
      },
    ],
  },
  {
    titre: "Événement",
    entete: "Que présentez-vous ?",
    aide: "Le titre peut rester provisoire. Seule la date est nécessaire pour préparer votre récapitulatif.",
    champs: [
      {
        cle: "titre",
        label: "Titre de l'événement",
        exemple: "Nuit des conteurs",
        pleineLargeur: true,
      },
      {
        cle: "type",
        label: "Type de spectacle",
        liste: TYPES_SPECTACLE,
        vide: "Choisir un type",
      },
      { cle: "date", label: "Date de l'événement", requis: true, type: "date" },
    ],
  },
  {
    titre: "Lieu & public",
    entete: "Où, et devant combien de personnes ?",
    aide: "La commune permet d'orienter vers la bonne mairie ou direction régionale.",
    champs: [
      {
        cle: "district",
        label: "District ou région",
        liste: DISTRICTS_CI,
        vide: "Choisir un district",
      },
      { cle: "commune", label: "Commune ou localité", requis: true, exemple: "Bouaké" },
      {
        cle: "lieu",
        label: "Lieu précis",
        exemple: "Place de la mairie",
        pleineLargeur: true,
      },
      { cle: "jauge", label: "Jauge estimée", type: "number", exemple: "150" },
      { cle: "payante", label: "L'entrée est payante", case: true, pleineLargeur: true },
    ],
  },
];

function scrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

function genererReference() {
  let n = "";
  for (let i = 0; i < 6; i++) n += Math.floor(Math.random() * 10);
  return `DEC-${new Date().getFullYear()}-${n}`;
}

function texteOu(valeur: unknown, defaut = "Non précisé") {
  const s = String(valeur ?? "").trim();
  return s ? s : defaut;
}

function dateLisible(v: string) {
  if (!v) return "Non précisée";
  const d = new Date(`${v}T12:00:00`);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function BandeauEssai() {
  return (
    <p className="mb-4 rounded-xl bg-deep px-5 py-3.5 text-sm font-semibold text-on-deep">
      Exemple fictif&nbsp;: aucune donnée n&apos;est transmise.
    </p>
  );
}

function donneesInitiales(demo: boolean): Record<string, string | boolean> {
  return {
    payante: false,
    transmettre: false,
    consentTransmission: false,
    consentCartographie: false,
    ...(demo ? { commune: COMMUNE_ESSAI } : {}),
  };
}

// `demo` : essai pour les mairies, avec une commune clairement fictive. On y
// montre ce que verrait un organisateur dont la commune a un guichet actif, mais rien
// n'est envoyé ni conservé. Hors essai, c'est l'état 0 : l'outil produit un
// récapitulatif à imprimer, et une commune sans guichet actif est dite comme telle.
export function DeclarationForm({ demo = false }: { demo?: boolean }) {
  const [etape, setEtape] = useState(1);
  const [donnees, setDonnees] = useState<Record<string, string | boolean>>(() =>
    donneesInitiales(demo),
  );
  const [erreur, setErreur] = useState<string | null>(null);
  const [fini, setFini] = useState(false);
  const [reference, setReference] = useState("");
  const [datePreparation, setDatePreparation] = useState<Date | null>(null);

  // État 0 : tant qu'une commune n'a pas de guichet actif, on le dit, sans rien promettre.
  const commune = String(donnees.commune ?? "").trim();
  const encartEtat0 = !demo && commune !== "" && !estCommuneActive(commune);

  const cardRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);

  useEffect(() => {
    if (!interacted.current) return;
    const target = fini ? docRef.current : cardRef.current;
    target?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  }, [etape, fini]);

  function maj(cle: string, valeur: string | boolean) {
    setDonnees((d) => ({ ...d, [cle]: valeur }));
    setErreur(null);
  }

  function suivant() {
    interacted.current = true;
    const etapeActuelle = ETAPES[etape - 1];
    const manquants = etapeActuelle.champs.filter(
      (c) => c.requis && !String(donnees[c.cle] ?? "").trim(),
    );
    if (manquants.length > 0) {
      const noms = manquants.map((c) => c.label.toLowerCase()).join(", ");
      setErreur(
        manquants.length > 1
          ? `Ces informations sont nécessaires pour continuer : ${noms}.`
          : `Le champ « ${manquants[0].label} » est nécessaire pour continuer.`,
      );
      return;
    }
    if (etape < ETAPES.length) {
      setEtape((e) => e + 1);
      return;
    }
    if (demo && donnees.transmettre && !donnees.consentTransmission) {
      setErreur(
        "Pour simuler la transmission, cochez l'autorisation de transmettre, ou décochez la transmission.",
      );
      return;
    }
    mesure("declaration_produite", {
      mode: demo ? "essai" : "standard",
      encart: !demo && encartEtat0 ? "oui" : "non",
    });
    setReference(genererReference());
    setDatePreparation(new Date());
    setFini(true);
  }

  function retour() {
    interacted.current = true;
    setErreur(null);
    setEtape((e) => Math.max(1, e - 1));
  }

  function recommencer() {
    interacted.current = true;
    setDonnees(donneesInitiales(demo));
    setErreur(null);
    setFini(false);
    setEtape(1);
  }

  if (fini) {
    const identite = [donnees.prenom, donnees.nom]
      .filter((x) => String(x ?? "").trim())
      .join(" ");

    const blocs: { titre: string; lignes: { label: string; valeur: string }[] }[] = [
      {
        titre: "Organisateur",
        lignes: [
          { label: "Nom et prénom", valeur: texteOu(identite) },
          { label: "Téléphone", valeur: texteOu(donnees.telephone) },
          { label: "Email", valeur: texteOu(donnees.email, "Non communiqué") },
          {
            label: "Structure",
            valeur: texteOu(donnees.structure, "À titre individuel"),
          },
        ],
      },
      {
        titre: "Événement",
        lignes: [
          { label: "Titre", valeur: texteOu(donnees.titre, "Sans titre") },
          { label: "Type de spectacle", valeur: texteOu(donnees.type) },
          { label: "Date", valeur: dateLisible(String(donnees.date ?? "")) },
        ],
      },
      {
        titre: "Lieu et public",
        lignes: [
          { label: "District ou région", valeur: texteOu(donnees.district) },
          { label: "Commune ou localité", valeur: texteOu(donnees.commune) },
          { label: "Lieu précis", valeur: texteOu(donnees.lieu) },
          {
            label: "Jauge estimée",
            valeur: String(donnees.jauge ?? "").trim()
              ? `${donnees.jauge} personnes`
              : "Non précisée",
          },
          {
            label: "Entrée",
            valeur: donnees.payante ? "Payante" : "Libre ou gratuite",
          },
        ],
      },
    ];

    return (
      <>
        <div ref={docRef}>
          {demo && <BandeauEssai />}
          {demo && donnees.transmettre && (
            <div className="no-print mb-4 rounded-xl border border-border bg-background p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-secondary-dark">
                Transmission simulée
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                Dans un guichet actif, votre déclaration serait transmise à la
                mairie : elle recevrait le récapitulatif ci-dessous, avec la
                mention « Document non officiel ». Ici, rien n&apos;a été
                envoyé, car la commune est fictive.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {donnees.consentCartographie
                  ? "Cartographie : vous avez accepté que vos informations d'événement, sans vos coordonnées personnelles, soient conservées pour la cartographie de la commune."
                  : "Cartographie : vous n'avez rien accepté, aucune information ne serait conservée pour la cartographie."}
              </p>
            </div>
          )}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-lg font-extrabold tracking-tight text-secondary">
                  e-Culture <span className="text-primary-dark">CI</span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  Récapitulatif de préparation d&apos;événement
                </p>
              </div>
              <span className="rounded-full bg-primary px-3.5 py-1.5 text-right text-xs font-extrabold uppercase tracking-wide text-[#241403]">
                Document non officiel, préparé avec e-Culture CI
              </span>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-border py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Référence
                </p>
                <p className="tabular-ref mt-0.5 text-lg font-extrabold text-foreground">
                  {reference}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Préparé le
                </p>
                <p className="mt-0.5 text-lg font-extrabold text-foreground">
                  {datePreparation ? dateFormat.format(datePreparation) : ""}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Statut
                </p>
                <p className="mt-0.5 text-lg font-extrabold text-secondary">
                  {demo && donnees.transmettre
                    ? "Transmission simulée"
                    : demo
                      ? "Exemple fictif"
                      : "Récapitulatif prêt"}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-4">
              {blocs.map((b) => (
                <div
                  key={b.titre}
                  className="overflow-hidden rounded-xl border border-border"
                >
                  <div className="border-b border-border bg-background px-5 py-3 text-sm font-extrabold text-foreground">
                    {b.titre}
                  </div>
                  {b.lignes.map((l) => (
                    <div
                      key={l.label}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border px-5 py-3 last:border-b-0"
                    >
                      <span className="text-sm text-muted">{l.label}</span>
                      <span className="text-sm font-bold text-foreground">
                        {l.valeur}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <p className="mt-5 rounded-r-lg border border-border border-l-4 border-l-secondary bg-background px-4 py-3.5 text-sm leading-relaxed text-foreground">
              Ce récapitulatif vous aide à préparer votre démarche ; il ne
              remplace aucun document officiel. Conservez-le pour vos échanges
              avec les autorités locales (mairie, préfecture).
            </p>

            <div className="mt-5 rounded-xl bg-secondary p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-accent-on-deep">
                Et maintenant ?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-deep">
                Présentez ce récapitulatif à votre mairie ou à la direction
                régionale de la Culture de votre district. Ce sont elles qui
                vous indiqueront les démarches attendues sur votre territoire.
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-on-deep-muted">
                La validation de toute autorisation ou licence appartient au
                ministère de la Culture. e-Culture CI est un service
                indépendant et ne délivre aucun document officiel.
              </p>
            </div>
          </div>

          <div className="no-print mt-6 flex flex-col gap-2 sm:flex-row">
            <PrintButton />
            <Button type="button" variant="outline" onClick={recommencer}>
              Préparer une autre déclaration
            </Button>
            <LinkButton href="/" variant="ghost">
              Retour à l&apos;accueil
            </LinkButton>
          </div>
        </div>

        <p className="no-print mt-6 text-sm text-muted">
          Aucune donnée n&apos;est envoyée ni conservée : le récapitulatif et
          sa référence sont produits dans votre navigateur. Si vous quittez la
          page sans imprimer, tout est perdu.
        </p>
      </>
    );
  }

  const etapeActuelle = ETAPES[etape - 1];
  const derniereEtape = etape === ETAPES.length;

  return (
    <>
      {demo && <BandeauEssai />}
      <div
        ref={cardRef}
        className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6"
      >
        <div>
          <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-xs font-bold uppercase tracking-wide text-primary-dark">
              Étape {etape} sur {ETAPES.length}
            </span>
            <span className="text-sm text-muted">Deux minutes environ</span>
          </div>
          <ol className="grid grid-cols-3 gap-2" aria-hidden="true">
            {ETAPES.map((e, i) => {
              const n = i + 1;
              const atteint = n <= etape;
              return (
                <li key={e.titre} className="flex flex-col gap-1.5">
                  <span
                    className={`block h-1.5 rounded-full ${
                      atteint ? "bg-primary" : "bg-border"
                    }`}
                  />
                  <span
                    className={`text-xs font-bold leading-tight ${
                      atteint ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {n}. {e.titre}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-foreground">
            {etapeActuelle.entete}
          </h2>
          <p className="mt-1 max-w-prose text-sm text-muted">
            {etapeActuelle.aide}
          </p>
        </div>

        {erreur && (
          <div
            role="alert"
            className="rounded-r-lg border border-primary-light border-l-4 border-l-primary bg-primary-light px-4 py-3.5"
          >
            <p className="text-sm font-semibold text-primary-dark">{erreur}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {etapeActuelle.champs.map((c) => {
            const enveloppe = c.pleineLargeur ? "sm:col-span-2" : "";
            if (c.case) {
              return (
                <label
                  key={c.cle}
                  className={`flex items-center gap-2.5 rounded-lg border border-border px-3.5 py-2.5 ${enveloppe}`}
                >
                  <input
                    type="checkbox"
                    checked={!!donnees[c.cle]}
                    onChange={(e) => maj(c.cle, e.target.checked)}
                    className="h-4 w-4 accent-orange-600"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {c.label}
                  </span>
                </label>
              );
            }
            if (c.liste) {
              return (
                <div key={c.cle} className={`flex flex-col gap-1.5 ${enveloppe}`}>
                  <label className="text-sm font-medium text-foreground">
                    {c.label}
                  </label>
                  <select
                    value={String(donnees[c.cle] ?? "")}
                    onChange={(e) => maj(c.cle, e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-base outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="" disabled>
                      {c.vide}
                    </option>
                    {c.liste.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }
            return (
              <div key={c.cle} className={enveloppe}>
                <Input
                  label={c.requis ? c.label : `${c.label} (facultatif)`}
                  type={c.type ?? "text"}
                  placeholder={c.exemple}
                  value={String(donnees[c.cle] ?? "")}
                  onChange={(e) => maj(c.cle, e.target.value)}
                  readOnly={demo && c.cle === "commune"}
                  hint={
                    demo && c.cle === "commune"
                      ? "Commune fictive, utilisée pour l'essai."
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>

        {derniereEtape && encartEtat0 && (
          <div className="rounded-xl border border-border bg-background px-5 py-4">
            <p className="text-sm leading-relaxed text-foreground">
              <strong>
                La mairie {deCommune(commune)} n&apos;utilise pas encore
                e-Culture&nbsp;CI.
              </strong>{" "}
              Imprimez ou enregistrez votre récapitulatif et portez-le à la
              mairie. Vous voulez que votre commune propose ce service&nbsp;?
              Parlez-en à votre mairie.
            </p>
          </div>
        )}

        {derniereEtape && demo && (
          <div className="rounded-xl border border-border bg-background px-5 py-4">
            <p className="text-sm leading-relaxed text-foreground">
              La commune d&apos;essai reçoit les déclarations via
              e-Culture&nbsp;CI. Voici ce que verrait un organisateur dont la
              commune a un guichet actif.
            </p>
            <label className="mt-3 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={!!donnees.transmettre}
                onChange={(e) => maj("transmettre", e.target.checked)}
                className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-secondary"
              />
              <span className="text-sm font-medium leading-relaxed text-foreground">
                Transmettre ma déclaration à la mairie de la commune
                d&apos;essai.
              </span>
            </label>
            {!!donnees.transmettre && (
              <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={!!donnees.consentTransmission}
                    onChange={(e) => maj("consentTransmission", e.target.checked)}
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-secondary"
                  />
                  <span className="text-sm leading-relaxed text-foreground">
                    J&apos;accepte que e-Culture CI transmette les informations
                    de ma déclaration à la mairie de la commune
                    d&apos;essai, à l&apos;adresse qu&apos;elle a désignée.
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={!!donnees.consentCartographie}
                    onChange={(e) => maj("consentCartographie", e.target.checked)}
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-secondary"
                  />
                  <span className="text-sm leading-relaxed text-foreground">
                    <span className="font-semibold">Facultatif.</span> J&apos;accepte
                    que mes informations d&apos;événement (sans mes coordonnées
                    personnelles) soient conservées pour alimenter la
                    cartographie culturelle de ma commune.
                  </span>
                </label>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          {etape > 1 && (
            <Button type="button" variant="outline" size="lg" onClick={retour}>
              ← Retour
            </Button>
          )}
          <Button type="button" size="lg" className="sm:ml-auto" onClick={suivant}>
            {etape === ETAPES.length ? "Produire mon récapitulatif" : "Continuer →"}
          </Button>
        </div>

        <p className="text-xs text-muted">
          Seuls le nom, le téléphone, la date et la commune sont nécessaires.
          Le reste est facultatif : nous ne demandons rien dont vous n&apos;avez
          pas besoin.
        </p>
      </div>

      <p className="mt-6 text-sm text-muted">
        Aucune donnée n&apos;est envoyée ni conservée : le récapitulatif et sa
        référence sont produits dans votre navigateur. Si vous quittez la page
        sans imprimer, tout est perdu.
      </p>
    </>
  );
}
