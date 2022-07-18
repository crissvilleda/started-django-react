import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux/loadingSlice";
import api from "api";
import _ from "lodash";

export const useDelete = (name_api, path_module = undefined) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteData = async (id, getData = undefined) => {
    dispatch(setLoading(true));
    try {
      await api.delete(`${name_api}/${id}`);
      toast.success("Registro eliminado.");
      if (path_module) navigate(path_module);
      if (getData) await getData();
    } catch (e) {
      let msj = "No se pudo eliminar el registro.";
      if (e && e.detail) msj = e.detail;
      else if (_.isArray(e)) msj = e;
      toast.error(msj);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { deleteData };
};

export default useDelete;
