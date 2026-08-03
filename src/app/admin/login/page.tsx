import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion — Espace ministère | e-Culture CI",
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold text-primary">Espace ministère</p>
      <h1 className="mt-1 text-2xl font-extrabold text-foreground">
        Connexion
      </h1>
      <p className="mt-2 text-sm text-muted">
        Réservé aux agents du ministère de la Culture.
      </p>
      <Card className="mt-6">
        <LoginForm />
      </Card>
    </div>
  );
}
