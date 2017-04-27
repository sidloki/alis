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

import environment from './environment';

export function configure(aurelia) {
  aurelia.use
    .basicConfiguration()
    .history()
    .plugin('aurelia-onsenui')
    .feature('alis/resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
