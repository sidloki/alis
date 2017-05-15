const Icons = {
  1: {
    name: 'building',
    prefix: 'mki'
  },
  2: {
    name: 'university',
    prefix: 'mki'
  },
  3: {
    name: 'chapel',
    prefix: 'mki'
  },
  4: {
    name: 'museum',
    prefix: 'mki'
  },
  5: {
    name: 'court_house',
    prefix: 'mki'
  },
  6: {
    name: 'post_office',
    prefix: 'mki'
  },
  7: {
    name: 'ios-people',
    prefix: 'ion'
  },
  8: {
    name: 'cinema',
    prefix: 'mki'
  },
  9: {
    name: 'theatre',
    prefix: 'mki'
  }
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
