export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-muted">
        Question {Math.min(step + 1, total)} / {total}
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(Math.min(step, total) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
