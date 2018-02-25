import {Container} from 'aurelia-framework';
import {Config} from '../services/config';

const Data = {
  1: {
    title: "Grüne Raute",
    description: "Geprüfte Höranlage mit normgerechtem Empfang.",
    shortDescription: "Geprüfte Höranlage gemäss Norm",
  },
  2: {
    title: "Gelbe Raute",
    description: "Geprüfte Höranlage, die die Voraussetzungen für einen normgerechten Empfang knapp nicht erfüllt.",
    shortDescription: "Geprüfte Höranlage nicht nach Norm",
  },
  3: {
    title: "Weisse Raute",
    description: "Nicht überprüfte Höranlage, keine Bewertung.",
    shortDescription: "Nicht überprüfte Höranlage",
  }
};

export class Rating {

  constructor(data) {
    Object.assign(this, data);
    Object.assign(this, Data[this.id]);
    this.config = Container.instance.get(Config);
  }

  get imageUrl() {
    return `${this.config.baseUrl}/symbols/${this.icon}`;
  }
}
