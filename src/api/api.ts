import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import userStorage from '../helper/localStorage';

export interface Response<T> {
  data: T;
  error: AxiosError | null;
  status: number | null;
}

export async function api(config: AxiosRequestConfig) {
  const result: Response<any> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const response = await axios(config);
    result.data = response.data;
    result.status = response.status;
  } catch (err) {
    result.error = err as AxiosError;
  }
  return result;
}

export async function apiWithToken(config: AxiosRequestConfig) {
  const result: Response<any> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const response = await axios({
      ...config,
      headers: {
        Authorization: `Bearer ${userStorage.getToken()}`,
      },
    });
    result.data = response.data;
    result.status = response.status;
  } catch (err) {
    result.error = err as AxiosError;
  }
  return result;
}
