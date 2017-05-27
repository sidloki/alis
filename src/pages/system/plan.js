import {inject, bindable} from 'aurelia-framework';
import {Database} from '../../services/db';
import {Config} from '../../services/config';
import {System} from '../../models/system';

@inject(Database, Config)
export class Plan {
  @bindable plan;

  constructor(db, config) {
    this.db = db;
    this.config = config;
  }

  activate(params) {
    let promises = [];
    this.data = this.db.query(System).getById(parseInt(params.id));
    this.plans = this.data.roomPlans;
    return Promise.all(this.plans.map((plan) => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
          let scale = 256 / img.width;
          plan.layer = L.imageOverlay(plan.url, [[0,0], [img.height*scale, img.width*scale]]);
          resolve();
        };
        img.src = plan.url;
      });
    }));
  }

  attached() {
    if (this.plans.length > 0) {
      this.map = L.map(this.planmap, {
        crs: L.CRS.Simple,
        attributionControl: false,
        maxZoom: 4
      });
      this.plan = this.plans[0].value;
    }
  }

  planChanged(newValue, oldValue) {
    if (oldValue) {
      let plan = this.getPlan(oldValue);
      this.map.removeLayer(plan.layer);
    }
    if (newValue) {
      let plan = this.getPlan(newValue);
      this.map.addLayer(plan.layer);
      this.map.fitBounds(plan.layer.getBounds());
      this.map.setMaxBounds(plan.layer.getBounds())
    }
  }

  getPlan(value) {
    return this.plans.find((plan) => plan.value === value);
  }
}
