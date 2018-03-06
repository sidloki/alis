import * as LogManager from 'aurelia-logging';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DOM, PLATFORM } from 'aurelia-pal';
import { negotiateLanguages, getProp, normalize } from './utils';

const isHtml = /<|&#?\w+;/;

export class I18N {
  static inject = [EventAggregator];

  ea; signaler; locale;
  catalogs = {};
  options = {
    language: 'en',
    loadPath: './locales/',
    languages: [],
    fallbackLanguage: 'en',
    keySeparator: '.',
    defaultContext: '',
    trimWhiteSpace: true,
    preserveIndentation: false,
    replaceNewLines: ' '
  };

 constructor(ea, signaler) {
    this.ea = ea;
    this.signaler = signaler;
  }

  async setup(options) {
    this.options = Object.assign(this.options, options);

    await Promise.all(this.options.languages.map(language =>
      this.loadCatalog(language)));

    this.setLocale(this.options.language);
  }

  loadCatalog(language) {
    return new Promise((resolve, reject) => {
      let path = PLATFORM.moduleName(`${this.options.loadPath}${language}.js`);
      FuseBox.import(path, (m) => {
        this.catalogs[language] = m;
        resolve();
      });
    });
  }

  setLocale(locale) {
    let oldLocale = this.getLocale();
    this.locales = negotiateLanguages(
      [locale].concat(navigator.languages || []),
      this.options.languages,
      this.options.fallbackLanguage
    );
    this.locale = this.locales[0];
    this.ea.publish('i18n:locale:changed', {
      oldValue: oldLocale,
      newValue: this.locale
    });
    this.signaler.signal('aurelia-translation-signal');
  }

  getLocale() {
    return this.locale;
  }

  getParams(el) {
    if (el.au && el.au['i18n-params'] && el.au['i18n-params'].viewModel) {
      return el.au['i18n-params'].viewModel.value;
    }

    return undefined;
  }

  updateTranslations(el) {
    if (!el || !el.querySelectorAll) {
      return;
    }

    if (el.hasAttribute('i18n')) {
      let params = this.getParams(el);
      let key = el.getAttribute('i18n');

      let value = this.tr(key, params);

      if (isHtml.test(value)) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    }

    if (el.hasAttribute('i18n-attrs')) {
      let params = this.getParams(el);
      let items = el.getAttribute('i18n-attrs').split(';');

      for (let item of items) {
        let [attr, key] = item.split(':');

        let value = this.tr(key, params);
        el.setAttribute(attr, value);
      }
    }

    for (let node of el.querySelectorAll(`[i18n]`)) {
      this.updateTranslations(node);
    }
  }

  tr(key, params) {
    let value;
    for (let locale of this.locales) {
      let props = [locale, key];
      let func = getProp(this.catalogs, props.join(this.options.keySeparator));
      if (typeof func === 'function') {
        value = func(params);
        break;
      }
    }
    return value || key;
  }
}
