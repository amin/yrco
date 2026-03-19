import axios from "axios";
import { auth } from "./firebase";
import { redirectToError } from "./errorRedirect";

const api = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL });

api.interceptors.request.use(async (config) => {
  const token = await auth.currentUser?.getIdToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (!error.response) redirectToError("Network error");
    if (status === 401) window.location.href = "/";
    if (status === 403) window.location.href = "/403";
    if (status >= 500) redirectToError(error?.response?.data?.error ?? "Server error");

    return Promise.reject(error);
  }
);

export default api;
