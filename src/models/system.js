import {Container} from 'aurelia-framework';
import {Database} from '../services/db';
import {Config} from '../services/config';
import {RoomType} from './room-type';
import {Technology} from './technology';
import {Building} from './building';
import {Organisation} from './organisation';

export class System {

  constructor(data) {
    Object.assign(this, data);
    this.db = Container.instance.get(Database);
    this.config = Container.instance.get(Config);
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

  get name() {
    let name = `${this.raum} ${this.raumnummer}`.trim();
    if (!name) {
      name = this.building.name;
    }
    if (!name) {
      name = this.roomtype.name;
    }
    return name;
  }

  get roomtype() {
    return this.db.query(RoomType).getById(this.typID);
  }

  get technology() {
    return this.db.query(Technology).getById(this.techID);
  }

  get photoUrl() {
    let url = this.foto_dateiname;
    if (!url || url === 'transp.png') {
      return null;
    } else {
      return `${this.config.baseUrl}/admin/images/image_front/${url}`;
    }
  }

  get roomPlans() {
    let plans = [];
    if (this.plan1_dateiname !== 'transp.png') {
      let plan = {
        value: this.plan1_dateiname,
        text: this.plan2_dateiname !== 'transp.png' ? `Raumplan ${Object.keys(plans).length + 1}` : 'Raumplan',
        url: `${this.config.baseUrl}/admin/images/image_room1/${this.plan1_dateiname}`
      };
      plans.push(plan);
    }
    if (this.plan2_dateiname !== 'transp.png') {
      let plan = {
        value: this.plan2_dateiname,
        text: this.plan1_dateiname !== 'transp.png' ? `Raumplan ${Object.keys(plans).length + 1}` : 'Raumplan',
        url: `${this.config.baseUrl}/admin/images/image_room2/${this.plan2_dateiname}`
      };
      plans.push(plan);
    }
    return plans;
  }
}
