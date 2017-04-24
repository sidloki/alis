import ons from 'onsenui';
import {Container, inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {
  bindable, CompositionEngine, CompositionTransaction,
  customElement, noView, ShadowDOM, SwapStrategies, ViewSlot, ViewLocator
} from 'aurelia-templating';
import {Router} from 'aurelia-router';
import {RouterView} from 'aurelia-templating-router';


@customElement('ons-tabbar')
@noView
@inject(DOM.Element, Container, ViewSlot, Router, ViewLocator, CompositionTransaction, CompositionEngine)
export class OnsTabbar extends RouterView {
  @bindable swapOrder;
  @bindable layoutView;
  @bindable layoutViewModel;
  @bindable layoutModel;
  element;

  constructor(element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine) {
    super(element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine);

    this.tabs = {};
    this.selectedTab;
    this.router.navigation.forEach(navModel => {
      let config = navModel.config;
      let el = document.createElement('ons-tab');
      el.setAttribute('label', config.title);
      if (navModel.config.settings.tab) {
        Object.keys(config.settings.tab).forEach(key => {
          el.setAttribute(key, config.settings.tab[key]);
        })
      }
      el._compile();
      this.element.appendChild(el);
      this.tabs[config.moduleId] = el;
    });
    this.element.setActiveTab = this.setActiveTab.bind(this);
    this.element._compile();
    this.viewSlot.anchor = this.element._contentElement;
  }

  setActiveTab(index, options) {
    let navModel = this.router.navigation[index];
    if (!navModel.isActive) {
      let route = navModel.config.name;
      this.router.navigate(navModel.href, {replace: true});
    }
  }

  swap(viewPortInstruction) {
    let tab = this.tabs[viewPortInstruction.moduleId];
    if (this.selectedTab) {
      this.selectedTab.setInactive();
    }
    tab.setActive();
    this.selectedTab = tab;
    return super.swap(viewPortInstruction);
  }
}
