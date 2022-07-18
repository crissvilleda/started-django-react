import { useController } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

import _ from "lodash";
import dayjs from "dayjs";

export default function InputDate({ name, control, rules }) {
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={value || null}
            inputFormat="DD/MM/YYYY"
            onChange={onChange}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={error && error.message ? true : false}
                  size="small"
                />
              );
            }}
          />
        </LocalizationProvider>

        {error && error.message && (
          <div className="text-red-600 text-sm mt-1">{error.message}</div>
        )}
      </div>
    </>
  );
}
