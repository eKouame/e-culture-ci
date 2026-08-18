import { ReactNode } from "react";

export function Stamp({
  children,
  className = "",
  tone = "secondary",
}: {
  children: ReactNode;
  className?: string;
  tone?: "secondary" | "primary";
}) {
  const toneClass =
    tone === "primary" ? "text-primary-dark" : "text-secondary-dark";
  return (
    <span
      className={`stamp shrink-0 gap-1.5 whitespace-nowrap px-4 py-2 text-sm font-bold uppercase tracking-wide ${toneClass} ${className}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M3 8.5L6.5 12L13 4" />
      </svg>
      {children}
    </span>
  );
}
