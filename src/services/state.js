import {inject} from 'aurelia-framework';
import {Config} from './config';
import {Storage} from './storage';

@inject(Config, Storage)
export class State {

  basemapId;

  constructor(config, storage) {
    this.config = config;
    this.storage = storage;

    this.baseLayerId = this.config.map.basemap;
  }
}
