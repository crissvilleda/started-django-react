import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@redux/loadingSlice";
import { setUser } from "@redux/loginSlice";
import api from "api";

export default function useAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);

  const login = (data = {}) => {
    dispatch(setLoading(true));
    api
      .post("user/login", data)
      .then((response) => {
        navigate("/");
        dispatch(setUser(response));
      })
      .catch((response) => {
        let msj = "Credenciales incorrectas, vuelva a intentar";
        if (response && response.detail) msj = response.detail;
        toast.error(msj, "ERROR", 6000);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const getMe = () => {
    return api
      .get("/user/me")
      .then((me) => {
        dispatch(setUser(me));
      })
      .catch(() => {
        navigate("/login");
      })
      .finally(() => {});
  };

  const logOut = () => {
    dispatch(setLoading(true));
    api
      .post("/user/logout")
      .then(() => {
        dispatch(setUser({}));
        navigate("/login");
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const pwdRecovery = (data) => {
    dispatch(setLoading(true));
    return api
      .post("user/password_recovery", data)
      .then(() => {
        toast.success(
          "Te enviamos un enlace para restablecer tu contraseña. Este sólo es válido durante 6 horas."
        );
        navigate("/login");
      })
      .catch((response) => {
        let msj = "Intente de nuevamente.";
        if (response && response.detail) msj = response.detail;
        toast.error(msj, "ERROR", 6000);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return { user, login, getMe, logOut, pwdRecovery };
}
