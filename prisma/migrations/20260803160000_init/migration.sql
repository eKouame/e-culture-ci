-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "StatutOrientation" AS ENUM ('EXEMPTE', 'PROFESSIONNEL');

-- CreateEnum
CREATE TYPE "TypeSpectacle" AS ENUM ('CONCERT', 'THEATRE', 'DANSE', 'HUMOUR', 'FESTIVAL', 'CEREMONIE_TRADITIONNELLE', 'EVENEMENT_SPORTIF_CULTUREL', 'AUTRE');

-- CreateEnum
CREATE TYPE "TypeActivite" AS ENUM ('OCCASIONNEL', 'REGULIER');

-- CreateEnum
CREATE TYPE "StatutDossier" AS ENUM ('RECU', 'EN_EXAMEN', 'VALIDE', 'REJETE');

-- CreateEnum
CREATE TYPE "StatutMentorat" AS ENUM ('EN_ATTENTE', 'JUMELE', 'CLOTURE');

-- CreateTable
CREATE TABLE "Counter" (
    "key" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Declaration" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "organisateurNom" TEXT NOT NULL,
    "organisateurPrenom" TEXT,
    "organisateurTelephone" TEXT NOT NULL,
    "organisateurEmail" TEXT,
    "organisateurStructure" TEXT,
    "typeSpectacle" "TypeSpectacle" NOT NULL,
    "typeSpectacleAutre" TEXT,
    "titreEvenement" TEXT,
    "dateEvenement" TIMESTAMP(3) NOT NULL,
    "lieu" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "jaugeEstimee" INTEGER NOT NULL,
    "entreePayante" BOOLEAN NOT NULL DEFAULT false,
    "statutOrientation" "StatutOrientation",
    "statutDossier" "StatutDossier" NOT NULL DEFAULT 'RECU',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Declaration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Immatriculation" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "typeDemandeur" TEXT NOT NULL,
    "nomComplet" TEXT NOT NULL,
    "raisonSociale" TEXT,
    "numeroCNI" TEXT,
    "dateNaissance" TIMESTAMP(3),
    "telephone" TEXT NOT NULL,
    "email" TEXT,
    "adresse" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "typeActivite" "TypeActivite" NOT NULL,
    "domainesActivite" TEXT NOT NULL,
    "anneeDebutActivite" INTEGER,
    "descriptionActivite" TEXT,
    "piecesFournies" TEXT,
    "statutDossier" "StatutDossier" NOT NULL DEFAULT 'RECU',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Immatriculation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentoratDemande" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "nomComplet" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT,
    "commune" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "profilActuel" TEXT NOT NULL,
    "typeSpectacleInteret" "TypeSpectacle" NOT NULL,
    "disponibilite" TEXT,
    "statutDemande" "StatutMentorat" NOT NULL DEFAULT 'EN_ATTENTE',
    "noteAdmin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentoratDemande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "nom" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL,
    "adminUserId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Declaration_numero_key" ON "Declaration"("numero");

-- CreateIndex
CREATE INDEX "Declaration_dateEvenement_idx" ON "Declaration"("dateEvenement");

-- CreateIndex
CREATE INDEX "Declaration_region_idx" ON "Declaration"("region");

-- CreateIndex
CREATE UNIQUE INDEX "Immatriculation_numero_key" ON "Immatriculation"("numero");

-- CreateIndex
CREATE INDEX "Immatriculation_region_idx" ON "Immatriculation"("region");

-- CreateIndex
CREATE UNIQUE INDEX "MentoratDemande_numero_key" ON "MentoratDemande"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSession_token_key" ON "AdminSession"("token");

-- AddForeignKey
ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

