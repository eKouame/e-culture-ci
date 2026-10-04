import type { Metadata } from "next";

export const SITE_HOST = "e-culture.ci";
export const SITE_URL = `https://${SITE_HOST}`;
export const SITE_NAME = "e-Culture CI";

/**
 * A page's own title/description must also be mirrored into openGraph/twitter —
 * Next.js does not derive those from the top-level fields, so a page missing this
 * silently inherits the root layout's (wrong) sharing card.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    // Résolu contre metadataBase : https://e-culture.ci/<path>
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "fr_CI",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
