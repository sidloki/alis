export class Technology {

  constructor(data) {
    Object.assign(this, data);
  }

  static get tablename() {
    return 'technologies';
  }

  get id() {
    return this.techID;
  }
}
