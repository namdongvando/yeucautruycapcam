import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TOKEN } from 'utils/constants';

const token = localStorage.getItem(TOKEN) ?? sessionStorage.getItem(TOKEN);

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
