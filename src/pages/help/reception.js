import {inject} from 'aurelia-framework';
import {Config} from '../../services/config';

@inject(Config)
export class Reception {

  constructor(config) {
    this.config = config;
  }

  activate(params, routeConfig) {
    this.title = routeConfig.title;
    this.image = {
      src: `${this.config.baseUrl}/images/InduktiveAntenne.jpg`,
      description: ''
    };
  }
}
