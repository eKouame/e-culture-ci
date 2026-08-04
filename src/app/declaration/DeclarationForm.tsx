"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  declarationSchema,
  DeclarationInput,
} from "@/lib/validation/declaration.schema";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { REGIONS_CI } from "@/lib/regions";
import { TYPE_SPECTACLE_LABELS } from "@/lib/labels";

const typeSpectacleOptions = Object.entries(TYPE_SPECTACLE_LABELS).map(
  ([value, label]) => ({ value, label }),
);
const regionOptions = REGIONS_CI.map((r) => ({ value: r, label: r }));

export function DeclarationForm({
  defaultJauge,
  defaultOrientation,
}: {
  defaultJauge?: number;
  defaultOrientation?: "EXEMPTE" | "PROFESSIONNEL";
}) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(declarationSchema),
    defaultValues: {
      entreePayante: false,
      jaugeEstimee: defaultJauge,
      statutOrientation: defaultOrientation,
    },
  });

  const typeSpectacle = watch("typeSpectacle");

  async function onSubmit(data: DeclarationInput) {
    setSubmitError(null);
    const res = await fetch("/api/declarations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
      return;
    }

    const json = await res.json();
    router.push(`/declaration/recepisse/${json.id}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
        Organisateur
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Nom"
          error={errors.organisateurNom?.message}
          {...register("organisateurNom")}
        />
        <Input
          label="Prénom (facultatif)"
          error={errors.organisateurPrenom?.message}
          {...register("organisateurPrenom")}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Téléphone"
          type="tel"
          error={errors.organisateurTelephone?.message}
          {...register("organisateurTelephone")}
        />
        <Input
          label="Email (facultatif)"
          type="email"
          error={errors.organisateurEmail?.message}
          {...register("organisateurEmail")}
        />
      </div>
      <Input
        label="Structure / association (facultatif)"
        error={errors.organisateurStructure?.message}
        {...register("organisateurStructure")}
      />

      <h2 className="mt-2 text-sm font-bold uppercase tracking-wide text-muted">
        Événement
      </h2>
      <Input
        label="Titre de l'événement (facultatif)"
        error={errors.titreEvenement?.message}
        {...register("titreEvenement")}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Type de spectacle"
          placeholder="Choisissez un type"
          options={typeSpectacleOptions}
          error={errors.typeSpectacle?.message}
          {...register("typeSpectacle")}
        />
        <Input
          label="Date de l'événement"
          type="date"
          error={errors.dateEvenement?.message}
          {...register("dateEvenement")}
        />
      </div>
      {typeSpectacle === "AUTRE" && (
        <Input
          label="Précisez le type de spectacle"
          error={errors.typeSpectacleAutre?.message}
          {...register("typeSpectacleAutre")}
        />
      )}
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
      <Input
        label="Lieu précis (salle, place, quartier...)"
        error={errors.lieu?.message}
        {...register("lieu")}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Jauge estimée (nombre de spectateurs)"
          type="number"
          min={1}
          error={errors.jaugeEstimee?.message}
          {...register("jaugeEstimee", {
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
        />
        <label className="flex items-center gap-2.5 self-end rounded-lg border border-border px-3.5 py-2.5">
          <input
            type="checkbox"
            className="h-4 w-4 accent-orange-600"
            {...register("entreePayante")}
          />
          <span className="text-sm font-medium text-foreground">
            Entrée payante
          </span>
        </label>
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? "Envoi en cours…" : "Préparer ma déclaration"}
      </Button>
      {submitError && (
        <p className="text-sm font-medium text-danger">{submitError}</p>
      )}
    </form>
  );
}
