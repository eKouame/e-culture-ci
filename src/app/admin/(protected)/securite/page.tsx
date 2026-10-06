import type { Metadata } from "next";
import { requireAdminOrRedirect } from "@/lib/auth";
import { etatTotp } from "@/lib/totp-admin";
import { SecuriteForm } from "./SecuriteForm";

export const metadata: Metadata = {
  title: "Sécurité — Espace admin | e-Culture CI",
};

export default async function SecuritePage() {
  const admin = await requireAdminOrRedirect();
  const etat = await etatTotp(admin.id);

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-extrabold text-foreground">Sécurité</h1>
      <p className="mt-2 text-sm text-muted">
        La double vérification ajoute, après votre mot de passe, un code à six chiffres
        qui change toutes les 30 secondes, généré par une application sur votre téléphone.
      </p>

      {etat.migree ? (
        <SecuriteForm active={etat.active} />
      ) : (
        <p className="mt-6 rounded-xl border border-border bg-background px-5 py-4 text-sm text-foreground">
          La base de données n&apos;est pas encore à jour : la double vérification sera
          disponible une fois la migration appliquée.
        </p>
      )}
    </div>
  );
}
