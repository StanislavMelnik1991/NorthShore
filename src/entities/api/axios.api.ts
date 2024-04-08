import axios from "axios";
import { TOKEN_LOCAL_STORAGE_KEY } from "@shared/constants";

export const axiosApi = axios.create({
  baseURL: __API__,
});

axiosApi.interceptors.request.use((config) => {
  if (config.headers) {
    (config.headers["Content-Type"] = "application/json"),
      (config.headers["Accept"] = "application/json"),
      (config.headers.Authorization =
        localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || "");
  }
  return config;
});
