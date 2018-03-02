
import {EventAggregator} from 'aurelia-event-aggregator';
import {Container} from 'aurelia-framework';
import * as LogManager from 'aurelia-logging';
import {PLATFORM} from 'aurelia-pal';
import {ViewResources} from 'aurelia-templating';
import {BindingSignaler} from 'aurelia-templating-resources';

import {I18N} from './i18n';
import {normalize} from './utils';

async function configure(aurelia, options) {
  const instance = new I18N(aurelia.container.get(EventAggregator), aurelia.container.get(BindingSignaler));
  aurelia.container.registerInstance(I18N, instance);

  aurelia.globalResources(PLATFORM.moduleName('./attributes'));

  await instance.setup(options);
}

function _(msg, params = null) {
  const i18n = Container.instance.get(I18N);
  return i18n.tr(msg, params);
}

export {
  configure,
  I18N,
  _,
  normalize
};
