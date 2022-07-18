import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@redux/loadingSlice";
import { toast } from "react-toastify";
import api from "api";
import _, { isEmpty, isFinite } from "lodash";

const INITIAL_DATA = { results: [], count: 0 };

export const useList = (name_api, initial_params = {}) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const getData = async (page = 1, params = {}) => {
    dispatch(setLoading(true));

    const _params = {};
    for (let [key, value] of Object.entries({
      ...initial_params,
      ...params,
    })) {
      if (!isEmpty(value) || isFinite(value)) {
        _params[key] = value;
      }
    }
    _params.page = page;

    try {
      const _data = await api.get(name_api, { params: _params });
      setData(_data);
      setPage(page);
    } catch (e) {
      let msj = "No se pudo obtener los registros";
      if (e && e.detail) msj = e.detail;
      else if (_.isArray(e)) msj = e;
      toast.error(msj);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getData(1, initial_params);
  }, []);

  return { data, page, getData };
};

export default useList;
