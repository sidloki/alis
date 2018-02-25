import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Database} from '../../services/db';
import {Config} from '../../services/config';
import {System} from '../../models/system';

@inject(Router, Database, Config)
export class Info {

  constructor(router, db, config) {
    this.router = router;
    this.db = db;
    this.config = config;
  }

  activate(params) {
    this.data = this.db.query(System).getById(parseInt(params.id, 10));
  }

  openWebsite() {
    window.open(this.data.webadresse, '_system');
  }

  hasRoomPlan() {
    return this.data.plan1_dateiname !== 'transp.png' || this.data.plan2_dateiname !== 'transp.png' ? true : false;
  }

  showRoomPlan(id) {
    this.router.navigateToRoute('system-plan', {id: this.data.id, plan: id});
  }
}
