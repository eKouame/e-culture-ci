# Déploiement — e-Culture CI

Ce guide déploie l'application sur **Vercel** (hébergement de l'app Next.js)
avec **Neon** (base de données Postgres gérée, offre gratuite). Les comptes
doivent être créés par vous-même — personne d'autre ne peut le faire à votre
place.

## 1. Créer la base de données (Neon)

1. Allez sur [neon.tech](https://neon.tech) et créez un compte (gratuit).
2. Créez un nouveau projet, par exemple nommé `e-culture-ci`.
3. Dans l'onglet **Connect** du projet, copiez la **Connection string** en
   mode **Pooled connection** (elle ressemble à
   `postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/dbname?sslmode=require`).
4. Collez cette valeur dans `.env` à la racine du projet, dans la variable
   `DATABASE_URL`.

## 2. Initialiser la base localement

Une fois `DATABASE_URL` renseigné dans `.env` :

```bash
npx prisma migrate deploy
npx prisma db seed
```

Cela crée toutes les tables et un compte admin de démonstration. Vous pouvez
ensuite vérifier avec `npm run dev` que tout fonctionne en local, connecté à
la vraie base Neon.

## 3. Créer un compte GitHub et un dépôt

1. Créez un compte sur [github.com](https://github.com) si vous n'en avez pas.
2. Créez un nouveau dépôt **vide** (sans README ni .gitignore), par exemple
   nommé `e-culture-ci`.
3. Une fois le dépôt créé, GitHub vous donne une URL du type
   `https://github.com/votre-compte/e-culture-ci.git` — gardez-la sous la main.
4. Revenez ici et donnez-moi cette URL : je préparerai le commit local et
   pousserai le code sur ce dépôt (avec votre confirmation avant le push).

## 4. Déployer sur Vercel

1. Créez un compte sur [vercel.com](https://vercel.com) (vous pouvez vous
   inscrire directement avec votre compte GitHub).
2. Cliquez sur **Add New → Project**, puis sélectionnez le dépôt
   `e-culture-ci` que vous venez de pousser sur GitHub.
3. Vercel détecte automatiquement Next.js — laissez les réglages de build par
   défaut (`npm run build` est déjà configuré dans `package.json` pour lancer
   les migrations Prisma automatiquement à chaque déploiement).
4. Avant de cliquer sur **Deploy**, ouvrez la section **Environment
   Variables** et ajoutez :
   - `DATABASE_URL` → la même valeur que dans votre `.env` local (la
     connection string Neon)
   - `ADMIN_SEED_EMAIL` → email du compte admin (optionnel, une valeur par
     défaut existe)
   - `ADMIN_SEED_PASSWORD` → mot de passe admin (recommandé : changez la
     valeur par défaut pour la production)
5. Cliquez sur **Deploy**. Au premier déploiement, les tables sont créées
   automatiquement (`prisma migrate deploy` fait partie du build).
6. Une fois déployé, exécutez le seed **une seule fois** contre la base de
   production pour créer le compte admin (depuis votre machine, avec
   `DATABASE_URL` pointant vers Neon) :
   ```bash
   npx prisma db seed
   ```

## 5. Domaine personnalisé (facultatif)

Dans les réglages du projet Vercel (**Settings → Domains**), vous pouvez
attacher un nom de domaine que vous possédez déjà, ou utiliser le sous-domaine
`*.vercel.app` fourni gratuitement pour commencer.

## Ce qui se passe automatiquement à chaque déploiement

Le script `build` (`package.json`) exécute, dans l'ordre :

```
prisma generate && prisma migrate deploy && next build
```

Donc chaque nouveau `git push` sur la branche connectée à Vercel régénère le
client Prisma, applique les migrations manquantes sur la base Neon, puis
construit l'application. Aucune action manuelle n'est nécessaire après la
mise en place initiale.
