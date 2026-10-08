// Valide tout le contenu (`content/**/*.json`) avant la compilation du site. Une erreur
// (champ manquant, date mal formée, référence cassée, publication sans source ni date de
// vérification…) arrête la compilation : mieux vaut un échec de build qu'une page cassée en
// production.
import { nomsDeCollections, toutValider } from "../src/content/fichiers";

const { toutes, problemes } = toutValider();

for (const nom of nomsDeCollections()) {
  const n = toutes[nom].length;
  const publies = toutes[nom].filter((e) => (e.valeur as { statut: string }).statut === "publie").length;
  console.log(`contenu : ${nom.padEnd(18)} ${String(n).padStart(3)} fichier(s), ${publies} publié(s)`);
}

if (problemes.length > 0) {
  console.error(`\n${problemes.length} problème(s) de contenu :`);
  for (const p of problemes) console.error(`  - ${p.collection}/${p.fichier} : ${p.message}`);
  process.exit(1);
}
console.log("contenu : tout est valide.");
