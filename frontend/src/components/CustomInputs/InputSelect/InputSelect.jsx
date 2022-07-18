import { useController } from "react-hook-form";
import Select from "react-select";
import _ from "lodash";

export const customStylesReactSelect = {
  option: (provided, state) => {
    return {
      ...provided,
      fontFamily: 'Roboto',
      color: state.isFocused ? "#FFFFFF" : "61256c",
      padding: "0.5rem",
      backgroundColor: state.isFocused ? "#61256c" : "#fff",
      ":active": {
        backgroundColor: "#340041",
        color: "#fff",
      },
    };
  },
  control: (provided, state) => {
    return {
      ...provided,
      fontFamily: 'Roboto',
      backgroundColor: state.isDisabled ? "#f5f6f7" : "#FFFFFF",
      color: "#000000",
      borderRadius: "0.5rem",
      borderColor: state.isDisabled
        ? "#C2C2C2"
        : state.isFocused
        ? "#61256c"
        : "#C2C2C2",
      boxShadow: "unset",
      borderWidth: state.isFocused ? "0.15rem" : "0.1rem",
      ":active": {
        borderColor: "#61256c",
        color: "#fff",
      },
    };
  },
};

export default function InputSelect({
  name,
  control,
  rules,
  placeholder,
  disabled,
  isClearable,
  isMulti,
  isSearchable,
  options = [],
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

  const _options = [];
  options.forEach((option) => {
    _options.push({
      ...option,
      label: `${option[labelKey]} ${option[labelKey2] || ""}`,
      value: option[valueKey],
    });
  });

  let _value = value;
  if (_value !== null && _value !== undefined) {
    _value = options.find((item) => item.value === value);
  }

  return (
    <>
      <div className="flex flex-col">
        <Select
          isClearable={isClearable}
          className={`react-select-container ${invalid && "is-invalid"}`}
          styles={customStylesReactSelect}
          theme={(theme) => {
            return {
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#61256c",
              },
            };
          }}
          backspaceRemovesValue={false}
          classNamePrefix="react-select"
          isMulti={isMulti}
          isSearchable={isSearchable}
          options={_options}
          placeholder={placeholder}
          onChange={(e) => {
            if (!isMulti) {
              onChange(e ? e[valueKey] : null);
            } else if (_.isArray(e)) {
              onChange(e.map((e) => e.value));
            }
          }}
          value={_value}
          isDisabled={disabled}
        />
        {error && error.message && (
          <div className="text-red-600 text-sm mt-1">{error.message}</div>
        )}
      </div>
    </>
  );
}
