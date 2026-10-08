// Pictogramme « institution » (mairie, autorités locales) : en-tête, menu, accueil.
export function IconeInstitution({ taille }: { taille: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3L3 8h18z" />
      <path d="M6 11v7M10 11v7M14 11v7M18 11v7" />
      <path d="M3 21h18" />
    </svg>
  );
}
