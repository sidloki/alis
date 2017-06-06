import {Container} from 'aurelia-framework';
import {Config} from '../services/config';

// TODO: store this data in the backend database
const Data = {
  1: {
    description: 'Empfang induktiv (Modus/Programm des Hörgerätes auf T stellen).'
  },
  2: {
    description: 'Empfang über Infrarot (mit Empfangsgerät und Halsschlaufe induktiv).'
  },
  3: {
    description: 'Empfang über Funk (mit Empfangsgerät und Halsschlaufe induktiv).'
  }
};

export class Technology {

  constructor(data) {
    Object.assign(this, data);
    Object.assign(this, Data[this.id]);
    this.config = Container.instance.get(Config);
  }

  static get tablename() {
    return 'technologies';
  }

  get id() {
    return this.techID;
  }

  get title() {
    return this.technologie;
  }

  get imageUrl() {
    return `${this.config.baseUrl}/symbols/${this.title}.png`;
  }
}
