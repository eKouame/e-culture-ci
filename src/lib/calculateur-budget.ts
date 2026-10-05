// Calculateur de budget et de point d'équilibre.
// Module pur : aucune dépendance, aucun accès au navigateur. Tout se calcule côté
// client et rien n'est envoyé ni conservé. Mêmes formules que la ressource « Bâtir
// votre budget » (voir le cahier des charges du calculateur, §5).

// Objet de configuration unique : le taux d'imprévus et les seuils du verdict ne sont
// jamais écrits en dur dans la mise en page. Les seuils sont PÉDAGOGIQUES, pas
// réglementaires : ne jamais les présenter comme une norme.
export const CONFIG_CALCULATEUR = {
  tauxImprevusPourcent: 10,
  seuilsPourcent: { c1: 60, c2: 90, c3: 100 },
  maxChiffres: 12,
};

export type ChampId =
  | "places"
  | "prix"
  | "entrees"
  | "artistique"
  | "technique"
  | "lieu"
  | "communication"
  | "organisation"
  | "imprevus"
  | "subventions"
  | "sponsoring"
  | "coproduction"
  | "apports";

// `imprevus` vaut `null` tant que l'utilisateur ne l'a pas modifié (calcul automatique).
export type Saisies = Record<Exclude<ChampId, "imprevus">, string> & {
  imprevus: string | null;
};

export const SAISIES_VIDES: Saisies = {
  places: "",
  prix: "",
  entrees: "",
  artistique: "",
  technique: "",
  lieu: "",
  communication: "",
  organisation: "",
  imprevus: null,
  subventions: "",
  sponsoring: "",
  coproduction: "",
  apports: "",
};

// L'exemple fictif « Cour commune » de la ressource (imprévus : 95 000, calculés à 10 %).
export const SAISIES_EXEMPLE: Saisies = {
  places: "100",
  prix: "2000",
  entrees: "80",
  artistique: "400000",
  technique: "250000",
  lieu: "120000",
  communication: "80000",
  organisation: "100000",
  imprevus: null,
  subventions: "0",
  sponsoring: "80000",
  coproduction: "300000",
  apports: "200000",
};

export const MESSAGE_ERREUR_NOMBRE =
  "Saisissez un nombre entier en FCFA, sans virgule ni lettre";
export const MESSAGE_ERREUR_LONGUEUR = `${CONFIG_CALCULATEUR.maxChiffres} chiffres maximum`;
export const MESSAGE_ENTREES_SUPERIEURES =
  "Vous ne pouvez pas vendre plus d'entrées que de places";

export interface Lecture {
  valeur: number | null; // null = vide ou invalide
  vide: boolean;
  erreur: string | null;
}

// Les espaces (y compris l'espace insécable et l'espace fine) sont ignorés :
// « 1 045 000 » et « 1045000 » donnent la même valeur. Rien n'est deviné : « 2.000 »
// n'est pas converti en 2 000, car le séparateur est ambigu.
export function lireMontant(brut: string): Lecture {
  const nettoye = brut.replace(/[\s   ]/g, "");
  if (nettoye === "") return { valeur: null, vide: true, erreur: null };
  if (!/^\d+$/.test(nettoye)) {
    return { valeur: null, vide: false, erreur: MESSAGE_ERREUR_NOMBRE };
  }
  if (nettoye.length > CONFIG_CALCULATEUR.maxChiffres) {
    return { valeur: null, vide: false, erreur: MESSAGE_ERREUR_LONGUEUR };
  }
  return { valeur: Number(nettoye), vide: false, erreur: null };
}

export type Etat = "A" | "B" | "C1" | "C2" | "C3" | "C4";

export type TypeResultat =
  | "attente" // rien (ou pas assez) de rempli
  | "prix_manquant" // des dépenses, mais le prix du billet n'est pas renseigné
  | "places_manquantes" // point d'équilibre bloqué : pas de nombre de places
  | "etat"; // un état A, B ou C1 à C4

