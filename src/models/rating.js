import {Container} from 'aurelia-framework';
import {Config} from '../services/config';
import {_} from '../plugins/aurelia-messageformat';

export class Rating {

  constructor(data) {
    Object.assign(this, data);
    this.config = Container.instance.get(Config);
  }

  get title() {
    return _(`data.ratings.${this.id}.title`);
  }

  get description() {
    return _(`data.ratings.${this.id}.description`);
  }

  get shortDescription() {
    return _(`data.ratings.${this.id}.description-short`);
  }

  get imageUrl() {
    return `${this.config.baseUrl}/symbols/${this.icon}`;
  }
}
