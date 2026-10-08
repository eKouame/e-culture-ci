import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { COLLECTIONS, type NomCollection } from "./schema";

// Lecture et validation des fichiers de contenu (`content/<collection>/*.json`). Sans
// dépendance au framework : utilisé par le site (voir `index.ts`) et par le script de
// validation lancé avant chaque compilation.

const RACINE = path.join(process.cwd(), "content");

export interface Probleme {
  collection: NomCollection;
  fichier: string;
  message: string;
}

export interface EntreeLue<K extends NomCollection = NomCollection> {
  fichier: string;
  valeur: ReturnType<(typeof COLLECTIONS)[K]["parse"]>;
}

export function nomsDeCollections(): NomCollection[] {
  return Object.keys(COLLECTIONS) as NomCollection[];
}

function fichiersJson(nom: NomCollection): string[] {
  const dossier = path.join(RACINE, nom);
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier)
    .filter((f) => f.endsWith(".json"))
    .sort();
}

// Lit et valide une collection. Un fichier invalide est un problème, jamais une page cassée.
export function validerCollection(nom: NomCollection): {
  entrees: EntreeLue[];
  problemes: Probleme[];
} {
  const entrees: EntreeLue[] = [];
  const problemes: Probleme[] = [];
  const schema = COLLECTIONS[nom];

  for (const fichier of fichiersJson(nom)) {
    const chemin = path.join(RACINE, nom, fichier);
    let brut: unknown;
    try {
      brut = JSON.parse(readFileSync(chemin, "utf-8"));
    } catch (e) {
      problemes.push({ collection: nom, fichier, message: `JSON illisible : ${(e as Error).message}` });
      continue;
    }
    const resultat = schema.safeParse(brut);
    if (!resultat.success) {
      for (const issue of resultat.error.issues) {
        problemes.push({
          collection: nom,
          fichier,
          message: `${issue.path.join(".") || "(racine)"} : ${issue.message}`,
        });
      }
      continue;
    }
    const valeur = resultat.data as EntreeLue["valeur"];
    // Le nom du fichier doit être le slug : une seule adresse possible par contenu.
    const slug = (valeur as { slug?: string }).slug;
    if (slug && `${slug}.json` !== fichier) {
      problemes.push({ collection: nom, fichier, message: `le fichier doit s'appeler ${slug}.json` });
      continue;
    }
    entrees.push({ fichier, valeur });
  }

  if (nom === "appel" && entrees.length > 1) {
    problemes.push({ collection: nom, fichier: "(dossier)", message: "un seul fichier de configuration de l'appel" });
  }
  return { entrees, problemes };
}

// Références croisées : un lien vers un slug qui n'existe pas casse la compilation.
export function validerReferences(
  toutes: Record<NomCollection, EntreeLue[]>,
): Probleme[] {
  const problemes: Probleme[] = [];
  const slugs = (nom: NomCollection) =>
    new Set(toutes[nom].map((e) => (e.valeur as { slug?: string }).slug).filter(Boolean) as string[]);
  const fiches = slugs("fiches-metiers");
  const ressources = slugs("ressources");

  for (const e of toutes["fiches-metiers"]) {
    const v = e.valeur as { metiersLies: string[] };
    for (const s of v.metiersLies)
      if (!fiches.has(s))
        problemes.push({ collection: "fiches-metiers", fichier: e.fichier, message: `metiersLies : « ${s} » n'existe pas` });
  }
  for (const e of toutes.salaires) {
    const v = e.valeur as { ficheLiee?: string };
    if (v.ficheLiee && !fiches.has(v.ficheLiee))
      problemes.push({ collection: "salaires", fichier: e.fichier, message: `ficheLiee : « ${v.ficheLiee} » n'existe pas` });
  }
  for (const e of toutes["textes-officiels"]) {
    const v = e.valeur as { ressourcesLiees: string[] };
    for (const s of v.ressourcesLiees)
      if (!ressources.has(s))
        problemes.push({ collection: "textes-officiels", fichier: e.fichier, message: `ressourcesLiees : « ${s} » n'existe pas` });
  }
  return problemes;
}

export function toutValider(): {
  toutes: Record<NomCollection, EntreeLue[]>;
  problemes: Probleme[];
} {
  const toutes = {} as Record<NomCollection, EntreeLue[]>;
  const problemes: Probleme[] = [];
  for (const nom of nomsDeCollections()) {
    const r = validerCollection(nom);
    toutes[nom] = r.entrees;
    problemes.push(...r.problemes);
  }
  problemes.push(...validerReferences(toutes));
  return { toutes, problemes };
}
