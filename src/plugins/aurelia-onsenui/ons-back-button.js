import {inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {customElement, noView} from 'aurelia-templating';
import {Router} from 'aurelia-router';

@customElement('ons-back-button')
@noView
@inject(DOM.Element, Router)
export class OnsBackButton {

  constructor(element, router) {
    this.router = router;
    this.element = element;
    this.element.onClick = this.onClick.bind(this);
    this.element.hide = () => {
      // disable hiding
    };
  }

  onClick() {
    this.router.navigateBack();
  }
}
