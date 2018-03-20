import {inject} from 'aurelia-framework';
import {Database} from '../../services/db';
import {Config} from '../../services/config';
import {Technology} from '../../models/technology';
import {Rating} from '../../models/rating';

@inject(Database, Config)
export class Symbols {

  constructor(db, config) {
    this.db = db;
    this.config = config;
  }

  activate(params, routeConfig) {
    this.title = routeConfig.title;
    this.technologies = this.db.query(Technology).all();
    this.ratings = this.db.query(Rating).all().sort((a, b) => a.id > b.id);
  }
}
