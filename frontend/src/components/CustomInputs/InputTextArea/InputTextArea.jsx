import { useController } from "react-hook-form";

export default function InputTextArea({
  name,
  control,
  rules,
  className,
  placeholder,
  rows = 3,
}) {
  const {
    field,
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: "",
  });

  return (
    <>
      <div className="flex flex-col">
        <textarea
          rows={rows}
          className={className || ""}
          placeholder={placeholder}
          {...field}
        />
        {error && error.message && (
          <div className="text-red-600 text-sm mt-1">{error.message}</div>
        )}
      </div>
    </>
  );
}
