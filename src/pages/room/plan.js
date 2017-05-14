import {inject, bindable} from 'aurelia-framework';
import {Database} from '../../services/db';

@inject(Database)
export class Plan {
  @bindable plan;

  constructor(db, element) {
    this.db = db;
  }

  activate(params) {
    return this.db.loadData().then(() => {
      let promises = [];
      let id = parseInt(params.id);
      this.data = this.db.data.systems.find((item) => {
        return item.id === id;
      });
      this.plans = [];
      if (this.data.plan1_dateiname !== 'transp.png') {
        let plan = {
          value: this.data.plan1_dateiname,
          text: this.data.plan2_dateiname !== 'transp.png' ? `Raumplan ${Object.keys(this.plans).length + 1}` : 'Raumplan',
          url: `//www.zeta.hoeranlagenverzeichnis.ch/admin/images/image_room1/${this.data.plan1_dateiname}`
        };
        promises.push(new Promise((resolve, reject) => {
          let img = new Image();
          img.onload = () => {
            let scale = 256 / img.width;
            plan.layer = L.imageOverlay(plan.url, [[0,0], [img.height*scale, img.width*scale]]);
            resolve();
          };
          img.src = plan.url;
        }));
        this.plans.push(plan);
      }
      if (this.data.plan2_dateiname !== 'transp.png') {
        let plan = {
          value: this.data.plan2_dateiname,
          text: this.data.plan1_dateiname !== 'transp.png' ? `Raumplan ${Object.keys(this.plans).length + 1}` : 'Raumplan',
          url: `//www.zeta.hoeranlagenverzeichnis.ch/admin/images/image_room2/${this.data.plan2_dateiname}`
        };
        promises.push(new Promise((resolve, reject) => {
          let img = new Image();
          img.onload = () => {
            let scale = 256 / img.width;
            plan.layer = L.imageOverlay(plan.url, [[0,0], [img.height*scale, img.width*scale]]);
            resolve();
          };
          img.src = plan.url;
        }));
        this.plans.push(plan);
      }

      return Promise.all(promises);
    });
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
