import { LinkButton } from "@/components/ui/Button";

// Bloc d'appel vers un outil interactif, placé dans le corps d'une ressource.
export function AppelOutil({
  href,
  titre,
  description,
  bouton,
}: {
  href: string;
  titre: string;
  description: string;
  bouton: string;
}) {
  return (
    <aside className="no-print my-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-secondary/30 bg-secondary-light p-5">
      <div className="max-w-prose">
        <p className="text-lg font-extrabold text-secondary-dark">{titre}</p>
        <p className="mt-1 text-sm text-foreground">{description}</p>
      </div>
      <LinkButton href={href}>{bouton}</LinkButton>
    </aside>
  );
}
