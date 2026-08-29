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
  const actifsCount = items.filter((i) => i.actif).length;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground">Flash info</h1>
      <p className="mt-1.5 max-w-prose text-sm text-muted">
        Jusqu&apos;à 3 ou 4 flash infos actifs en même temps : ils défilent
        automatiquement dans la bannière, en haut des pages citoyennes.
        Marquez chacun <strong>Interne</strong> (ressources, nouveautés du
        site) ou <strong>Externe</strong> (actualité du secteur) pour que
        les visiteurs distinguent les deux d&apos;un coup d&apos;œil.
      </p>
      {actifsCount > 4 && (
        <p className="mt-2 max-w-prose text-sm font-medium text-primary-dark">
          {actifsCount} flash infos sont actifs en ce moment — au-delà de 4,
          la bannière devient longue à parcourir. Pensez à en désactiver
          quelques-uns.
        </p>
      )}

      <Card className="mt-6">
        <h2 className="text-base font-bold text-foreground">
          Créer un flash info
        </h2>
        <form action={creerFlashInfo} className="mt-3 flex flex-col gap-4">
          <Input name="titre" label="Titre" required maxLength={140} />
          <Input
            name="lien"
            label="Lien (facultatif)"
            placeholder="/ressources/budget ou https://..."
          />
          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-foreground">Type</legend>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="radio"
                  name="type"
                  value="INTERNE"
                  defaultChecked
                  className="h-4 w-4 accent-orange-600"
                />
                Interne (site)
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="radio"
                  name="type"
                  value="EXTERNE"
                  className="h-4 w-4 accent-orange-600"
                />
                Externe (secteur)
              </label>
            </div>
          </fieldset>
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
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={item.actif ? "success" : "neutral"}>
                  {item.actif ? "Actif" : "Inactif"}
                </Badge>
                <Badge tone={item.type === "EXTERNE" ? "warning" : "neutral"}>
                  {item.type === "EXTERNE" ? "Externe" : "Interne"}
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
