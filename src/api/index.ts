import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data;
    }
  },
  (err: Error) => {
    return Promise.reject(err);
  },
);

export default instance;
