import {Container} from 'aurelia-framework';
import {Config} from '../services/config';

// TODO: store this data in the backend database
const Data = {
  1: {
    description:
      `T-Modus ist das häufigste Piktogramm. Induktiver Empfang des Direkttons über die Hörgeräte,
      welche über eine Programmtaste am Hörgerät in den T-Modus umgestellt wurden.`
  },
  2: {
    description:
      `In seltenen Fällen wird der Direktton über Infrarotlicht an ein kleines tragbares Gerät mit
      einer induktiven Halsschleife übertragen. Dieser Empfänger ist bei der Rezeption oder an der Kasse erhältlich.`
  },
  3: {
    description:
      `Hier ist für einen induktiven Empfang noch zusätzlich ein kleines tragbares Gerät bei der Rezeption
      oder an der Kasse erhältlich. Eine induktive Halsschleife ist am kleinen Gerät angeschlossen.`
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
