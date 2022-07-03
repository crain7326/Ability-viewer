import api from './api';

const authApi = {
  login(data: { id: string; password: string }) {
    return api(
      {
        method: 'POST',
        data,
      },
      `${process.env.REACT_APP_API_URL}/login`
    );
  },
  register(data: { id: string; password: string; email: string }) {
    return api(
      {
        method: 'POST',
        data,
      },
      `${process.env.REACT_APP_API_URL}/users}`
    );
  },
};

export default authApi;
