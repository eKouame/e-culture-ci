type Tone = "neutral" | "success" | "warning" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-black/5 text-foreground",
  success: "bg-secondary-light text-secondary-dark",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-danger",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function statutDossierTone(statut: string): Tone {
  switch (statut) {
    case "VALIDE":
      return "success";
    case "REJETE":
      return "danger";
    case "EN_EXAMEN":
      return "warning";
    default:
      return "neutral";
  }
}
