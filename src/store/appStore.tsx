import { makeAutoObservable } from 'mobx';

class AppStore {
  loading = false;

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

const appStore = new AppStore();
export default appStore;
