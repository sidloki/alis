import {inject, bindable} from 'aurelia-framework';
import {Storage} from '../services/storage';
import {Config} from '../services/config';
import {State} from '../services/state';

@inject(Element, Config, State, Storage)
export class LeafletLayerControlCustomElement {

  @bindable() map;

  constructor(element, config, state, storage) {
    this.el = element;
    this.config = config;
    this.state = state;

    this.baseLayers = new Map();
    this.overlays = new Map();

    for (let basemap of this.config.basemaps) {
      if (basemap.type === 'google') {
        this.baseLayers.set(basemap.id, L.gridLayer.googleMutant(basemap.config));
      }
    }
    this.button = L.easyButton('zmdi zmdi-layers', this.showLayerControl.bind(this), {
      position: 'topright'
    });
  }

  mapChanged(newValue) {
    if (this.map) {
      this.button.addTo(this.map);
      this.popoverTarget = this.button.getContainer();
    }
  }

  showLayerControl() {
    this.layerControlEl.show(this.popoverTarget);
  }

  hideLayerControl() {
    this.layerControlEl.hide();
  }

  changeBaseLayer(id) {
    let currentId = this.state.baseLayerId;
    if (id !== currentId) {
      this.map.removeLayer(this.baseLayers.get(currentId));
      this.map.addLayer(this.baseLayers.get(id));
      this.state.baseLayerId = id;
    }
  }
}
