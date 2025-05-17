import axiosPrivateService from "../lib/axios/axiosPrivateService"

export const createTask = (payload: {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_done: boolean;
  label_color: string;
}): Promise<{
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}> => {
  return new Promise((resolve, reject) => {
    axiosPrivateService
      .post('/task/create-task', { ...payload })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}