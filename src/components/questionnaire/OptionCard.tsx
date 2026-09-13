export function OptionCard({
  label,
  description,
  onClick,
  selected = false,
}: {
  label: string;
  description?: string;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
        selected
          ? "border-primary bg-primary-light"
          : "border-border bg-surface hover:border-primary hover:bg-primary-light"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 ${
          selected ? "border-[6px] border-primary" : "border-border"
        }`}
      />
      <span className="flex flex-col gap-1">
        <span className="text-base font-semibold text-foreground">{label}</span>
        {description && <span className="text-sm text-muted">{description}</span>}
      </span>
    </button>
  );
}
