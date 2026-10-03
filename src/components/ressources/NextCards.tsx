import Link from "next/link";

export function NextCards({
  liens,
}: {
  liens: { href: string; label: string; description: string }[];
}) {
  return (
    <div className="mt-12 border-t border-border pt-8">
      <h2 className="text-lg font-bold text-secondary-dark">Et après ?</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {liens.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl border border-border border-l-4 border-l-primary bg-surface p-4 transition-transform hover:-translate-y-0.5"
          >
            <p className="font-bold text-foreground">{l.label}</p>
            <p className="mt-1 text-sm text-muted">{l.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
