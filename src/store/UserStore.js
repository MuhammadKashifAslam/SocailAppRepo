// src/store/UserStore.js
import { makeAutoObservable } from "mobx";

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.user = user;
  }

  logout() {
    this.user = null;
  }
}

export default new UserStore();
