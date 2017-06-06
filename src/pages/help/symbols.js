import {inject} from 'aurelia-framework';
import {Database} from '../../services/db';
import {Config} from '../../services/config';
import {Technology} from '../../models/technology';

@inject(Database, Config)
export class Symbols {

  constructor(db, config) {
    this.db = db;
    this.config = config;
  }

  activate(params, routeConfig) {
    this.title = routeConfig.title;
    this.technologies = this.db.query(Technology).all();
    this.ratings = [{
      image: this.getRatingImageUrl(1),
      title: 'Grüne Raute',
      description: 'Geprüfte Höranlage gemäss Norm.'
    }, {
      image: this.getRatingImageUrl(2),
      title: 'Gelbe Raute',
      description: 'Überprüfte Höranlage (nicht nach Norm geprüft oder mit Mängeln).'
    }, {
      image: this.getRatingImageUrl(3),
      title: 'Weisse Raute',
      description: 'Nicht überprüfte Höranlage, keine Bewertung. '
    }];
  }

  getRatingImageUrl(value) {
    let name = `${this.config.baseUrl}/symbols/`;
    switch (value) {
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
}
