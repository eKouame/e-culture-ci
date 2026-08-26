import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  creerFlashInfo,
  activerFlashInfo,
  desactiverFlashInfo,
  supprimerFlashInfo,
} from "./actions";

export const metadata: Metadata = {
  title: "Flash info — Espace admin | e-Culture CI",
};

export default async function AdminFlashInfoPage() {
  const items = await prisma.flashInfo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground">Flash info</h1>
      <p className="mt-1.5 max-w-prose text-sm text-muted">
        Un seul flash info actif à la fois : il s&apos;affiche en bandeau
        discret et fermable en haut de toutes les pages citoyennes.
        L&apos;activation d&apos;un nouvel item désactive automatiquement le
        précédent.
      </p>

      <Card className="mt-6">
        <h2 className="text-base font-bold text-foreground">
          Créer un flash info
        </h2>
        <form action={creerFlashInfo} className="mt-3 flex flex-col gap-4">
          <Input name="titre" label="Titre" required maxLength={140} />
          <Input
            name="lien"
            label="Lien (facultatif)"
            placeholder="/ressources/faq ou https://..."
          />
          <Button type="submit" className="self-start">
            Créer
          </Button>
        </form>
      </Card>

      <div className="mt-8 flex flex-col gap-3">
        {items.length === 0 && (
          <p className="text-sm text-muted">Aucun flash info pour l&apos;instant.</p>
        )}
        {items.map((item) => (
          <Card key={item.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge tone={item.actif ? "success" : "neutral"}>
                  {item.actif ? "Actif" : "Inactif"}
                </Badge>
                <p className="font-medium text-foreground">{item.titre}</p>
              </div>
              {item.lien && (
                <p className="mt-1 text-xs text-muted">Lien : {item.lien}</p>
              )}
              <p className="mt-1 text-xs text-muted">
                Créé le {new Date(item.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              {item.actif ? (
                <form action={desactiverFlashInfo}>
                  <input type="hidden" name="id" value={item.id} />
                  <Button type="submit" variant="outline" size="md">
                    Désactiver
                  </Button>
                </form>
              ) : (
                <form action={activerFlashInfo}>
                  <input type="hidden" name="id" value={item.id} />
                  <Button type="submit" variant="outline" size="md">
                    Activer
                  </Button>
                </form>
              )}
              <form action={supprimerFlashInfo}>
                <input type="hidden" name="id" value={item.id} />
                <Button
                  type="submit"
                  variant="ghost"
                  size="md"
                  className="text-danger hover:bg-red-50"
                >
                  Supprimer
                </Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
