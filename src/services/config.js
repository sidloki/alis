import {_} from '../plugins/aurelia-messageformat';

export class Config {

  baseUrl = 'https://hoeranlagen.ch';

  basemaps = [{
    type: 'google',
    id: 'roadmap',
    title: _('default'),
    config: {
      type: 'roadmap', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
      styles: [{
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      }]
    }
  }, {
    type: 'google',
    id: 'satellite',
    title: _('satellite'),
    config: {
      type: 'satellite' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    }
  }];

  map = {
    basemap: 'roadmap',
    view: [[45.805829, 7.338867], [47.813155, 9.008789]]
  };
}
