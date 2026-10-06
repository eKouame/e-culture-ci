import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

const PATHS = [
  "",
  "/suis-je-concerne",
  "/parcours/idee",
  "/parcours/evenement",
  "/declaration",
  "/ressources",
  "/ressources/toutes",
  "/ressources/fondamentaux",
  "/ressources/note-intention",
  "/ressources/budget",
  "/outils",
  "/outils/budget",
  "/ressources/payer-artistes",
  "/ressources/candidater-licences",
  "/ressources/propriete-intellectuelle",
  "/ressources/mentorat",
  "/ressources/faq",
  "/communes",
  "/mentions-legales",
  "/confidentialite",
  "/conditions-utilisation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    priority: path === "" ? 1 : 0.7,
  }));
}
