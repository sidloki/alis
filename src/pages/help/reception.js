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
      src: `${this.config.baseUrl}/pictures/AudeoB_312T_Rend.jpg`,
      description: ''
    };
  }
}
