export function NextStepsNotice({
  leadIn = "Votre récapitulatif est prêt.",
  body,
}: {
  leadIn?: string;
  body?: string;
}) {
  return (
    <div className="mt-6 rounded-lg border border-secondary/30 bg-secondary-light p-4 text-sm text-foreground">
      <p className="font-semibold text-secondary-dark">✅ Et maintenant ?</p>
      <p className="mt-1.5 max-w-prose">
        {leadIn}{" "}
        {body ??
          "Pour rendre votre démarche officielle, adressez-vous à la direction régionale de la culture ou à votre mairie. e-Culture CI vous a aidé à préparer ; la validation appartient au ministère."}
      </p>
    </div>
  );
}
