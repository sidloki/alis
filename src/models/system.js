export class System {

  constructor(data) {
    Object.assign(this, data);
  }

  static get tablename() {
    return 'systems';
  }

  get id() {
    return this.anlageID;
  }
}
