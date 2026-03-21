import axios from "axios";
import { redirectToError } from "./errorRedirect";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (!error.response) return redirectToError("Network error");
    if (status === 401 && !error.config?._skipAuthRedirect) return (window.location.href = "/");
    if (status === 403) return (window.location.href = "/403");
    if (status >= 500) return redirectToError(error?.response?.data?.error ?? "Server error");

    return Promise.reject(error);
  }
);

export default api;
