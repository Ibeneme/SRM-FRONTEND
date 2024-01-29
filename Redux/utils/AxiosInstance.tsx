import axios, { AxiosError } from "axios";
//import { useNavigate } from "react-router-dom";

const AxiosInstance = axios.create();

AxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("srm_access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const handleUnauthorizedError = () => {
  localStorage.removeItem("srm_access_token");
  window.location.reload();
  window.location.href = "/login";
};

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
