export function ChevronBand() {
  return (
    <div
      aria-hidden="true"
      className="h-2 w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--color-primary) 0 10px, var(--color-primary-dark) 10px 20px)",
      }}
    />
  );
}
