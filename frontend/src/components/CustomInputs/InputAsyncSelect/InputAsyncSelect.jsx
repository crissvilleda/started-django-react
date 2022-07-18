import { useController } from "react-hook-form";
import AsyncSelect from "react-select/async";
import _ from "lodash";
import { customStylesReactSelect } from "../InputSelect/InputSelect";

export default function InputAsyncSelect({
  name,
  control,
  rules,
  placeholder,
  disabled,
  isClearable,
  isMulti,
  isSearchable,
  loadOptions = () => {},
  labelKey = "label",
  valueKey = "value",
  labelKey2 = undefined,
}) {
  const {
    field: { onChange, value },
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
  });

  return (
    <>
      <div className="flex flex-col">
        <AsyncSelect
          styles={customStylesReactSelect}
          isClearable={isClearable}
          cacheOptions
          classNamePrefix="async-select"
          className={`react-select-container ${invalid && "is-invalid"}`}
          backspaceRemovesValue={false}
          isSearchable={isSearchable || false}
          defaultOptions
          isMulti={isMulti || false}
          loadOptions={loadOptions}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e ? e : null);
          }}
          getOptionValue={(option) => option[valueKey]}
          getOptionLabel={(option) =>
            `${option[labelKey]} ${option[labelKey2] || ""}`
          }
          value={value}
          isDisabled={disabled}
        />
        {error && error.message && (
          <div className="text-red-600 text-sm mt-1">{error.message}</div>
        )}
      </div>
    </>
  );
}
