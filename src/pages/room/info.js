import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Database} from '../../services/db';

@inject(Router, Database)
export class Info {
  constructor (router, db) {
    this.router = router;
    this.db = db;
  }

  activate(params) {
    this.data = params.data;
  }

  openWebsite() {
    window.open(this.data.webadresse, '_system');
  }

  getPhotoUrl() {
    let url = this.data.foto_dateiname;
    if (!url || url === 'transp.png') {
      return null;
    } else {
      return `//www.zeta.hoeranlagenverzeichnis.ch/admin/images/image_front/${url}`;
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

  getRatingImageUrl() {
    let name = 'resources/symbols/';
    switch (this.data.bewertung) {
      case "1":
        name += 'r32_green.png';
        break;
      case "2":
        name += 'r32_yellow.png';
        break;
      default:
        name += 'r32_white.png';
        break;
    }
    return name;
  }

  getRatingName() {
    let name = '';
    switch (this.data.bewertung) {
      case "1":
        name = 'Geprüfte Höranlage gemäss Norm';
        break;
      case "2":
        name = 'Geprüfte Höranlage nicht nach Norm';
        break;
      default:
        name = 'Nicht überprüfte Höranlage';
        break;
    }
    return name;
  }
}
