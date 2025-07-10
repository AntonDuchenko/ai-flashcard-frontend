import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    
    if (error.response?.status === 401) {
      window.location.href = '/sign-in';
    }

    return Promise.reject(error);
  },
);
