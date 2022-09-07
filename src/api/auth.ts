import http from './http'

interface ResponseLogin {
  id: string;
  links: {
    user: string;
  };
  token: string;
}

const authApi = {
  async login(data: { id: string, password: string }): Promise<ResponseLogin> {
    return await http.post('/login', data);
  },
  async register(data: { id: string; password: string; email: string }) {
    return await http.post('/user', data);
  },
  async logout() {
    return await http.post('/logout')
  },
};

export default authApi;
