import {Container} from 'aurelia-framework';
import {Database} from '../services/db';
import {RoomType} from './room-type';
import {Technology} from './technology';
import {Building} from './building';
import {Organisation} from './organisation';

export class System {

  constructor(data) {
    Object.assign(this, data);
    this.db = Container.instance.get(Database);
  }

  static get tablename() {
    return 'systems';
  }

  static get relations() {
    return new Map([
      [Building, 'buildingId'],
      [Organisation, 'organisationId']
    ]);
  }

  get id() {
    return this.anlageID;
  }

  get roomtype() {
    return this.db.query(RoomType).getById(this.typID);
  }

  get technology() {
    return this.db.query(Technology).getById(this.techID);
  }
}