export interface Resultat {
  type: TypeResultat;
  etat: Etat | null;
  sousTotal: number;
  imprevus: number;
  imprevusAutomatiques: number;
  depenses: number;
  recettes: number;
  besoin: number; // D − R : ce que la billetterie doit couvrir
  pointEquilibre: number | null; // en entrées
  ratioPourcent: number | null; // point d'équilibre / places, arrondi
  billetteriePrevue: number | null;
  ecart: number | null;
  billetterieMax: number | null;
  places: number | null;
  prix: number | null;
  entrees: number | null;
  erreurs: Partial<Record<ChampId, string>>;
}

const CATEGORIES_DEPENSES = [
  "artistique",
  "technique",
  "lieu",
  "communication",
  "organisation",
] as const;
const SOURCES_RECETTES = [
  "subventions",
  "sponsoring",
  "coproduction",
  "apports",
] as const;

export function calculer(saisies: Saisies): Resultat {
  const erreurs: Partial<Record<ChampId, string>> = {};
  const lire = (id: ChampId, brut: string): Lecture => {
    const l = lireMontant(brut);
    if (l.erreur) erreurs[id] = l.erreur;
    return l;
  };

  // Les champs invalides sont ignorés dans le calcul (comptés comme vides).
  const montant = (id: Exclude<ChampId, "imprevus">): number =>
    lire(id, saisies[id]).valeur ?? 0;

  const sousTotal = CATEGORIES_DEPENSES.reduce((s, id) => s + montant(id), 0);
  const imprevusAutomatiques = Math.round(
    (sousTotal * CONFIG_CALCULATEUR.tauxImprevusPourcent) / 100,
  );
  let imprevus = imprevusAutomatiques;
  let imprevusSaisis = false;
  if (saisies.imprevus !== null) {
    const l = lire("imprevus", saisies.imprevus);
    if (l.valeur !== null) {
      imprevus = l.valeur;
      imprevusSaisis = true;
    }
  }
  const depenses = sousTotal + imprevus;
  const recettes = SOURCES_RECETTES.reduce((s, id) => s + montant(id), 0);
  const besoin = depenses - recettes;

  const lPlaces = lire("places", saisies.places);
  const lPrix = lire("prix", saisies.prix);
  const lEntrees = lire("entrees", saisies.entrees);
  const places = lPlaces.valeur !== null && lPlaces.valeur >= 1 ? lPlaces.valeur : null;
  const prix = lPrix.valeur;
  let entrees = lEntrees.valeur;
  if (entrees !== null && places !== null && entrees > places) {
    erreurs.entrees = MESSAGE_ENTREES_SUPERIEURES;
    entrees = null; // champ ignoré
  }

  const base: Resultat = {
    type: "attente",
    etat: null,
    sousTotal,
    imprevus,
    imprevusAutomatiques,
    depenses,
    recettes,
    besoin,
    pointEquilibre: null,
    ratioPourcent: null,
    billetteriePrevue: null,
    ecart: null,
    billetterieMax: null,
    places,
    prix,
    entrees,
    erreurs,
  };

  // Rien de rempli côté dépenses et recettes : on attend la saisie.
  if (sousTotal === 0 && !imprevusSaisis && recettes === 0) return base;

  // L'écart ne dépend que des entrées prévues, du prix et des chiffres saisis.
  const avecEcart = (r: Resultat): Resultat => {
    if (entrees === null || prix === null || prix <= 0) return r;
    const billetteriePrevue = entrees * prix;
    return {
      ...r,
      billetteriePrevue,
      ecart: billetteriePrevue + recettes - depenses,
    };
  };
  const avecMax = (r: Resultat): Resultat =>
    places !== null && prix !== null && prix > 0
      ? { ...r, billetterieMax: places * prix }
      : r;

  // État A : déjà couvert sans billetterie.
  if (besoin <= 0) {
    return avecMax(avecEcart({ ...base, type: "etat", etat: "A" }));
  }

  // Le prix n'est pas renseigné : on le demande, plutôt que d'annoncer à tort une
  // entrée gratuite (« 0 » saisi explicitement donne l'état B).
  if (lPrix.vide) return { ...base, type: "prix_manquant" };

  // État B : entrée gratuite, il manque « besoin » à trouver ailleurs.
  if (prix === 0) return { ...base, type: "etat", etat: "B" };

  if (prix === null) return { ...base, type: "prix_manquant" };

  // À partir d'ici, le point d'équilibre est calculable ; le comparer à la salle
  // demande le nombre de places (sinon : division par zéro, calcul bloqué).
  const pointEquilibre = Math.ceil(besoin / prix);
  if (places === null) {
    return { ...base, type: "places_manquantes", pointEquilibre: null };
  }

  const pe100 = pointEquilibre * 100;
  const { c1, c2 } = CONFIG_CALCULATEUR.seuilsPourcent;
  const etat: Etat =
    pe100 <= c1 * places
      ? "C1"
      : pe100 <= c2 * places
        ? "C2"
        : pointEquilibre <= places
          ? "C3"
          : "C4";

  return avecMax(
    avecEcart({
      ...base,
      type: "etat",
      etat,
      pointEquilibre,
      ratioPourcent: Math.round(pe100 / places),
    }),
  );
}

