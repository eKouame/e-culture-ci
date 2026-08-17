-- CreateEnum
CREATE TYPE "StatutDemandeCommune" AS ENUM ('NOUVELLE', 'CONTACTEE', 'EN_DISCUSSION', 'PILOTE', 'CLOTUREE');

-- CreateTable
CREATE TABLE "DemandeCommune" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "fonction" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "message" TEXT,
    "consentement" BOOLEAN NOT NULL DEFAULT false,
    "statut" "StatutDemandeCommune" NOT NULL DEFAULT 'NOUVELLE',
    "noteAdmin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DemandeCommune_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DemandeCommune_numero_key" ON "DemandeCommune"("numero");

-- CreateIndex
CREATE INDEX "DemandeCommune_commune_idx" ON "DemandeCommune"("commune");
