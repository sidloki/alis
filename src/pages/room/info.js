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
