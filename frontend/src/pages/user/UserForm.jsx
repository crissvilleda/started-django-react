import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import {
  InputDate,
  InputText,
  InputSelect,
} from "../../components/CustomInputs";
import Button from "@mui/material/Button";
import {
  email,
  composeValidators,
  required,
  date,
  password,
} from "../../validations";

export default function UserForm({ onSubmit, initialValues = {}, isUpdating }) {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TitleUnderline title="Datos Personales " />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
        <div>
          <label htmlFor="test" className="label">
            Nombre
          </label>
          <InputText
            className="input"
            control={control}
            name="first_name"
            rules={{ validate: required }}
            placeholder={"Ingrese nombre"}
          />
        </div>

        <div>
          <label htmlFor="test" className="label">
            Apellido
          </label>
          <div className="control">
            <InputText
              className="input"
              control={control}
              name="last_name"
              rules={{ validate: required }}
              placeholder={"Ingrese apellido"}
            />
          </div>
        </div>
        <div>
          <label htmlFor="test" className="label">
            Fecha de Nacimiento
          </label>
          <div className="control">
            <InputDate
              control={control}
              name="birthday"
              rules={{ validate: composeValidators(required, date) }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="test" className="label">
            Genero
          </label>
          <div className="control">
            <InputSelect
              className="input"
              control={control}
              name="gender"
              rules={{ validate: required }}
              placeholder="Seleccione genero"
              options={[
                { value: 1, label: "Hombre" },
                { value: 2, label: "Mujer" },
              ]}
            />
          </div>
        </div>
      </div>
      <br />
      <TitleUnderline title="Datos de Sistema" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
        <div>
          <label htmlFor="test" className="label">
            Nombre de usuario
          </label>
          <div className="control">
            <InputText
              className="input"
              control={control}
              name="username"
              rules={{ validate: required }}
              type="text"
              placeholder="Ingrese nombre de usuario"
            />
          </div>
        </div>
        <div>
          <label htmlFor="test" className="label">
            Correo
          </label>
          <InputText
            className="input"
            control={control}
            name="email"
            rules={{ validate: composeValidators(required, email) }}
            placeholder={"Ingrese Correo"}
            type="email"
          />
        </div>
        <div>
          <label htmlFor="test" className="label">
            Estado del usuario
          </label>
          <div className="control">
            <InputSelect
              className="input"
              control={control}
              name="status"
              rules={{ validate: required }}
              placeholder="Seleccione estado"
              options={[
                { value: 1, label: "Activo" },
                { value: 3, label: "Inactivo" },
              ]}
            />
          </div>
        </div>
        {isUpdating ? (
          <div>
            <label htmlFor="test" className="label">
              Contraseña
            </label>
            <InputText
              className="input"
              control={control}
              name="password"
              rules={{ validate: password }}
              placeholder="Ingrese contraseña"
              type="password"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="test" className="label">
              Contraseña
            </label>
            <InputText
              className="input"
              control={control}
              name="password"
              rules={{ validate: composeValidators(required, password) }}
              placeholder="Ingrese contraseña"
              type="password"
            />
          </div>
        )}
      </div>

      <br />
      <br />
      <div className="grid grid-cols-2">
        <div>
          <Button
            component={RouterLink}
            variant="contained"
            color="secondary"
            to="/user"
          >
            Regresar
          </Button>
        </div>
        <div className="flex justify-end">
          <Button variant="contained" type="submit">
            {isUpdating ? "Actualizar" : "Registrar"}
          </Button>
        </div>
      </div>
      <br />
    </form>
  );
}
