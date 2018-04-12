import * as ons from 'onsenui';
import {Container, inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {
  bindable, CompositionEngine, CompositionTransaction,
  customElement, noView, ViewSlot, ViewLocator
} from 'aurelia-templating';
import {Router} from 'aurelia-router';
import {RouterView} from 'aurelia-templating-router';

@customElement('ons-navigator')
@noView
@inject(DOM.Element, Container, ViewSlot, Router, ViewLocator, CompositionTransaction, CompositionEngine)
export class OnsNavigator extends RouterView {
  @bindable swapOrder;
  @bindable layoutView;
  @bindable layoutViewModel;
  @bindable layoutModel;
  element;

  constructor(element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine) {
    super(element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine);

    this.element.pageLoader = new ons.PageLoader(this.load.bind(this), this.unload.bind(this));

    this.view = null;
    this.viewStack = [];
  }

  swap(viewPortInstruction) {
    let router = this.router;
    if (router.isNavigatingBack) {
      if (this.viewStack.length > 0) {
        let options = router.currentInstruction.previousInstruction.config.settings.navigator || {};
        options.data = viewPortInstruction;
        return this.element.popPage(options);
      } else {
        return this.insert(0, viewPortInstruction).then(() => {
          let options = router.currentInstruction.previousInstruction.config.settings.navigator || {};
          options.data = viewPortInstruction;
          return this.element.popPage(options);
        });
      }
    } else {
      let options = router.currentInstruction.config.settings.navigator || {};
      options.data = viewPortInstruction;
      return this.element.pushPage(viewPortInstruction.moduleId, options);
    }
  }

  load({page, parent, params}, done) {
    let viewPortInstruction = params;
    let previousView = this.view;

    let work = () => {
      let pageElement = this.view.fragment.querySelector('ons-page');
      this.viewSlot.add(this.view);
      if (previousView) {
        this.viewStack.push(previousView);
      }
      this._notify();
      return done(pageElement);
    };

    let ready = owningView => {
      viewPortInstruction.controller.automate(this.overrideContext, owningView);
      if (this.compositionTransactionOwnershipToken) {
        return this.compositionTransactionOwnershipToken.waitForCompositionComplete().then(() => {
          this.compositionTransactionOwnershipToken = null;
          return work();
        });
      }

      return work();
    };

    this.view = viewPortInstruction.controller.view;

    return ready(this.owningView);
  }

  unload(pageElement) {
    this.viewSlot.remove(this.view);
    this.view.unbind();
    this.view = this.viewStack.pop();
  }

  insert(index, viewPortInstruction) {
    return new Promise((resolve, reject) => {
      let currentView = this.view;
  
      let work = () => {
        let pageElement = viewPortInstruction.controller.view.fragment.querySelector('ons-page');
        this.viewSlot.insert(index, viewPortInstruction.controller.view);
        if (currentView) {
          this.viewStack.splice(index, 0, currentView);
        }
        this._notify();
        resolve(pageElement);
      };
  
      let ready = owningView => {
        viewPortInstruction.controller.automate(this.overrideContext, owningView);
        if (this.compositionTransactionOwnershipToken) {
          this.compositionTransactionOwnershipToken.waitForCompositionComplete().then(() => {
            this.compositionTransactionOwnershipToken = null;
            work();
          });
        }
  
        work();
      };
  
      ready(this.owningView);
    });
  }
}
