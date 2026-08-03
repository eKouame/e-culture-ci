import { InputHTMLAttributes } from "react";

interface RadioGroupProps {
  label: string;
  error?: string;
  options: { value: string; label: string; description?: string }[];
  registerProps: InputHTMLAttributes<HTMLInputElement>;
}

export function RadioGroup({ label, error, options, registerProps }: RadioGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-0.5 text-sm font-medium text-foreground">{label}</legend>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3.5 has-[:checked]:border-primary has-[:checked]:bg-primary-light"
          >
            <input
              type="radio"
              value={opt.value}
              className="mt-1 h-4 w-4 accent-orange-600"
              {...registerProps}
            />
            <span>
              <span className="block text-sm font-medium text-foreground">
                {opt.label}
              </span>
              {opt.description && (
                <span className="block text-xs text-muted">{opt.description}</span>
              )}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="text-xs font-medium text-danger">{error}</p>}
    </fieldset>
  );
}
