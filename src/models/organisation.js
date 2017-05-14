export class Organisation {
  
  constructor(data) {
    Object.assign(this, data);
  }

  static get tablename() {
    return 'organisations';
  }
}
