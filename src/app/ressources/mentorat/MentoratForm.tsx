"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mentoratSchema, MentoratInput } from "@/lib/validation/mentorat.schema";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
      setSubmitError("Une erreur est survenue. Réessaie dans un instant.");
      return;
    }

    const json = await res.json();
    setResult({ numero: json.numero });
  }

  if (result) {
    return (
      <Card className="border-secondary/30 bg-secondary-light">
        <span className="text-2xl">🤝</span>
        <h2 className="mt-2 text-lg font-bold text-secondary-dark">
          Ta demande a bien été enregistrée
        </h2>
        <p className="mt-1.5 text-sm text-foreground">
          Référence de ta demande : <strong>{result.numero}</strong>. Un
          professionnel licencié pourra te contacter prochainement pour
          organiser ton parrainage (5 spectacles supervisés).
        </p>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          placeholder="Sélectionne ta région"
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
        label="Type de spectacle qui t'intéresse"
        placeholder="Choisissez un type"
        options={typeSpectacleOptions}
        error={errors.typeSpectacleInteret?.message}
        {...register("typeSpectacleInteret")}
      />
      <Textarea
        label="Ton profil actuel"
        hint="Ton expérience, les événements déjà organisés, ton niveau de départ..."
        error={errors.profilActuel?.message}
        {...register("profilActuel")}
      />
      <Textarea
        label="Disponibilité (facultatif)"
        hint="À partir de quand pourrais-tu commencer à être accompagné(e) ?"
        error={errors.disponibilite?.message}
        {...register("disponibilite")}
      />
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande de mentorat"}
      </Button>
      {submitError && (
        <p className="text-sm font-medium text-danger">{submitError}</p>
      )}
    </form>
  );
}
