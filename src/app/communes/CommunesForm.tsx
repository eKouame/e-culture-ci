"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { communeSchema, CommuneInput } from "@/lib/validation/commune.schema";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function CommunesForm() {
  const [result, setResult] = useState<{ numero: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CommuneInput>({
    resolver: zodResolver(communeSchema),
    defaultValues: { consentement: false },
  });

  async function onSubmit(data: CommuneInput) {
    setSubmitError(null);
    const res = await fetch("/api/communes", {
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
      <div className="rounded-xl border border-[#1B5E4A]/30 bg-[#1B5E4A]/5 p-6">
        <span className="text-2xl">✅</span>
        <h3 className="mt-2 text-lg font-bold text-[#1B5E4A]">
          Votre demande a bien été enregistrée
        </h3>
        <p className="mt-1.5 text-sm text-[#1c1917]">
          Référence : <strong>{result.numero}</strong>. Nous revenons vers
          vous prochainement pour convenir d&apos;un échange.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Nom complet"
        error={errors.nom?.message}
        {...register("nom")}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Fonction"
          hint="Maire, secrétaire général, responsable culturel..."
          error={errors.fonction?.message}
          {...register("fonction")}
        />
        <Input
          label="Commune"
          error={errors.commune?.message}
          {...register("commune")}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Téléphone (facultatif)"
          type="tel"
          error={errors.telephone?.message}
          {...register("telephone")}
        />
      </div>
      <Textarea
        label="Message (facultatif)"
        hint="Vos règles locales, votre contexte, vos questions..."
        error={errors.message?.message}
        {...register("message")}
      />

      {/* Honeypot anti-spam — champ invisible pour un utilisateur humain */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Laisser ce champ vide</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-[#1c1917]">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-[#1B5E4A]"
          {...register("consentement")}
        />
        <span>
          J&apos;accepte que ces informations soient utilisées par Service
          Monde pour me recontacter au sujet d&apos;e-Culture CI. Voir la{" "}
          <a href="/confidentialite" className="underline hover:text-[#1B5E4A]">
            politique de confidentialité
          </a>
          .
        </span>
      </label>
      {errors.consentement && (
        <p className="text-xs font-medium text-red-700">
          {errors.consentement.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center rounded-lg bg-[#1B5E4A] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#154639] disabled:opacity-50"
      >
        {isSubmitting ? "Envoi en cours…" : "Demander une démonstration"}
      </button>
      {submitError && (
        <p className="text-sm font-medium text-red-700">{submitError}</p>
      )}
    </form>
  );
}
