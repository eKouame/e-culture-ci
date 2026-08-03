# e-Culture CI — Guichet Unique de Déclaration et d'Orientation

Plateforme web (Next.js + Prisma/Postgres) pour orienter, déclarer et
immatriculer les acteurs du spectacle vivant en Côte d'Ivoire, en réponse à
la crise de communication autour du décret de 2021.

## Modules

1. **Suis-je concerné ?** (`/suis-je-concerne`) — questionnaire d'orientation
2. **Déclaration Express** (`/declaration`) — déclaration gratuite + récépissé imprimable
3. **Immatriculation** (`/immatriculation`) — enregistrement au registre du ministère
4. **Centre de Ressources** (`/ressources`) — FAQ, vulgarisation juridique, mentorat/parrainage
5. **Espace ministère** (`/admin`) — back-office : consultation, filtres, export CSV

## Démarrage local

Prérequis : une base Postgres accessible (voir [DEPLOY.md](DEPLOY.md) pour
créer une base Neon gratuite en quelques minutes).

```bash
npm install
# renseignez DATABASE_URL dans .env (connexion Postgres)
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

La commande de seed crée un compte admin et quelques données de démonstration
(déclarations, immatriculations, demandes de mentorat). Les identifiants
sont affichés dans la console à la fin du seed (par défaut
`admin@culture.gouv.ci` / `ChangeMoi123!`, personnalisables via les variables
d'environnement `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`).

Connexion espace ministère : [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Déploiement en production

Voir [DEPLOY.md](DEPLOY.md) pour le guide complet pas-à-pas (Neon + GitHub + Vercel).

## Stack technique

- Next.js (App Router, TypeScript) + Tailwind CSS
- Prisma + Postgres (Neon, adaptateur `@prisma/adapter-neon`)
- react-hook-form + zod pour les formulaires
- Authentification admin minimale par cookie de session (pas de fournisseur externe)
- Récépissés / confirmations générés en pages HTML imprimables (`window.print()`)

## Autres commandes utiles

```bash
npx prisma studio   # explorer la base de données
npm run build        # build de production (génère le client, applique les migrations, build Next.js)
npm run lint          # ESLint
```

## Variables d'environnement (`.env`)

| Variable | Description | Défaut |
|---|---|---|
| `DATABASE_URL` | Connexion Postgres (Neon) | — (obligatoire) |
| `ADMIN_SEED_EMAIL` | Email admin créé par le seed | `admin@culture.gouv.ci` |
| `ADMIN_SEED_PASSWORD` | Mot de passe admin créé par le seed | `ChangeMoi123!` |
