import {inject} from 'aurelia-dependency-injection';
import {DOM, PLATFORM} from 'aurelia-pal';
import {customElement, noView} from 'aurelia-templating';
import {BrowserHistory} from 'aurelia-history-browser';

const HISTORY_STATE_KEY = 'SplitterSideTracker';

@customElement('ons-splitter-side')
@noView
@inject(DOM.Element, BrowserHistory)
export class OnsSplitterSide {

  constructor(element, history) {
    this.element = element;
    this.history = history;
    this.visible = false;
    this.onPopState = this._onPopState.bind(this);
    this.element.addEventListener('preopen', this.onOpen.bind(this));
    this.element.addEventListener('preclose', this.onClose.bind(this));
  }

  attached() {
    PLATFORM.addEventListener('popstate', this.onPopState);
    if (this.history.getState(HISTORY_STATE_KEY)) {
      this.history.navigateBack();
    }
  }

  detached() {
    PLATFORM.removeEventListener('popstate', this.onPopState);
  }

  onOpen(e) {
    if (!this.history.getState(HISTORY_STATE_KEY)) {
      this.history.pushState(HISTORY_STATE_KEY, new Date().getTime());
    }
  }

  onClose(e) {
    if (this.history.getState(HISTORY_STATE_KEY)) {
      this.history.navigateBack();
    }
  }

  _onPopState(e) {
    if (!e.state || this.element._lock.isLocked()) {
      return;
    }
    if (this.history.getState(HISTORY_STATE_KEY) && !this.element.isOpen) {
      this.element.open();
    } else if (!this.history.getState(HISTORY_STATE_KEY) && this.element.isOpen) {
      this.element.close();
    }
  }
}
