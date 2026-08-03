import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, placeholder, options, id, className = "", ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <select
          ref={ref}
          id={inputId}
          className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-base outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary ${
            error ? "border-danger" : "border-border"
          } ${className}`}
          aria-invalid={!!error}
          defaultValue={props.defaultValue ?? ""}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs font-medium text-danger">{error}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";