// « 1 045 000 FCFA » : espace fine insécable entre les milliers (écran) ; l'espace
// insécable ordinaire pour le texte copié, que les messageries gèrent partout.
export function formaterNombre(n: number, separateur = " "): string {
  const signe = n < 0 ? "−" : "";
  return signe + String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, separateur);
}

export function formaterFcfa(n: number, separateur = " "): string {
  return `${formaterNombre(n, separateur)} FCFA`;
}

export interface Verdict {
  titre: string; // intitulé écrit (jamais la couleur seule)
  ton: "positif" | "attention" | "alerte";
}

export const VERDICTS: Record<Etat, Verdict> = {
  A: { titre: "Déjà couvert", ton: "positif" },
  B: { titre: "Entrée gratuite", ton: "attention" },
  C1: { titre: "Marge confortable", ton: "positif" },
  C2: { titre: "Cela tient, à bien remplir", ton: "attention" },
  C3: { titre: "Très serré", ton: "attention" },
  C4: { titre: "Ne tient pas sur la billetterie seule", ton: "alerte" },
};

export const MESSAGE_ATTENTE =
  "Renseignez vos dépenses et votre prix de billet : le résultat s'affichera ici.";
export const MESSAGE_PRIX_MANQUANT =
  "Indiquez le prix du billet (0 si l'entrée est gratuite) : le résultat s'affichera ici.";
export const MESSAGE_PLACES_MANQUANTES =
  "Indiquez le nombre de places pour comparer le point d'équilibre à votre salle";

export const MENTION_INDEPENDANCE =
  "Outil d'orientation indépendant : ce calcul repose sur vos estimations et n'est pas une garantie. Il ne remplace pas un professionnel du chiffre. Les montants affichés sont ceux que vous avez saisis.";

// Fragments de texte d'un verdict, avec les montants déjà formatés. L'interface met
// le point d'équilibre en gras ; ce texte brut sert aussi au récapitulatif copié.
export interface TexteVerdict {
  avantGras: string;
  gras: string;
  apresGras: string;
}

