import { api } from './api';
import userStorage from '../helper/localStorage';

const authApi = {
  login(data: { id: string; password: string }) {
    return api({
      method: 'POST',
      data,
      url: `${process.env.REACT_APP_API_URL}/login`,
    });
  },
  register(data: { id: string; password: string; email: string }) {
    return api({
      method: 'POST',
      data: {
        user: data,
      },
      url: `${process.env.REACT_APP_API_URL}/users`,
    });
  },
  logout() {
    return api({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userStorage.getToken()}`,
      },
      url: `${process.env.REACT_APP_API_URL}/logout`,
    });
  },
};

export default authApi;
