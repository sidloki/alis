import {inject}  from 'aurelia-framework';
import {I18N} from '../../plugins/aurelia-messageformat';

@inject(I18N)
export class Video {

  constructor(i18n) {
    this.i18n = i18n;
    this.locale = i18n.getLocale();
    this.url = `https://www.youtube.com/embed/pOHBhKu7pO8?hl=${this.locale}&&cc_load_policy=1`;
  }
  
  activate(params, routeConfig) {
    this.title = routeConfig.title;
  }
}
