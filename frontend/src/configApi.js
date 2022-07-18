import axios from "axios";

const jsonInterceptor = [
  (response) => response.data,
  (error) => Promise.reject(error),
];

const configApi = axios.create({
  baseURL: "/api/",
  timeout: 1000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
  validateStatus: function (status) {
    if ([403, 401].includes(status)) window.location.assign("/login");
    return status >= 200 && status < 300; // default
  },
});

configApi.interceptors.response.use(...jsonInterceptor);
configApi.interceptors.request.use((config) => {
  if (config.url[config.url.length - 1] !== "/") {
    config.url += "/";
  }
  return config;
});

export default configApi;
