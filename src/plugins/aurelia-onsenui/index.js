export {OnsBackButton} from './ons-back-button';
export {OnsIcon} from './ons-icon';
export {OnsNavigator} from './ons-navigator';
export {OnsPopover} from './ons-popover';
export {OnsRange} from './ons-range';
export {OnsSelect} from './ons-select';
export {OnsSplitterSide} from './ons-splitter-side';
export {OnsSwitch} from './ons-switch';
export {OnsTab} from './ons-tab';
export {OnsTabbar} from './ons-tabbar';

import {PLATFORM} from 'aurelia-pal';
import {BrowserHistory} from 'aurelia-history-browser';

BrowserHistory.prototype.pushState = function(key, value) {
  let state = Object.assign({}, this.history.state);
  let { pathname, search, hash } = this.location;
  state[key] = value;
  this.history.pushState(state, null, `${pathname}${search}${hash}`);
};

export function configure(config) {
  config
    .globalResources([
      PLATFORM.moduleName('./ons-back-button'),
      PLATFORM.moduleName('./ons-icon'),
      PLATFORM.moduleName('./ons-navigator'),
      PLATFORM.moduleName('./ons-popover'),
      PLATFORM.moduleName('./ons-range'),
      PLATFORM.moduleName('./ons-select'),
      PLATFORM.moduleName('./ons-splitter-side'),
      PLATFORM.moduleName('./ons-switch'),
      PLATFORM.moduleName('./ons-tab'),
      PLATFORM.moduleName('./ons-tabbar')
    ]);
}
