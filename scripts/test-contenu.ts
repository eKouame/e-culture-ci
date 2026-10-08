// Tests du modèle de contenu et des règles de publication. À lancer avec `npm run test:contenu`.
import {
  actualite,
  configAppel,
  conseil,
  ficheMetier,
  ressource,
  salaire,
} from "../src/content/schema";
import { estVisible, libelleEcheance, verificationPerimee } from "../src/lib/publication";

let echecs = 0;
function verifie(nom: string, ok: boolean) {
  if (!ok) {
    echecs++;
    console.error(`ÉCHEC : ${nom}`);
  } else console.log(`ok     : ${nom}`);
}

const communsPublies = {
  statut: "publie",
  verifieLe: "2026-10-01",
  reluPar: "Awa K., régisseuse",
  sources: [{ titre: "Arrêté n°0750/MCF/CAB" }],
};
const section = [{ id: "intro", titre: "Introduction", corps: "Texte." }];

// Publication : date de vérification + au moins une source
const ressourceBase = {
  slug: "budget",
  titre: "Bâtir votre budget",
  etape: 2,
  resume: "r",
  dureeLectureMin: 6,
  sections: section,
};
verifie("ressource publiée complète : valide", ressource.safeParse({ ...ressourceBase, ...communsPublies }).success);
verifie(
  "ressource publiée sans source : refusée",
  !ressource.safeParse({ ...ressourceBase, ...communsPublies, sources: [] }).success,
);
verifie(
  "ressource publiée sans date de vérification : refusée",
  !ressource.safeParse({ ...ressourceBase, ...communsPublies, verifieLe: undefined }).success,
);
verifie(
  "ressource « à valider » sans source : acceptée (visible en prévisualisation)",
  ressource.safeParse({ ...ressourceBase, statut: "a-valider", aValider: ["Source à trouver"] }).success,
);
verifie(
  "ressource publiée avec des points à valider : refusée",
  !ressource.safeParse({ ...ressourceBase, ...communsPublies, aValider: ["Point ouvert"] }).success,
);
verifie("date mal formée : refusée", !ressource.safeParse({ ...ressourceBase, ...communsPublies, verifieLe: "1er octobre" }).success);
verifie("date inexistante : refusée", !ressource.safeParse({ ...ressourceBase, ...communsPublies, verifieLe: "2026-13-45" }).success);
verifie("slug avec majuscules : refusé", !ressource.safeParse({ ...ressourceBase, ...communsPublies, slug: "Budget" }).success);

// Signature exigée pour les fiches et les guides
const ficheBase = { slug: "producteur", metier: "Producteur", famille: "Production", soumisALicence: true, sections: section };
verifie("fiche publiée signée : valide", ficheMetier.safeParse({ ...ficheBase, ...communsPublies }).success);
verifie(
  "fiche publiée sans signature : refusée",
  !ficheMetier.safeParse({ ...ficheBase, ...communsPublies, reluPar: undefined }).success,
);
const conseilBase = {
  slug: "gestion-projet",
  titre: "t",
  resume: "r",
  accroche: "a",
  etapes: [{ titre: "Étape", texte: "Texte" }],
};
verifie(
  "guide publié sans signature : refusé",
  !conseil.safeParse({ ...conseilBase, ...communsPublies, reluPar: undefined }).success,
);

// « Aucun chiffre sans source »
const salaireBase = { slug: "regisseur", metier: "Régisseur", posteReference: "Régisseur général", correspondance: "approximative" };
verifie(
  "salaire avec montant sans source : refusé, même en brouillon",
  !salaire.safeParse({ ...salaireBase, statut: "brouillon", montantJour: 45000 }).success,
);
verifie(
  "salaire avec montant et source : valide",
  salaire.safeParse({ ...salaireBase, statut: "brouillon", montantJour: 45000, sources: [{ titre: "Grille RETECHCI" }] }).success,
);
verifie(
  "salaire sans montant (« pas de repère ») : valide",
  salaire.safeParse({ ...salaireBase, statut: "brouillon", correspondance: "aucune" }).success,
);
verifie(
  "correspondance inconnue : refusée",
  !salaire.safeParse({ ...salaireBase, statut: "brouillon", correspondance: "exacte" }).success,
);

// Configuration de l'appel
const appelBase = {
  ouvertureLe: "2026-09-15",
  clotureLe: "2026-10-15",
  instance: "Ministère de la Culture",
  categories: [{ code: "B", nom: "Producteurs", cout: 5_000_000, caution: 5_000_000 }],
  conditionAcces: "Voir l'arrêté.",
  ...communsPublies,
};
verifie("appel valide", configAppel.safeParse(appelBase).success);
verifie("appel : clôture avant ouverture refusée", !configAppel.safeParse({ ...appelBase, clotureLe: "2026-09-01" }).success);
verifie("actualité sans titre : refusée", !actualite.safeParse({ slug: "x", type: "site", date: "2026-10-01", titre: "", chapo: "c", ...communsPublies }).success);

// Visibilité selon l'environnement
const avant = process.env.VERCEL_ENV;
process.env.VERCEL_ENV = "production";
verifie("production : « publié » visible", estVisible("publie"));
verifie("production : « à valider » masqué", !estVisible("a-valider"));
verifie("production : « brouillon » masqué", !estVisible("brouillon"));
process.env.VERCEL_ENV = "preview";
verifie("aperçu : « à valider » visible", estVisible("a-valider"));
delete process.env.VERCEL_ENV;
verifie("local : « brouillon » visible", estVisible("brouillon"));
if (avant !== undefined) process.env.VERCEL_ENV = avant;

// Fraîcheur et échéances
const maintenant = new Date("2026-10-08T10:00:00Z");
verifie("fraîcheur : vérifié il y a 1 mois = frais", !verificationPerimee("2026-09-08", 6, maintenant));
verifie("fraîcheur : vérifié il y a 7 mois = périmé", verificationPerimee("2026-03-01", 6, maintenant));
verifie("fraîcheur : sans date = périmé", verificationPerimee(undefined, 6, maintenant));
verifie("échéance : J-7", libelleEcheance("2026-10-15", maintenant) === "J-7");
verifie("échéance : demain", libelleEcheance("2026-10-09", maintenant) === "Demain");
verifie("échéance : aujourd'hui", libelleEcheance("2026-10-08", maintenant) === "Aujourd'hui");
verifie("échéance : passée = masquée", libelleEcheance("2026-10-07", maintenant) === null);
verifie("échéance : le 16 octobre, l'appel du 15 est clos", libelleEcheance("2026-10-15", new Date("2026-10-16T00:00:01Z")) === null);

if (echecs > 0) {
  console.error(`\n${echecs} échec(s).`);
  process.exit(1);
}
console.log("\nTous les tests de contenu passent.");
