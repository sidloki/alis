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
import {PLATFORM} from 'aurelia-pal';
import {BrowserHistory} from 'aurelia-history-browser';
import {CustomRouter} from './lib/custom-router';
import {Router, RouteLoader} from 'aurelia-router';
import {TemplatingRouteLoader} from 'aurelia-templating-router';

import environment from './environment';

BrowserHistory.prototype.setState = function(key, value) {
  let state = Object.assign({}, this.history.state);
  state[key] = value;
  this.history.replaceState(state, null, null);
};

BrowserHistory.prototype.getState = function(key) {
 let state = Object.assign({}, this.history.state);
 return state[key];
};

export function configure(aurelia) {
  if (PLATFORM.location.pathname !== '/' || PLATFORM.location.hash) {
    PLATFORM.location.replace('/');
  } else {
    aurelia.use
      .singleton(RouteLoader, TemplatingRouteLoader)
      .singleton(Router, CustomRouter);
    aurelia.use.container.registerAlias(Router, CustomRouter);
    aurelia.use
      .basicConfiguration()
      .history()
      .feature('alis/resources');

    if (environment.debug) {
      aurelia.use.developmentLogging();
    }

    if (environment.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => aurelia.setRoot());
  }
}
