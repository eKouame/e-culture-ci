# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primaire :** organisateurs informels ou occasionnels de spectacles vivants en Côte d'Ivoire (concerts de quartier, cérémonies, festivals communautaires), en particulier dans le « pays profond » (zones rurales / villes de l'intérieur), souvent mal informés de la réglementation issue du décret de 2021 et déstabilisés par des rumeurs de coûts élevés. Consultation très majoritairement mobile, parfois en connexion faible.

**Secondaire :** mairies et responsables communaux (maires, secrétaires généraux, responsables culturels), via le funnel `/communes` porté par Service Monde, cherchant à alléger leur guichet et gagner en visibilité sur les événements de leur territoire.

## Product Purpose

e-Culture CI aide les organisateurs de spectacle vivant à comprendre s'ils sont concernés par la licence prévue à l'article 10 du décret de 2021, à préparer une déclaration ou une demande d'immatriculation, et à s'orienter vers les démarches officielles adéquates. Il vise à désamorcer la panique née d'une communication ministérielle défaillante, et à constituer un canal d'adoption pour les communes comme service culturel de proximité.

Succès actuel (phase pilote), selon l'éditeur : adoption par des communes pilotes, et volume de déclarations citoyennes.

## Positioning

Un outil d'orientation et de préparation strictement indépendant — jamais un service officiel, jamais un document opposable. Il ne délivre aucun récépissé officiel, ne déclare ni n'immatricule au nom de l'utilisateur, et rappelle systématiquement que l'autorité (ministère, mairie) reste seule décisionnaire. Cette distance assumée avec l'officialité est le point de différenciation central et une contrainte légale/réputationnelle, pas un choix cosmétique.

## Operating Context

- Décret de 2021 sur le spectacle vivant en Côte d'Ivoire (article 10) et arrêté n°750 du 14 octobre 2025, mal communiqués par le ministère, à l'origine d'une rumeur de coûts jusqu'à 10 000 000 FCFA pour tous les organisateurs.
- Usage majoritairement mobile, parfois en connexion faible (zones rurales).
- Back-office admin interne (registre « vous » professionnel, distinct du registre public) pour consulter/filtrer/exporter les soumissions : déclarations, immatriculations, demandes de mentorat, demandes de communes.
- Funnel `/communes` isolé du funnel citoyen (route group dédié, aucun chrome partagé), charte visuelle propre (vert #1B5E4A / ocre #B5771F), formulaire de contact stocké en base — pas d'envoi email, aucun service SMTP/API configuré à ce stade.
- Hébergement Vercel + base Postgres Neon ; déploiement continu sur push `master` ; migrations appliquées manuellement (`npm run db:migrate`) avant tout push modifiant le schéma, jamais automatiquement au build (contrainte : verrou consultatif Neon incompatible avec la connexion pooled).

## Capabilities and Constraints

- Modules citoyens : questionnaire d'orientation (exempté / professionnel), préparation de déclaration (génère un récapitulatif imprimable, pas un document officiel), préparation d'immatriculation, centre de ressources (FAQ, mentorat/parrainage Licence B).
- Numérotation lisible par type (`DEC`/`IMM`/`MEN`/`COM`-année-000000) générée via compteur transactionnel (`src/lib/numbering.ts`).
- Authentification admin minimale : un seul rôle, session par cookie, aucun fournisseur externe.
- Pas de service d'envoi d'email configuré : toute notification passe par consultation manuelle de l'espace admin.
- Contrainte de contenu : aucun chiffre non sourcé — toute statistique doit être attribuée (ex. citation datée du directeur juridique du ministère) ou reformulée sans chiffre.

## Brand Commitments

- Nom du produit : « e-Culture CI » (jamais « e-culture-ci » en texte visible, réservé aux URLs).
- Éditeur légal : Élie Kouamé, à titre personnel et indépendant (mentions légales). Le funnel communes est porté sous la marque « Service Monde — cabinet de design territorial ».
- Vouvoiement obligatoire sur l'ensemble du site, sans exception (y compris `/communes`) — confirmé explicitement après un essai de tutoiement qui a été annulé.
- Badge « eC » sur fond orange (#e8590c) pour l'app citoyenne ; badge « SM » sur fond vert (#1B5E4A) pour `/communes`.
- Bannière d'indépendance obligatoire en en-tête et pied de page de chaque page citoyenne (texte figé, voir `src/lib/disclaimer.ts`).

## Evidence on Hand

- One-pager PDF « Pour les communes » (Service Monde), déjà rédigé et repris tel quel comme source du contenu `/communes` (`public/pour-les-mairies-service-monde.pdf`).
- Citation sourcée déjà utilisée : « 70 à 90 % des organisateurs occasionnels sont exemptés de licence » — selon le directeur juridique du ministère de la Culture, le 2 août 2026.
- Aucun témoignage ni logo de commune pilote pour l'instant (prévu en V2 dès qu'une commune pilote existe réellement — ne pas inventer d'ici là).
- Aucune métrique d'usage réelle disponible à ce jour (produit tout juste lancé en pilote).

## Product Principles

1. Ne jamais laisser croire à l'officialité — chaque écran de résultat/confirmation rappelle que l'autorité reste le ministère ou la mairie.
2. Rassurer avant de faire agir — le module d'orientation désamorce la panique avant toute démarche.
3. Préparer, ne jamais remplacer — les documents générés sont des aides de préparation, jamais des documents opposables.
4. Deux registres, jamais mélangés — le funnel citoyen et le funnel communes restent visuellement et éditorialement séparés.
5. Rester vérifiable — aucune statistique sans source, aucune affirmation invérifiable.

## Accessibility & Inclusion

Public cible incluant des utilisateurs en zone rurale/pays profond, souvent sur mobile et parfois en connexion faible : priorité mobile-first, poids de page limité, pas de dépendance à une connexion rapide. Aucune exigence WCAG formelle établie à ce jour.
