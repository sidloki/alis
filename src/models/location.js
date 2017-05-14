export class Location {

  constructor(data) {
    Object.assign(this, data);
  }

  static get tablename() {
    return 'locations';
  }
}
