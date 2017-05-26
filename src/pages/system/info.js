import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Database} from '../../services/db';
import {System} from '../../models/system';

@inject(Router, Database)
export class Info {
  constructor (router, db) {
    this.router = router;
    this.db = db;
  }

  activate(params) {
    this.data = this.db.query(System).getById(parseInt(params.id));
  }

  openWebsite() {
    window.open(this.data.webadresse, '_system');
  }

  hasRoomPlan() {
    return this.data.plan1_dateiname !== 'transp.png' || this.data.plan2_dateiname !== 'transp.png' ? true : false;
  }

  showRoomPlan() {
    this.router.navigateToRoute('system-plan', {id: this.data.id});
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
    return `resources/symbols/${this.data.technology.technologie}.png`;
  }

  getTechName() {
    return this.data.technology.technologie;
  }

  getRatingImageUrl() {
    let name = 'resources/symbols/';
    switch (this.data.bewertung) {
      case 1:
        name += 'r32_green.png';
        break;
      case 2:
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
      case 1:
        name = 'Geprüfte Höranlage gemäss Norm';
        break;
      case 2:
        name = 'Geprüfte Höranlage nicht nach Norm';
        break;
      default:
        name = 'Nicht überprüfte Höranlage';
        break;
    }
    return name;
  }
}
