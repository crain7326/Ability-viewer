import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export interface Response<T> {
  data: T;
  error: null | AxiosError;
}

async function api(config: AxiosRequestConfig, url: string) {
  const result: Response<any> = {
    data: null,
    error: null,
  };

  try {
    const response = await axios({ ...config, url });
    result.data = response.data;
  } catch (err) {
    result.error = err as AxiosError;
  } finally {
    return result;
  }
}

export default api;
