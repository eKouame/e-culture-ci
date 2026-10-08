# Contenu du site

Tout le contenu éditorial vit ici, dans des fichiers JSON, un dossier par collection :

| Dossier | Contenu |
|---|---|
| `ressources/` | les ressources (étape 1 à 3, sections, « Et après ? ») |
| `fiches-metiers/` | les fiches métiers |
| `conseils/` | les guides de conseils carrière |
| `salaires/` | les repères de salaires par métier |
| `textes-officiels/` | décrets, arrêtés, lois, codes, accords |
| `actualites/` | les actualités (secteur / site) |
| `appel/` | la configuration de l'appel (dates, catégories, coûts) : un seul fichier |

Le nom d'un fichier est son `slug` : `producteur.json` pour `"slug": "producteur"`.

## Champs communs

- `statut` : `brouillon`, `a-valider` ou `publie`. **Seul `publie` part en production.** Les deux autres sont visibles dans les aperçus (branches) et en local, avec l'encadré jaune « À valider ».
- `aValider` : les points à trancher, affichés dans l'encadré jaune. Un contenu `publie` n'en a plus.
- `verifieLe` : date de vérification (`AAAA-MM-JJ`), obligatoire pour publier. Une alerte apparaît en aperçu au-delà de six mois.
- `reluPar` : signature (nom, métier), **obligatoire pour publier** une fiche métier ou un guide.
- `sources` : liste `{ "titre", "url", "consulteLe" }`, au moins une pour publier. **Aucun montant de salaire sans source.**

## Validation

`npm run valider:contenu` vérifie tous les fichiers (schémas dans `src/content/schema.ts`, références croisées). Elle est lancée avant chaque compilation : un contenu invalide **arrête le build**, il ne casse pas une page en production.

`npm run test:contenu` teste les règles elles-mêmes (publication, signature, source, échéances, fraîcheur).

## Pages dans le code

```ts
import { lireCollection } from "@/content";
const fiches = lireCollection("fiches-metiers"); // filtrées selon l'environnement
```

Les composants du socle sont montrés sur `/interne/composants` (aperçus uniquement, 404 en production).
