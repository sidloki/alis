import {inject} from 'aurelia-framework';
import {Database} from '../../services/db';

@inject(Database)
export class Index {
  constructor (db) {
    this.db = db;
  }

  configureRouter(config, router) {
    config.map([{
      route: '',
      name: 'room-info',
      moduleId: './info',
      nav: true,
      title: 'Informationen',
      // settings: {
      //   tab: {
      //     icon: 'ion-ios-information-outline,material:md-info-outline',
      //     'active-icon': 'ion-ios-information,material:md-info',
      //   }
      // }
    }, {
      route: 'plan',
      name: 'room-plan',
      moduleId: './plan',
      nav: true,
      title: 'Raumplan',
      activationStrategy: 'invokelifecycle'
      // settings: {
      //   tab: {
      //     icon: 'fa-map-o',
      //     'active-icon': 'fa-map'
      //   }
      // }
    }]);
  }

  activate(params) {
    this.data = this.db.data.systems.find((item) => {
      return params.id === item.anlageID;
    });
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
