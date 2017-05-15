import {Container} from 'aurelia-framework';
import {Database} from '../services/db';


export class System {

  constructor(data) {
    Object.assign(this, data);
    this.db = Container.instance.get(Database);
  }

  static get tablename() {
    return 'systems';
  }

  get id() {
    return this.anlageID;
  }

  get roomtype() {
    return this.db.data.roomtypes.find(roomtype => roomtype.id === this.typID);
  }
}
