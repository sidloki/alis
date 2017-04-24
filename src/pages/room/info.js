import {inject} from 'aurelia-framework';
import {Database} from '../../services/db';

@inject(Database)
export class Info {
  constructor (db) {
    this.db = db;
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

  openWebsite() {
    window.open(this.data.webadresse, '_system');
  }

  getPhotoUrl() {
    let url = this.data.foto_dateiname;
    if (!url || url === 'transp.png') {
      return null;
    } else {
      return `//hoeranlagenverzeichnis.ch/admin/images/image_front/${url}`;
    }
  }

  getTechImageUrl() {
    let technology = this.db.data.technologies.find((type) => {
      return type.techID === this.data.techID;
    });
    return `resources/symbols/${technology.technologie}.png`;
  }

  getTechName() {
    let technology = this.db.data.technologies.find((type) => {
      return type.techID === this.data.techID;
    });
    return technology.technologie;
  }
}
