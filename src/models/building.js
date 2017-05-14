export class Building {

  constructor(data) {
    Object.assign(this, data);
  }

  static get tablename() {
    return 'buildings';
  }
}
