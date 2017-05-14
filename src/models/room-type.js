export class RoomType {

  constructor(data) {
    Object.assign(this, data);
  }

  static get tablename() {
    return 'roomtypes';
  }

  get id() {
    return this.typID;
  }
}
