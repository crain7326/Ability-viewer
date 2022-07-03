class UserStorage {
  getUserId() {
    return localStorage.getItem('USER_ID') || false;
  }
  getToken() {
    return localStorage.getItem('AUTH_TOKEN') || false;
  }

  setUserId(_data: any) {
    localStorage.setItem('USER_ID', _data);
    return true;
  }
  setToken(_data: any) {
    localStorage.setItem('AUTH_TOKEN', _data);
    return true;
  }

  deleteUserId() {
    localStorage.removeItem('USER_ID');
    return true;
  }

  deleteToken() {
    localStorage.removeItem('AUTH_TOKEN');
    return true;
  }

  clear() {
    localStorage.clear();
  }
}

const userStorage = new UserStorage();
export default userStorage;
