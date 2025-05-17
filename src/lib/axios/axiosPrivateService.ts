import axios from "axios";
import { getDataFromLocalStorage } from "../crypto-js";

const axiosPrivateService = axios.create({
  baseURL: '/api',
  timeout: 10000
})

axiosPrivateService.interceptors.request.use(
  (config) => {
    const token = getDataFromLocalStorage('access_token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

axiosPrivateService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
)

export default axiosPrivateService
