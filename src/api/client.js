import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.favorit-parts.ru/hs/hsprice',
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/octet-stream',
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    const message = response.data?.error;
    if (typeof message === 'string' && message.trim()) {
      return Promise.reject(new Error(message));
    }
    return response;
  },
  (error) => {
    const apiMessage = error.response?.data?.error;

    if (typeof apiMessage === 'string' && apiMessage.trim()) {
      error.message = apiMessage;
    }

    return Promise.reject(error);
  },
);
