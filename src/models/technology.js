import {Container} from 'aurelia-framework';
import {Config} from '../services/config';
import {_} from '../plugins/aurelia-messageformat';

export class Technology {

  constructor(data) {
    Object.assign(this, data);
    this.config = Container.instance.get(Config);
  }

  static get tablename() {
    return 'technologies';
  }

  get id() {
    return this.techID;
  }

  get title() {
    return _(`data.${Technology.tablename}.${this.id}.title`);
  }

  get description() {
    return _(`data.${Technology.tablename}.${this.id}.description`);
  }

  get imageUrl() {
    return `${this.config.baseUrl}/symbols/${this.technologie}.png`;
  }
}
