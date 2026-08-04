import { INDEPENDENCE_DISCLAIMER } from "@/lib/disclaimer";

export function DisclaimerBar() {
  return (
    <div className="no-print border-b border-border bg-black/[0.03] px-4 py-2 text-center text-xs text-muted sm:px-6">
      <span className="mx-auto inline-block max-w-3xl">
        ℹ️ {INDEPENDENCE_DISCLAIMER}
      </span>
    </div>
  );
}
