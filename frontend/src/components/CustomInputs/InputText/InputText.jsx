import { useState } from "react";
import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function InputText({
  name,
  control,
  rules,
  className,
  placeholder = "",
  type = "text",
}) {
  const [showPwd, setShowPwd] = useState(false);
  const {
    field: { onChange, value },
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
        {type === "password" ? (
          <TextField
            type={showPwd ? "text" : "password"}
            error={error && error.message ? true : false}
            placeholder={placeholder}
            value={value}
            onChange={(value) => {
              onChange(value);
            }}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPwd(!showPwd)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <TextField
            type={type}
            error={error && error.message ? true : false}
            placeholder={placeholder}
            value={value}
            onChange={(value) => {
              onChange(value);
            }}
            size="small"
          />
        )}

        {error && error.message && (
          <div className="text-red-600 text-sm mt-1">{error.message}</div>
        )}
      </div>
    </>
  );
}
