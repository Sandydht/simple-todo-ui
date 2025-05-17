import axiosPrivateService from "../lib/axios/axiosPrivateService";
import axiosPublicService from "../lib/axios/axiosPublicService";

export const registerAccountService = (payload: { username: string; password: string }): Promise<{
  status: string;
  access_token: string;
}> => {
  return new Promise((resolve, reject) => {
    axiosPublicService
      .post('/authentication/register', { ...payload })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}

export const loginAccountService = (payload: { username: string; password: string }): Promise<{
  status: string;
  access_token: string;
}> => {
  return new Promise((resolve, reject) => {
    axiosPublicService
      .post('/authentication/login', { ...payload })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}

export const logoutAccountService = (): Promise<{
  status: string;
  message: string;
}> => {
  return new Promise((resolve, reject) => {
    axiosPrivateService
      .post('/authentication/logout')
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}

export const gerProfileService = (): Promise<{
  status: string;
  data: {
    id: number;
    username: string;
    image_url: string;
  };
}> => {
  return new Promise((resolve, reject) => {
    axiosPrivateService
      .get('/authentication/profile')
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}