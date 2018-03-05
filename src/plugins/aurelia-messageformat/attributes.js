import {I18N} from './i18n';
import {EventAggregator} from 'aurelia-event-aggregator';
import {customAttribute} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

@customAttribute('i18n-params')
export class I18NParamsCustomAttribute {

  static inject = [DOM.Element, I18N];

  element; service;

  constructor(element, i18n) {
    this.element = element;
    this.service = i18n;
  }

  valueChanged() {
    this.service.updateTranslations(this.element);
  }
}

@customAttribute('i18n')
export class I18NCustomAttribute {

  static inject = [DOM.Element, I18N, EventAggregator];

  constructor(element, i18n, ea, tparams) {
    this.element = element;
    this.service = i18n;
    this.ea = ea;

    this.subscription = this.ea.subscribe('i18n:locale:changed', () => {
      this.service.updateTranslations(this.element);
    });
  }

  valueChanged(v) {
    this.service.updateTranslations(this.element);
  }

  unbind() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }
}
