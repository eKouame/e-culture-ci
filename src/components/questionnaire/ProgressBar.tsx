export function ProgressBar({
  step,
  total,
  label = "Question",
}: {
  step: number;
  total: number;
  label?: string;
}) {
  const current = Math.min(step + 1, total);
  return (
    <div>
      <p className="mb-2.5 text-xs font-medium text-muted">
        {label} {current} / {total}
      </p>
      <div className="flex items-center" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => {
          const done = i < current;
          return (
            <div key={i} className="flex flex-1 items-center last:flex-none">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-colors ${
                  done
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface text-transparent"
                }`}
              >
                {i + 1}
              </span>
              {i < total - 1 && (
                <span
                  className={`mx-1 h-0.5 flex-1 rounded-full transition-colors ${
                    i < current - 1 ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
