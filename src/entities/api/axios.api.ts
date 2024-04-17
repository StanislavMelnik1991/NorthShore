import axios from 'axios';
import { TOKEN_LOCAL_STORAGE_KEY } from '@shared/constants';

export const axiosApi = axios.create({
  baseURL: __API__,
});

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});
