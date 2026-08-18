"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mentoratSchema, MentoratInput } from "@/lib/validation/mentorat.schema";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { NextStepsNotice } from "@/components/ui/NextStepsNotice";
import { Stamp } from "@/components/ui/Stamp";
import { REGIONS_CI } from "@/lib/regions";
import { TYPE_SPECTACLE_LABELS } from "@/lib/labels";

const typeSpectacleOptions = Object.entries(TYPE_SPECTACLE_LABELS).map(
  ([value, label]) => ({ value, label }),
);
const regionOptions = REGIONS_CI.map((r) => ({ value: r, label: r }));

export function MentoratForm() {
  const [result, setResult] = useState<{ numero: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MentoratInput>({
    resolver: zodResolver(mentoratSchema),
  });

  async function onSubmit(data: MentoratInput) {
    setSubmitError(null);
    const res = await fetch("/api/mentorat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
      return;
    }

    const json = await res.json();
    setResult({ numero: json.numero });
  }

  if (result) {
    return (
      <div>
        <Card dogEar className="ledger-lines border-secondary/30 bg-secondary-light">
          <Stamp>Enregistrée</Stamp>
          <h2 className="mt-3 text-lg font-bold text-secondary-dark">
            Votre demande a bien été enregistrée
          </h2>
          <p className="mt-1.5 max-w-prose text-sm text-foreground">
            Référence de votre demande :{" "}
            <strong className="tabular-ref">{result.numero}</strong>. Un
            professionnel licencié pourra vous contacter prochainement pour
            organiser votre parrainage (5 spectacles supervisés).
          </p>
        </Card>

        <NextStepsNotice
          leadIn="Votre demande de mentorat est enregistrée."
          body="Un professionnel licencié vous contactera pour organiser votre parrainage. e-Culture CI facilite la mise en relation ; il ne s'agit pas d'une démarche officielle auprès du ministère."
        />

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <LinkButton href="/" variant="outline">
            Retour à l&apos;accueil
          </LinkButton>
          <LinkButton href="/ressources" variant="ghost">
            Voir les ressources
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="dog-ear ledger-lines flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
        <Input
          label="Nom complet"
          error={errors.nomComplet?.message}
          {...register("nomComplet")}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Téléphone"
            type="tel"
            error={errors.telephone?.message}
            {...register("telephone")}
          />
          <Input
            label="Email (facultatif)"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Région"
            placeholder="Sélectionnez votre région"
            options={regionOptions}
            error={errors.region?.message}
            {...register("region")}
          />
          <Input
            label="Commune / Localité"
            error={errors.commune?.message}
            {...register("commune")}
          />
        </div>
        <Select
          label="Type de spectacle qui vous intéresse"
          placeholder="Choisissez un type"
          options={typeSpectacleOptions}
          error={errors.typeSpectacleInteret?.message}
          {...register("typeSpectacleInteret")}
        />
        <Textarea
          label="Votre profil actuel"
          hint="Votre expérience, les événements déjà organisés, votre niveau de départ..."
          error={errors.profilActuel?.message}
          {...register("profilActuel")}
        />
        <Textarea
          label="Disponibilité (facultatif)"
          hint="À partir de quand pourriez-vous commencer à être accompagné(e) ?"
          error={errors.disponibilite?.message}
          {...register("disponibilite")}
        />
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande de mentorat"}
      </Button>
      {submitError && (
        <p className="text-sm font-medium text-danger">{submitError}</p>
      )}
    </form>
  );
}
