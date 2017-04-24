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
    this.data = this.db.data.systems.find((item) => {
      return params.id === item.anlageID;
    });
    this.plans = [];
    if (this.data.plan1_dateiname !== 'transp.png') {
      let plan = {};
      plan.id = 'plan1';
      plan.name = this.data.plan2_dateiname !== 'transp.png' ? `Raumplan ${this.plans.length + 1}` : 'Raumplan';

      this.plans.push(plan);

    }
    if (this.data.plan2_dateiname !== 'transp.png') {
      let plan = {};
      plan.id = 'plan2';
      plan.name = this.data.plan1_dateiname !== 'transp.png' ? `Raumplan ${this.plans.length + 1}` : 'Raumplan';

      this.plans.push(plan);
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

  showPlan(plan) {
    this.router.navigateToRoute('plan', {room_id: this.data.anlageID, plan_id: plan.id});
  }
}
