interface CheckboxGroupProps {
  label: string;
  error?: string;
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function CheckboxGroup({
  label,
  error,
  options,
  value,
  onChange,
}: CheckboxGroupProps) {
  function toggle(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-0.5 text-sm font-medium text-foreground">{label}</legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 has-[:checked]:border-primary has-[:checked]:bg-primary-light"
          >
            <input
              type="checkbox"
              className="h-4 w-4 accent-orange-600"
              checked={value.includes(opt)}
              onChange={() => toggle(opt)}
            />
            <span className="text-sm font-medium text-foreground">{opt}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-xs font-medium text-danger">{error}</p>}
    </fieldset>
  );
}
