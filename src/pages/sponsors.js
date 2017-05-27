import {inject} from 'aurelia-framework';
import {Config} from '../services/config';

@inject(Config)
export class Sponsors {

  constructor(config) {
    this.config = config;
  }

  activate(params, routeConfig) {
    this.title = routeConfig.title;
    this.sponsors = [{
      title: 'pro audito schweiz',
      link: 'http://www.proaudito.ch',
      logo: `${this.config.baseUrl}/pictures/logo_pa_hoch.png`
    }, {
      title: 'Eidgenössische Büro für die Gleichstellung von Menschen mit Behinderung EBGB',
      link: 'http://www.edi.admin.ch/ebgb',
      logo: `${this.config.baseUrl}/pictures/logo_ebgb_hoch.png`
    }, {
      title: 'Denk an mich',
      link: 'http://www.denkanmich.ch',
      logo: `${this.config.baseUrl}/pictures/logo_dam_hoch.png`
    }, {
      title: 'Sonos',
      link: 'http://www.sonos-info.ch',
      logo: `${this.config.baseUrl}/pictures/logo_sonos_2015.png`
    }, {
      title: 'Oertli Stiftung',
      link: 'http://www.oertlistiftung.ch/',
      logo: `${this.config.baseUrl}/pictures/logo_oertli_stiftung.png`
    }, {
      title: 'Paul Hess Stiftung',
      link: '',
      logo: ''
    }, {
      title: 'Katholische Kirche Region Bern',
      link: 'http://www.kathbern.ch/',
      logo: `${this.config.baseUrl}/pictures/logo_kathbe.png`
    }]
  }

  openWebsite(item) {
    if (item.link) {
      window.open(item.link, '_system');
    }
  }

}
