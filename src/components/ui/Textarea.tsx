import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={`w-full rounded-lg border px-3.5 py-2.5 text-base outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary ${
            error ? "border-danger" : "border-border"
          } ${className}`}
          aria-invalid={!!error}
          {...props}
        />
        {hint && !error && <p className="text-xs text-muted">{hint}</p>}
        {error && <p className="text-xs font-medium text-danger">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
