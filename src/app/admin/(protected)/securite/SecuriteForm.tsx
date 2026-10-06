"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Preparation = { secret: string; uri: string };
type Reponse = { error?: string; secret?: string; uri?: string };

async function appeler(url: string, corps?: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: corps ? JSON.stringify(corps) : undefined,
  });
  const json: Reponse = await res.json().catch(() => ({}));
  return { ok: res.ok, json };
}

export function SecuriteForm({ active }: { active: boolean }) {
  const router = useRouter();
  const [preparation, setPreparation] = useState<Preparation | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [occupe, setOccupe] = useState(false);

  async function agir(url: string, corps?: unknown, succes?: (j: Reponse) => void) {
    setOccupe(true);
    setErreur(null);
    setMessage(null);
    const r = await appeler(url, corps);
    setOccupe(false);
    if (!r.ok) {
      setErreur(r.json.error ?? "Une erreur est survenue.");
      return;
    }
    succes?.(r.json);
  }

  if (active) {
    return (
      <div className="mt-6 flex flex-col gap-4">
        <p className="rounded-xl bg-secondary px-5 py-4 text-sm font-semibold text-on-deep">
          La double vérification est activée.
        </p>
        <Input
          label="Pour la désactiver, saisissez un code actuel"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div>
          <Button
            type="button"
            variant="outline"
            disabled={occupe}
            onClick={() =>
              agir("/api/auth/totp/disable", { code }, () => {
                setCode("");
                router.refresh();
              })
            }
          >
            Désactiver la double vérification
          </Button>
        </div>
        {erreur && <p className="text-sm font-medium text-danger">{erreur}</p>}
      </div>
    );
  }

  if (!preparation) {
    return (
      <div className="mt-6 flex flex-col gap-4">
        <p className="text-sm text-foreground">
          La double vérification n&apos;est pas activée.
        </p>
        <div>
          <Button
            type="button"
            disabled={occupe}
            onClick={() =>
              agir("/api/auth/totp/setup", undefined, (j) => {
                if (j.secret && j.uri) setPreparation({ secret: j.secret, uri: j.uri });
              })
            }
          >
            Activer la double vérification
          </Button>
        </div>
        {erreur && <p className="text-sm font-medium text-danger">{erreur}</p>}
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <p className="text-sm leading-relaxed text-foreground">
        1. Dans votre application d&apos;authentification (Google Authenticator, Authy,
        2FAS…), ajoutez un compte avec cette clé :
      </p>
      <p className="break-all rounded-lg border border-border bg-background px-4 py-3 font-mono text-base font-bold tracking-wider text-foreground">
        {preparation.secret}
      </p>
      <p className="text-xs text-muted">
        Ou ouvrez ce lien depuis votre téléphone :{" "}
        <a href={preparation.uri} className="underline">
          ajouter à l&apos;application
        </a>
        . Gardez cette clé en lieu sûr : sans elle ni votre téléphone, vous ne pourrez
        plus vous connecter.
      </p>
      <Input
        label="2. Saisissez le code à six chiffres affiché"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div>
        <Button
          type="button"
          disabled={occupe}
          onClick={() =>
            agir("/api/auth/totp/confirm", { code }, () => {
              setPreparation(null);
              setCode("");
              setMessage("Double vérification activée.");
              router.refresh();
            })
          }
        >
          Confirmer et activer
        </Button>
      </div>
      {erreur && <p className="text-sm font-medium text-danger">{erreur}</p>}
      {message && <p className="text-sm font-medium text-secondary-dark">{message}</p>}
    </div>
  );
}
