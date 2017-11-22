import 'aurelia-binding';
import 'aurelia-bootstrapper';
import 'aurelia-event-aggregator';
import 'aurelia-framework';
import 'aurelia-dependency-injection';
import 'aurelia-history-browser';
import 'aurelia-loader-default';
import 'aurelia-logging-console';
import 'aurelia-metadata';
import 'aurelia-pal-browser';
import 'aurelia-path';
import 'aurelia-polyfills';
import 'aurelia-route-recognizer';
import 'aurelia-router';
import 'aurelia-templating';
import 'aurelia-templating-binding';
import 'aurelia-templating-resources';
import 'aurelia-templating-router';
import 'aurelia-onsenui';
import 'whatwg-fetch';

import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia) {
  aurelia.use
    .basicConfiguration()
    .history()
    .plugin('aurelia-onsenui')
    .developmentLogging()
    .globalResources([
      PLATFORM.moduleName('src/components/leaflet-layer-control')
    ]);

  aurelia.start().then(() => aurelia.setRoot());
}
