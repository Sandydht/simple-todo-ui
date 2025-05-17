import axios from "axios";
import { getErrorMessage } from "./axiosHelper";

const axiosPublicService = axios.create({
  baseURL: '/api',
  timeout: 10000
})

axiosPublicService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    const errorMessage = getErrorMessage(error);
    return Promise.reject(errorMessage);
  }
)

axiosPublicService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = getErrorMessage(error);
    return Promise.reject(errorMessage);
  }
)

export default axiosPublicService
