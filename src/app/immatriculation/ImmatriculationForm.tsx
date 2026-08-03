"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  immatriculationSchema,
  ImmatriculationInput,
} from "@/lib/validation/immatriculation.schema";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { REGIONS_CI } from "@/lib/regions";
import { DOMAINES_ACTIVITE_OPTIONS, TYPE_DEMANDEUR_OPTIONS } from "@/lib/labels";

const regionOptions = REGIONS_CI.map((r) => ({ value: r, label: r }));

export function ImmatriculationForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ImmatriculationInput>({
    resolver: zodResolver(immatriculationSchema),
    defaultValues: {
      typeDemandeur: "Individuel",
      typeActivite: "OCCASIONNEL",
      domainesActivite: [],
    },
  });

  const typeDemandeur = watch("typeDemandeur");

  async function onSubmit(data: ImmatriculationInput) {
    setSubmitError(null);
    const res = await fetch("/api/immatriculations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
      return;
    }

    const json = await res.json();
    router.push(`/immatriculation/confirmation/${json.id}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <RadioGroup
        label="Vous vous immatriculez en tant que"
        error={errors.typeDemandeur?.message}
        options={TYPE_DEMANDEUR_OPTIONS.map((v) => ({ value: v, label: v }))}
        registerProps={register("typeDemandeur")}
      />

      <h2 className="mt-2 text-sm font-bold uppercase tracking-wide text-muted">
        Identité
      </h2>
      <Input
        label={
          typeDemandeur === "Individuel"
            ? "Nom complet"
            : "Nom complet du responsable"
        }
        error={errors.nomComplet?.message}
        {...register("nomComplet")}
      />
      {typeDemandeur !== "Individuel" && (
        <Input
          label="Nom de la structure / association"
          error={errors.raisonSociale?.message}
          {...register("raisonSociale")}
        />
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Numéro CNI (facultatif)"
          error={errors.numeroCNI?.message}
          {...register("numeroCNI")}
        />
        <Input
          label="Date de naissance (facultatif)"
          type="date"
          error={errors.dateNaissance?.message}
          {...register("dateNaissance")}
        />
      </div>

      <h2 className="mt-2 text-sm font-bold uppercase tracking-wide text-muted">
        Coordonnées
      </h2>
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
      <Input
        label="Adresse"
        error={errors.adresse?.message}
        {...register("adresse")}
      />
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

      <h2 className="mt-2 text-sm font-bold uppercase tracking-wide text-muted">
        Activité
      </h2>
      <RadioGroup
        label="Fréquence de votre activité"
        error={errors.typeActivite?.message}
        options={[
          { value: "OCCASIONNEL", label: "Occasionnelle" },
          { value: "REGULIER", label: "Régulière" },
        ]}
        registerProps={register("typeActivite")}
      />
      <Controller
        control={control}
        name="domainesActivite"
        render={({ field }) => (
          <CheckboxGroup
            label="Domaines d'activité"
            error={errors.domainesActivite?.message}
            options={DOMAINES_ACTIVITE_OPTIONS}
            value={field.value ?? []}
            onChange={field.onChange}
          />
        )}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Année de début d'activité (facultatif)"
          type="number"
          error={errors.anneeDebutActivite?.message}
          {...register("anneeDebutActivite", {
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
        />
      </div>
      <Textarea
        label="Description de votre activité (facultatif)"
        error={errors.descriptionActivite?.message}
        {...register("descriptionActivite")}
      />
      <Textarea
        label="Pièces que vous pouvez fournir (facultatif)"
        hint="Ex : statuts d'association, récépissé de déclaration, pièce d'identité..."
        error={errors.piecesFournies?.message}
        {...register("piecesFournies")}
      />

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? "Envoi en cours…" : "M'immatriculer"}
      </Button>
      {submitError && (
        <p className="text-sm font-medium text-danger">{submitError}</p>
      )}
    </form>
  );
}