export function texteVerdict(r: Resultat): TexteVerdict | null {
  if (r.type !== "etat" || r.etat === null) return null;
  const D = formaterFcfa(r.depenses);
  const R = formaterFcfa(r.recettes);
  const pe = r.pointEquilibre;
  const ratio = r.ratioPourcent;
  switch (r.etat) {
    case "A":
      return {
        avantGras: `Bonne nouvelle : vos recettes hors billetterie (${R}) couvrent déjà vos dépenses (${D}). La billetterie sera un complément.`,
        gras: "",
        apresGras: "",
      };
    case "B":
      return {
        avantGras: `Entrée gratuite : il manque ${formaterFcfa(r.besoin)} à trouver ailleurs (subvention, sponsor, apport). Aucune entrée ne viendra combler l'écart.`,
        gras: "",
        apresGras: "",
      };
    case "C1":
      return {
        avantGras: "Il faut vendre ",
        gras: `${formaterNombre(pe ?? 0)} entrées`,
        apresGras: ` pour couvrir vos dépenses, soit ${ratio} % de votre salle. La marge est confortable.`,
      };
    case "C2":
      return {
        avantGras: "Il faut vendre ",
        gras: `${formaterNombre(pe ?? 0)} entrées`,
        apresGras: `, soit ${ratio} % de votre salle. Cela tient, à condition de bien remplir.`,
      };
    case "C3":
      return {
        avantGras: "Il faut vendre ",
        gras: `${formaterNombre(pe ?? 0)} entrées`,
        apresGras: `, soit ${ratio} % de votre salle. C'est très serré : un remplissage un peu plus faible ou un imprévu vous met en perte.`,
      };
    case "C4":
      return {
        avantGras: "Il faudrait vendre ",
        gras: `${formaterNombre(pe ?? 0)} entrées`,
        apresGras: ` pour une salle de ${formaterNombre(r.places ?? 0)} places : votre modèle ne tient pas sur la seule billetterie. Vous avez trois leviers : baisser une dépense, augmenter une recette (un partenaire de plus, un prix légèrement plus haut), ou chercher une petite subvention.`,
      };
  }
}

// Ligne d'écart, si « Entrées que vous pensez vendre » est renseigné.
export function ligneEcart(r: Resultat): string | null {
  if (r.entrees === null || r.prix === null || r.billetteriePrevue === null || r.ecart === null) {
    return null;
  }
  const total = formaterFcfa(r.billetteriePrevue + r.recettes);
  const base = `Avec ${formaterNombre(r.entrees)} entrées à ${formaterFcfa(r.prix)} : recettes totales ${total}, dépenses ${formaterFcfa(r.depenses)}.`;
  const conclusion =
    r.ecart < 0
      ? `Il vous manque ${formaterFcfa(-r.ecart)}.`
      : r.ecart > 0
        ? `Vous dégagez un excédent de ${formaterFcfa(r.ecart)}.`
        : "Votre budget est équilibré.";
  return `${base} ${conclusion}`;
}

// Récapitulatif en texte brut, lisible tel quel dans un message WhatsApp ou un e-mail.
export function recapitulatif(saisies: Saisies, r: Resultat): string | null {
  if (r.type !== "etat" || r.etat === null) return null;
  const f = (n: number) => formaterFcfa(n, " ");
  const lire = (brut: string) => lireMontant(brut).valeur ?? 0;
  const lignes: string[] = [
    "Budget prévisionnel — calculé avec e-Culture CI",
  ];
  const salle: string[] = [];
  if (r.places !== null) salle.push(`Salle : ${formaterNombre(r.places, " ")} places`);
  if (r.prix !== null) salle.push(`Billet : ${f(r.prix)}`);
  if (salle.length > 0) lignes.push(salle.join(" — "));
  lignes.push(
    "DÉPENSES",
    `Artistique : ${f(lire(saisies.artistique))}`,
    `Technique : ${f(lire(saisies.technique))}`,
    `Lieu : ${f(lire(saisies.lieu))}`,
    `Communication : ${f(lire(saisies.communication))}`,
    `Organisation : ${f(lire(saisies.organisation))}`,
    `Imprévus : ${f(r.imprevus)}`,
    `Total dépenses : ${f(r.depenses)}`,
    "AUTRES RECETTES (hors billetterie)",
    `Total : ${f(r.recettes)}`,
  );
  if (r.etat === "A") {
    lignes.push("Les recettes hors billetterie couvrent déjà les dépenses.");
  } else if (r.etat === "B") {
    lignes.push(`Entrée gratuite : il manque ${f(r.besoin)} à trouver ailleurs.`);
  } else {
    lignes.push(
      `POINT D'ÉQUILIBRE : ${formaterNombre(r.pointEquilibre ?? 0, " ")} entrées (${r.ratioPourcent} % de la salle)`,
    );
  }
  const ecart = ligneEcart(r);
  if (ecart) lignes.push(ecart.replace(/ /g, " "));
  lignes.push("Outil d'orientation indépendant — estimations, pas une garantie. e-culture.ci");
  return lignes.join("\n");
}
