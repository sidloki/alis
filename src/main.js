import 'whatwg-fetch';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia) {
  aurelia.use
    .basicConfiguration()
    .history()
    .plugin(PLATFORM.moduleName('./plugins/aurelia-messageformat'), {
      language: navigator.language || 'en',
      languages: ['en', 'de', 'fr', 'it'],
      fallbackLanguage: 'en'
    })
    .plugin('aurelia-onsenui')
    .globalResources([
      PLATFORM.moduleName('./components/leaflet-layer-control'),
      PLATFORM.moduleName('./components/leaflet-map')
    ]);

  if (process.env.NODE_ENV === 'development') {
    aurelia.use.developmentLogging();
  }

  aurelia.start().then(() => aurelia.setRoot());
}
