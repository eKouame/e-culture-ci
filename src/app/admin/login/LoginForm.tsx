"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation/login.schema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Deuxième étape : le compte a activé la double vérification.
  const [codeRequis, setCodeRequis] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: { email: string; password: string; code?: string }) {
    setSubmitError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const json: { error?: string; codeRequis?: boolean } = await res
        .json()
        .catch(() => ({}));
      if (json.codeRequis) {
        setCodeRequis(true);
        setSubmitError(json.error ?? "Code de vérification requis.");
        return;
      }
      setSubmitError(
        res.status === 429
          ? "Trop de tentatives. Réessayez dans quelques minutes."
          : "Identifiants incorrects.",
      );
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        autoComplete="username"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Mot de passe"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />
      {codeRequis && (
        <Input
          label="Code de vérification (application d'authentification)"
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          {...register("code")}
        />
      )}
      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? "Connexion…" : "Se connecter"}
      </Button>
      {submitError && (
        <p className="text-sm font-medium text-danger">{submitError}</p>
      )}
    </form>
  );
}
