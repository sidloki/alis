export class Canton {

  constructor(data) {
    Object.assign(this, data);
  }

  static get tablename() {
    return 'cantons';
  }

  get id() {
    return this.kantonID;
  }
}
