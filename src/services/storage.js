export class Storage {

  constructor() {
    this.stores = {
      local: localStorage,
      session: sessionStorage
    };
  }

  getItem(name, store = 'local') {
    return JSON.parse(this.stores[store].getItem(name));
  }

  setItem(name, value, store = 'local') {
    this.stores[store].setItem(name, JSON.stringify(value));
  }
}
