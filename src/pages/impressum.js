import {inject} from 'aurelia-framework';
import {Config} from '../services/config';

@inject(Config)
export class Impressum {

  constructor(config) {
    this.config = config;
  }

  activate(params, routeConfig) {
    this.title = routeConfig.title;
    this.sponsors = [{
      title: 'Irma Wigert Stiftung c/o pro audito schweiz',
      link: '',
    }, {
      title: 'Reformierte Kirche Kanton Zug',
      link: 'http://www.ref-zug.ch/kanton-zug/',
      logo: `${this.config.baseUrl}/pictures/logos/logo-ref-kirche-kt-zug.png`
    }, {
      title: 'Reformierte Kirche Baselland',
      link: 'https://refbl.ch/',
      logo: `${this.config.baseUrl}/pictures/logos/logo-ref-kirche-baselland.png`
    }, {
      title: 'Reformierte Kirche Kanton Luzern',
      link: 'http://www.reflu.ch/',
      logo: `${this.config.baseUrl}/pictures/logos/logo-ref-kirche-kt-luzern.png`
    }, {
      title: 'Evangelische Landeskirche des Kantons Thurgau',
      link: 'http://www.evang-tg.ch/',
      logo: `${this.config.baseUrl}/pictures/logos/logo-evg-kirche-kt-thurgau.png`
    }];
  }

  openWebsite(item) {
    if (item.link) {
      window.open(item.link, '_system');
    }
  }

}
