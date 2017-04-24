import {inject, bindable} from 'aurelia-framework';
import {Database} from '../../services/db';

@inject(Database)
export class Plan {
  @bindable plan;

  constructor(db, element) {
    this.db = db;
  }

  activate(params) {
    this.data = this.db.data.systems.find((item) => {
      return params.room_id === item.anlageID;
    });
    let plans = {};
    if (this.data.plan1_dateiname !== 'transp.png') {
      plans['plan1'] = {
        name: this.data.plan2_dateiname !== 'transp.png' ? `Raumplan ${Object.keys(plans).length + 1}` : 'Raumplan',
        url: `//hoeranlagenverzeichnis.ch/admin/images/image_room1/${this.data.plan1_dateiname}`
      };
    }
    if (this.data.plan2_dateiname !== 'transp.png') {
      plans['plan2'] = {
        name: this.data.plan1_dateiname !== 'transp.png' ? `Raumplan ${Object.keys(plans).length + 1}` : 'Raumplan',
        url: `//hoeranlagenverzeichnis.ch/admin/images/image_room2/${this.data.plan2_dateiname}`
      };
    }

    this.plan = plans[params.plan_id];

    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        let scale = 256 / img.width;
        this.plan.layer = L.imageOverlay(this.plan.url, [[0,0], [img.height*scale, img.width*scale]]);
        resolve();
      };
      img.src = this.plan.url;
    });
  }

  attached() {
    let map = L.map(this.map, {
      crs: L.CRS.Simple,
      attributionControl: false,
      maxZoom: 4
    });
    map.addLayer(this.plan.layer);
    map.fitBounds(this.plan.layer.getBounds());
    map.setMaxBounds(this.plan.layer.getBounds())
  }
}
