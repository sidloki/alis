import {inject} from 'aurelia-framework';
import {Database} from '../../services/db';

@inject(Database)
export class Index {
  constructor (db) {
    this.db = db;
  }

  activate(params) {
    this.data = this.db.data.systems.find((item) => {
      return params.id === item.anlageID;
    });
    this.tabs = [{
      page: './info',
      label: 'Info',
      active: true,
      data: this.data
    }, {
      page: './plan',
      label: 'Raumplan',
      data: this.data
    }];
  }

  getRoomName() {
    let name = `${this.data.raum} ${this.data.raumnummer}`.trim();
    if (!name) {
      name = this.data.gebaeude;
    }
    if (!name) {
      let type = this.db.data.roomtypes.find((type) => {
        return type.typID === this.data.typID;
      });
      name = type.typ;
    }
    return name;
  }
}
