"use client";

import { useEffect } from "react";

// Sur petit écran la barre secondaire défile : on amène l'élément actif dans la zone
// visible, pour que l'on sache toujours où l'on est. Ne défile que la barre elle-même.
export function ActifVisible() {
  useEffect(() => {
    const actif = document.querySelector<HTMLElement>(
      '[data-barre-secondaire] [aria-current="page"]',
    );
    actif?.scrollIntoView({ inline: "center", block: "nearest" });
  }, []);
  return null;
}
