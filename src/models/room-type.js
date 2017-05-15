const Icons = {
  1: 'mki-building',
  2: 'ion-university, material:md-graduation-cap',
  3: 'mki-chapel',
  4: 'mki-museum',
  5: 'mki-court_house',
  6: 'ion-ios-email, material:md-email',
  7: 'ion-ios-people',
  8: 'ion-ios-film, material:md-movie-alt',
  9: 'mki-theatre'
};


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

  get icon() {
    return Icons[this.id];;
  }
}
