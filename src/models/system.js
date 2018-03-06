import {Container} from 'aurelia-framework';
import {Database} from '../services/db';
import {Config} from '../services/config';
import {RoomType} from './room-type';
import {Technology} from './technology';
import {Building} from './building';
import {Organisation} from './organisation';
import {I18N} from '../plugins/aurelia-messageformat';

export class System {

  constructor(data) {
    Object.assign(this, data);
    this.db = Container.instance.get(Database);
    this.config = Container.instance.get(Config);
    this.i18n = Container.instance.get(I18N);
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

  get annotation() {
    let locale = this.i18n.getLocale();
    return this.lang[locale];
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
    }
    return `${this.config.baseUrl}/admin/images/image_front/${url}`;
  }

  get roomPlans() {
    let plans = [];
    if (this.plan1_dateiname !== 'transp.png') {
      let path = 'image_room1';
      let plan = {
        id: `${path}_${this.plan2_dateiname}`,
        value: this.plan1_dateiname,
        text: this.plan2_dateiname !== 'transp.png' ? `Raumplan ${Object.keys(plans).length + 1}` : 'Raumplan',
        url: `${this.config.baseUrl}/admin/images/${path}/${this.plan1_dateiname}`
      };
      plans.push(plan);
    }
    if (this.plan2_dateiname !== 'transp.png') {
      let path = 'image_room2';
      let plan = {
        id: `${path}_${this.plan2_dateiname}`,
        value: this.plan2_dateiname,
        text: this.plan1_dateiname !== 'transp.png' ? `Raumplan ${Object.keys(plans).length + 1}` : 'Raumplan',
        url: `${this.config.baseUrl}/admin/images/${path}/${this.plan2_dateiname}`
      };
      plans.push(plan);
    }
    return plans;
  }
}
