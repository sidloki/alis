import {inject} from 'aurelia-dependency-injection';
import {DOM, PLATFORM} from 'aurelia-pal';
import {customElement, noView} from 'aurelia-templating';
import {BrowserHistory} from 'aurelia-history-browser';

const HISTORY_STATE_KEY = 'PopoverTracker';

@customElement('ons-popover')
@noView
@inject(DOM.Element, BrowserHistory)
export class OnsPopover {
  historyStateValue;

  constructor(element, history) {
    this.element = element;
    this.history = history;
    this.onPopState = this._onPopState.bind(this);
    this.element.addEventListener('postshow', this.onShow.bind(this));
    this.element.addEventListener('posthide', this.onHide.bind(this));
  }

  attached() {
    let historyStateValue = this.history.getState(HISTORY_STATE_KEY);
    PLATFORM.addEventListener('popstate', this.onPopState);
    if (historyStateValue) {
      this.history.navigateBack();
      this.historyStateValue = historyStateValue;
    }
  }

  detached() {
    PLATFORM.removeEventListener('popstate', this.onPopState);
  }

  onShow(e) {
    let historyStateValue = this.history.getState(HISTORY_STATE_KEY);
    if (historyStateValue) {
      this.historyStateValue = historyStateValue;
    } else {
      this.historyStateValue = new Date().getTime();
      this.history.pushState(HISTORY_STATE_KEY, this.historyStateValue);
    }
  }

  onHide(e) {
    if (this.history.getState(HISTORY_STATE_KEY)) {
      this.history.navigateBack();
      this.historyStateValue = null;
    }
  }

  _onPopState(e) {
    if (!e.state || !this.historyStateValue) {
      return;
    }
    if (this.history.getState(HISTORY_STATE_KEY) === this.historyStateValue && !this.element.visible) {
      this.element.show(this.target);
    } else if (!this.history.getState(HISTORY_STATE_KEY) && this.element.visible) {
      this.element.hide();
    }
  }
}
