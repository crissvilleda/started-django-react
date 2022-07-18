import { useForm } from "react-hook-form";
import { InputText } from "../../components/CustomInputs";
import LoadMask from "../../components/LoadMask";
import { useSelector } from "react-redux";
import useAccount from "../../hooks/useAccount";

export default function Login() {
  const { handleSubmit, control } = useForm();
  const loading = useSelector((state) => state.loading.loading);
  const { login } = useAccount();

  const onSubmit = (data) => {
    return login(data);
  };

  return (
    <>
      <LoadMask loading={loading}>
        <div className="h-screen flex flex-col items-center justify-center relative">
          <div className=" bg-white border-[#BC7D2A] border-l-4 border-t-2 rounded-lg shadow-xl p-10 border-solid">
            <h2 className="text-center text-2xl text-[#90519B] font-bold">
              Inicio de sesión{" "}
            </h2>
            <br />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-100 sm:max-w-md m-auto mt-2"
            >
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="test"
                  className="text-gray-800 text-sm font-bold mb-1"
                >
                  Usuario
                </label>
                <InputText
                  className="form-input rounded-xl"
                  control={control}
                  name="username"
                  rules={{ required: "Este campo es requerido." }}
                  placeholder={"Nombre de usuario"}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="test"
                  className="text-gray-800 text-sm font-bold mb-1"
                >
                  Contraseña
                </label>
                <InputText
                  className="form-input rounded-xl"
                  control={control}
                  name="password"
                  type="password"
                  rules={{ required: "Este campo es requerido." }}
                  placeholder={"Contraseña"}
                />
              </div>
              <div className="flex justify-center mt-4">
                <button className="btn btn-primary" type="submit">
                  Iniciar sesión
                </button>
              </div>
            </form>
            <br />
            <br />
          </div>
        </div>
      </LoadMask>
    </>
  );
}
