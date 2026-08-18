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
import { ProgressBar } from "@/components/questionnaire/ProgressBar";
import { REGIONS_CI } from "@/lib/regions";
import { DOMAINES_ACTIVITE_OPTIONS, TYPE_DEMANDEUR_OPTIONS } from "@/lib/labels";

const regionOptions = REGIONS_CI.map((r) => ({ value: r, label: r }));

const STEPS: { title: string; fields: (keyof ImmatriculationInput)[] }[] = [
  {
    title: "Identité",
    fields: [
      "typeDemandeur",
      "nomComplet",
      "raisonSociale",
      "numeroCNI",
      "dateNaissance",
    ],
  },
  {
    title: "Coordonnées",
    fields: ["telephone", "email", "adresse", "region", "commune"],
  },
  {
    title: "Activité",
    fields: [
      "typeActivite",
      "domainesActivite",
      "anneeDebutActivite",
      "descriptionActivite",
      "piecesFournies",
    ],
  },
];

export function ImmatriculationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    trigger,
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
  const isLastStep = step === STEPS.length - 1;

  async function goNext() {
    const valid = await trigger(STEPS[step].fields);
    if (valid) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLastStep) {
      await goNext();
      return;
    }
    handleSubmit(onSubmit)();
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
      <ProgressBar step={step} total={STEPS.length} label="Étape" />

      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
          {STEPS[step].title}
        </h2>

        {step === 0 && (
          <>
            <RadioGroup
              label="Vous vous immatriculez en tant que"
              error={errors.typeDemandeur?.message}
              options={TYPE_DEMANDEUR_OPTIONS.map((v) => ({ value: v, label: v }))}
              registerProps={register("typeDemandeur")}
            />
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
          </>
        )}

        {step === 1 && (
          <>
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
          </>
        )}

        {step === 2 && (
          <>
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
              hint="Ex : statuts d'association, récapitulatif de déclaration e-Culture CI, pièce d'identité..."
              error={errors.piecesFournies?.message}
              {...register("piecesFournies")}
            />
          </>
        )}
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        {step > 0 && (
          <Button type="button" variant="outline" size="lg" onClick={goBack}>
            ← Retour
          </Button>
        )}
        <Button
          size="lg"
          disabled={isLastStep && isSubmitting}
          className="sm:ml-auto"
        >
          {isLastStep
            ? isSubmitting
              ? "Envoi en cours…"
              : "Préparer mon dossier"
            : "Continuer →"}
        </Button>
      </div>
      {submitError && (
        <p className="text-sm font-medium text-danger">{submitError}</p>
      )}
    </form>
  );
}
