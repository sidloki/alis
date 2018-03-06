export class Lang {

  constructor(data) {
    Object.assign(this, data);
  }

  static get tablename() {
    return 'lang';
  }
}
