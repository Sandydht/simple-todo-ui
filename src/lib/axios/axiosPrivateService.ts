import axios from "axios";
import { getDataFromLocalStorage } from "../crypto-js";
import { getErrorMessage } from "./axiosHelper";

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
    const errorMessage = getErrorMessage(error);
    return Promise.reject(errorMessage);
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

    const errorMessage = getErrorMessage(error);
    return Promise.reject(errorMessage);
  }
)

export default axiosPrivateService
