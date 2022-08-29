import { api } from './api';
import http from './http'

const authApi = {
  async login(data: { id: string, password: string }) {
    return http.post('/login', data);
  },
  register(data: { id: string; password: string; email: string }) {
    return http.post('/user', data);
  },
  logout() {
    return http.post('/logout')
  },
};

export default authApi;
