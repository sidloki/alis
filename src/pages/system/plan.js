import {inject, bindable} from 'aurelia-framework';
import {Database} from '../../services/db';
import {Config} from '../../services/config';
import {System} from '../../models/system';

@inject(Database, Config)
export class Plan {

  constructor(db, config) {
    this.db = db;
    this.config = config;
  }

  activate(params) {
    this.data = this.db.query(System).getById(parseInt(params.id, 10));
    return new Promise((resolve, reject) => {
      let plan = this.data.roomPlans.find(x => x.id === params.plan);
      let img = new Image();
      img.onload = () => {
        let scale = 256 / img.width;
        this.layer = L.imageOverlay(plan.url, [[0, 0], [img.height * scale, img.width * scale]]);
        resolve();
      };
      img.src = plan.url;
    });
  }

  attached() {
    this.map = L.map(this.planmap, {
      crs: L.CRS.Simple,
      attributionControl: false,
      maxZoom: 4
    });
    this.map.addLayer(this.layer);
    this.map.fitBounds(this.layer.getBounds());
    this.map.setMaxBounds(this.layer.getBounds());
  }
}
