import {Container} from 'aurelia-framework';
import {Database} from '../services/db';

export class Building {

  constructor(data) {
    Object.assign(this, data);
    this.db = Container.instance.get(Database);
  }

  static get tablename() {
    return 'buildings';
  }

  get icon() {
    let roomtypes = this.roomtypes;
    if (roomtypes.length === 1) {
      return roomtypes[0].icon;
    }
    return null;
  }

  get roomtypes() {
    return this.systems.reduce((roomtypes, system) => {
      let roomtype = system.roomtype;
      if (roomtypes.indexOf(roomtype) === -1) {
        roomtypes.push(roomtype);
      }
      return roomtypes;
    }, []);
  }
}
