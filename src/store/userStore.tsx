import axios, { AxiosResponse } from 'axios';
import { observable, action, makeObservable, configure } from 'mobx';

// action으로만 observable(state) 수정하도록 설정
configure({ enforceActions: 'observed' });

class UserStore {
  online = false;

  constructor() {
    makeObservable(this, {
      online: observable,

      handleSignup: action,
      handleLogin: action,
      handleLogout: action,
    });
  }

  handleSignup(id: string , email: string , pw: string) {
    const request = {
      id: id,
      email: email,
      password: pw,
    };
    this.#setSignup(request);
  }
  async handleLogin(id: string, pw: string) {
    const request = {
      id: id,
      password: pw,
    };
    const response: any  = await this.#setLogin(request);

    if (response.status === 200) return response;

    return false;
  }

  handleLogout() {
    this.#setLogout();
  }

  async #setSignup(request: object) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        request
      );
    } catch (err) {
      console.log(err);
    }
  }
  async #setLogin(request: object) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        request
      );
      this.online = true;

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async #setLogout() {
    try {
      axios.post(`${process.env.REACT_APP_API_URL}/logout`);
      this.online = false;
    } catch (err) {
      console.log(err);
    }
  }
}
const userStore = new UserStore();

export default userStore;
