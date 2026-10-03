import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PATHS = [
  "",
  "/suis-je-concerne",
  "/declaration",
  "/immatriculation",
  "/ressources",
  "/ressources/faq",
  "/ressources/mentorat",
  "/ressources/propriete-intellectuelle",
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
