import 'whatwg-fetch';
import {PLATFORM} from 'aurelia-pal';
import de from './locales/de';
import en from './locales/en';
import fr from './locales/fr';
import it from './locales/it';

export function configure(aurelia) {
  const params = parseQueryString(location.search.substring(1));
  aurelia.use
    .basicConfiguration()
    .history()
    .plugin(PLATFORM.moduleName('./plugins/aurelia-messageformat'), {
      language: params.lang || navigator.language || 'en',
      languages: ['en', 'de', 'fr', 'it'],
      catalogs: {
        de: de,
        en: en,
        fr: fr,
        it: it
      },
      fallbackLanguage: 'en'
    })
    .plugin(PLATFORM.moduleName('./plugins/aurelia-onsenui'))
    .globalResources([
      PLATFORM.moduleName('./components/leaflet-layer-control'),
      PLATFORM.moduleName('./components/leaflet-map')
    ]);

  if (process.env.NODE_ENV === 'development') {
    aurelia.use.developmentLogging();
  }

  aurelia.start().then(() => aurelia.setRoot());
}

function parseQueryString(query) {
  var vars = query.split('&');
  var queryString = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    // If first entry with this name
    if (typeof queryString[pair[0]] === 'undefined') {
      queryString[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof queryString[pair[0]] === 'string') {
      var arr = [queryString[pair[0]], decodeURIComponent(pair[1])];
      queryString[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      queryString[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return queryString;
}
