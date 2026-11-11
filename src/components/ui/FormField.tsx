type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "textarea";
  placeholder?: string;
  rows?: number;
  required?: boolean;
  value?: string;
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

const inputClasses =
  "field-input w-full rounded-xl border bg-surface px-4 py-3 text-foreground outline-none transition-all duration-300 focus:border-accent/50";

export default function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  rows = 4,
  required = false,
  value,
  error,
  onChange,
  onBlur,
}: FormFieldProps) {
  const borderClass = error ? "border-red-500/70" : "border-border";

  return (
    <div className={type === "textarea" ? "flex flex-1 flex-col" : undefined}>
      <label htmlFor={id} className="mb-2 block text-sm text-muted">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${inputClasses} ${borderClass} flex-1 resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${inputClasses} ${borderClass}`}
          placeholder={placeholder}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
