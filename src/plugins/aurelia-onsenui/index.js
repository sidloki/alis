export {OnsBackButton} from './ons-back-button';
export {OnsIcon} from './ons-icon';
export {OnsNavigator} from './ons-navigator';
export {OnsRange} from './ons-range';
export {OnsSelect} from './ons-select';
export {OnsSwitch} from './ons-switch';
export {OnsTab} from './ons-tab';
export {OnsTabbar} from './ons-tabbar';

import {PLATFORM} from 'aurelia-pal';

export function configure(config) {
  config
    .globalResources([
      PLATFORM.moduleName('./ons-back-button'),
      PLATFORM.moduleName('./ons-icon'),
      PLATFORM.moduleName('./ons-navigator'),
      PLATFORM.moduleName('./ons-range'),
      PLATFORM.moduleName('./ons-select'),
      PLATFORM.moduleName('./ons-switch'),
      PLATFORM.moduleName('./ons-tab'),
      PLATFORM.moduleName('./ons-tabbar')
    ]);
}
