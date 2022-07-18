import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux/loadingSlice";
import { useNavigate } from "react-router-dom";
import api from "api";
import _ from "lodash";

const useCreate = (name_api, path_module, initial_params = {}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveData = async (body, attachments = []) => {
    dispatch(setLoading(true));
    let res;
    try {
      const _params = { ...initial_params };
      if (attachments.length > 0) {
        const formData = new FormData();
        attachments.forEach((attachment) => {
          formData.append(attachment.name, attachment.file);
        });
        formData.append("data", body);
        res = await api.post(name_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: _params,
        });
      } else {
        res = await api.post(name_api, body, { params: _params });
      }
      toast.success("Registro exitoso");

      if (path_module) {
        navigate(path_module);
      }
      return res;
    } catch (e) {
      let message = "Error interno.";
      if (e && e.detail) message = e.detail;
      else if (_.isArray(e)) message = e;
      toast.error(message);
    } finally {
      dispatch(setLoading(true));
    }
    return res;
  };

  return { saveData };
};

export default useCreate;
