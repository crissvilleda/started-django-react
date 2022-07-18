import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux/loadingSlice";
import api from "api";
import _ from "lodash";

const useUpdate = (name_api, path_module, local_pathname = "") => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const title = id ? "Actualizar" : "Ingresar";
  const update = id ? true : false;

  const getData = async (id) => {
    dispatch(setLoading(true));
    try {
      const data = await api.get(`${name_api}/${id}`);
      setData(data);
    } catch (e) {
      let msj = "No se pudo obtener el registro";
      if (e && e.detail) msj = e.detail;
      else if (_.isArray(e)) msj = e;
      toast.error(msj);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateData = async (body, attachments = []) => {
    dispatch(setLoading(true));
    let res;
    try {
      const endpoint = `${name_api}/${id}`;
      if (attachments.length > 0) {
        const formData = new FormData();
        attachments.forEach((attachment) => {
          formData.append(attachment.name, attachment.file);
        });
        formData.append("data", body);
        res = await api.put(endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: _params,
        });
      } else res = await api.put(endpoint, body);
      toast.success("Registro actualizado exitoso");

      if (path_module) {
        navigate(path_module);
      }
    } catch (e) {
      let message = "Error interno.";
      if (e && e.detail) message = e.detail;
      else if (_.isArray(e)) message = e;
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (id) getData(id);
  }, [id]);

  return { data, title, id, update, updateData, setData };
};

export default useUpdate;
