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

export const getTaskList = async (): Promise<{
  status: string;
  data: {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    label_color: string;
    is_done: boolean;
    created_at: string;
    updated_at: string;
  }[];
}> => {
  return new Promise((resolve, reject) => {
    axiosPrivateService
      .get('/task/get-task-list')
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}
