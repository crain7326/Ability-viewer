import axios, { AxiosRequestConfig } from 'axios';

async function api(config: AxiosRequestConfig, url: string) {
  const result: {
    data: any;
    error: boolean;
  } = {
    data: null,
    error: false,
  };

  try {
    const response = await axios({ ...config, url });
    result.data = response.data;
  } catch (err) {
    result.error = true;
  } finally {
    return result;
  }
}

export default api;
