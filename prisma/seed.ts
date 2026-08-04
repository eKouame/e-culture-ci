import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL manquant. Définissez-le dans .env avant de seed.");
}

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const YEAR = new Date().getFullYear();

async function main() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? "admin@culture.gouv.ci";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "ChangeMoi123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      nom: "Administrateur — Autorité locale (Mairie, Préfecture)",
    },
  });

  const declarationsData = [
    {
      numero: `DEC-${YEAR}-000001`,
      organisateurNom: "Koffi",
      organisateurPrenom: "Aya",
      organisateurTelephone: "0102030405",
      organisateurStructure: "Collectif Culturel de la Nawa",
      typeSpectacle: "FESTIVAL" as const,
      titreEvenement: "Festival de la Nawa",
      dateEvenement: new Date(`${YEAR}-11-15`),
      lieu: "Place publique de Soubré",
      commune: "Soubré",
      region: "Nawa",
      jaugeEstimee: 1200,
      entreePayante: false,
      statutOrientation: "EXEMPTE" as const,
    },
    {
      numero: `DEC-${YEAR}-000002`,
      organisateurNom: "Traoré",
      organisateurPrenom: "Ibrahim",
      organisateurTelephone: "0506070809",
      organisateurStructure: "Association des Jeunes de Diaké",
      typeSpectacle: "CEREMONIE_TRADITIONNELLE" as const,
      titreEvenement: "Festival de Diaké",
      dateEvenement: new Date(`${YEAR}-12-20`),
      lieu: "Esplanade de Diaké",
      commune: "Béoumi",
      region: "Gbêkê",
      jaugeEstimee: 600,
      entreePayante: false,
      statutOrientation: "EXEMPTE" as const,
    },
    {
      numero: `DEC-${YEAR}-000003`,
      organisateurNom: "Bamba",
      organisateurPrenom: "Fatoumata",
      organisateurTelephone: "0708091011",
      typeSpectacle: "CONCERT" as const,
      titreEvenement: "Soirée culturelle de fin d'année",
      dateEvenement: new Date(`${YEAR}-12-30`),
      lieu: "Foyer des jeunes",
      commune: "Korhogo",
      region: "Poro",
      jaugeEstimee: 300,
      entreePayante: true,
      statutOrientation: "EXEMPTE" as const,
    },
  ];

  for (const data of declarationsData) {
    await prisma.declaration.upsert({
      where: { numero: data.numero },
      update: {},
      create: data,
    });
  }

  const immatriculationsData = [
    {
      numero: `IMM-${YEAR}-000001`,
      typeDemandeur: "Association",
      nomComplet: "Yao Kouassi Marcel",
      raisonSociale: "Collectif des Arts de San-Pédro",
      telephone: "0102030406",
      adresse: "Quartier Bardo, non loin du marché",
      commune: "San-Pédro",
      region: "San-Pédro",
      typeActivite: "REGULIER" as const,
      domainesActivite: "Musique / Concert, Danse",
      anneeDebutActivite: 2019,
    },
    {
      numero: `IMM-${YEAR}-000002`,
      typeDemandeur: "Individuel",
      nomComplet: "Coulibaly Aminata",
      telephone: "0708091012",
      adresse: "Secteur 3",
      commune: "Man",
      region: "Tonkpi",
      typeActivite: "OCCASIONNEL" as const,
      domainesActivite: "Humour, Théâtre",
      anneeDebutActivite: 2023,
    },
  ];

  for (const data of immatriculationsData) {
    await prisma.immatriculation.upsert({
      where: { numero: data.numero },
      update: {},
      create: data,
    });
  }

  const mentoratData = [
    {
      numero: `MEN-${YEAR}-000001`,
      nomComplet: "Ouattara Salif",
      telephone: "0102030407",
      commune: "Korhogo",
      region: "Poro",
      profilActuel:
        "J'ai organisé 2 petites soirées musicales dans mon quartier, je voudrais me professionnaliser.",
      typeSpectacleInteret: "CONCERT" as const,
      disponibilite: "Disponible dès le mois prochain",
    },
    {
      numero: `MEN-${YEAR}-000002`,
      nomComplet: "N'Guessan Affoué",
      telephone: "0506070810",
      commune: "Bouaké",
      region: "Gbêkê",
      profilActuel:
        "Je débute dans l'organisation de festivals communautaires et je cherche un accompagnement.",
      typeSpectacleInteret: "FESTIVAL" as const,
    },
  ];

  for (const data of mentoratData) {
    await prisma.mentoratDemande.upsert({
      where: { numero: data.numero },
      update: {},
      create: data,
    });
  }

  await prisma.counter.upsert({
    where: { key: `DEC-${YEAR}` },
    update: { value: declarationsData.length },
    create: { key: `DEC-${YEAR}`, value: declarationsData.length },
  });
  await prisma.counter.upsert({
    where: { key: `IMM-${YEAR}` },
    update: { value: immatriculationsData.length },
    create: { key: `IMM-${YEAR}`, value: immatriculationsData.length },
  });
  await prisma.counter.upsert({
    where: { key: `MEN-${YEAR}` },
    update: { value: mentoratData.length },
    create: { key: `MEN-${YEAR}`, value: mentoratData.length },
  });

  console.log("Seed terminé.");
  console.log(`Admin : ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
