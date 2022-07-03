import axios, { AxiosRequestConfig } from 'axios';

async function api(config: AxiosRequestConfig, url: string) {
  console.log(url);
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
    console.log(err);
    result.error = true;
  } finally {
    return result;
  }
}

export default api;
