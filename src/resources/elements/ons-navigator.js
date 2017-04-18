import ons from 'onsenui';
import {Container, inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {
  bindable, CompositionEngine, CompositionTransaction,
  customElement, noView, ShadowDOM, SwapStrategies, ViewSlot, ViewLocator
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

    this.view;
    this.viewStack = [];
  }

  swap(viewPortInstruction) {
    if (viewPortInstruction.component.router.isNavigatingBack) {
      let options = viewPortInstruction.component.router.currentInstruction.previousInstruction.config.options || {};
      options.data = viewPortInstruction;
      return this.element.popPage(options);
    } else {
      let options = viewPortInstruction.component.router.currentInstruction.config.options || {};
      options.data = viewPortInstruction;
      return this.element.pushPage(viewPortInstruction.moduleId, options);
    }
  }

  load({page, parent, params}, done) {
    let viewPortInstruction = params;
    let previousView = this.view;

    let work = () => {
      let pageElement = this.view.fragment.firstElementChild;
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
    return invokeLifecycle(this.view.controller.viewModel, 'deactivate').then(() => {
      this.viewSlot.remove(this.view);
      this.view.unbind();
      this.view = this.viewStack.pop();
    });
  }
}

function invokeLifecycle(instance, name, model) {
  if (typeof instance[name] === 'function') {
    return Promise.resolve().then(() => {
      return instance[name](model);
    }).then(function(result) {
      if (result !== null && result !== undefined) {
        return result;
      }

      return true;
    });
  }

  return Promise.resolve(true);
}
