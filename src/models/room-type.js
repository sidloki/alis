const Icons = {
  1: {
    name: 'building',
    prefix: 'mki',
    color: '#2E7D32'
  },
  2: {
    name: 'university',
    prefix: 'mki',
    color: '#283593'
  },
  3: {
    name: 'chapel',
    prefix: 'mki',
    color: '#F9A825'
  },
  4: {
    name: 'museum',
    prefix: 'mki',
    color: '#F57C00'
  },
  5: {
    name: 'court_house',
    prefix: 'mki',
    color: '#AD1457'
  },
  6: {
    name: 'document-text',
    prefix: 'ion',
    color: '#9E9D24'
  },
  7: {
    name: 'ios-people',
    prefix: 'ion',
    color: '#6A1B9A'
  },
  8: {
    name: 'cinema',
    prefix: 'mki',
    color: '#C62828'
  },
  9: {
    name: 'theatre',
    prefix: 'mki',
    color: '#00838F'
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

  get name() {
    return this.typ;
  }

  get description() {
    return this.beschreibung;
  }

  get icon() {
    return Icons[this.id];
  }
}
