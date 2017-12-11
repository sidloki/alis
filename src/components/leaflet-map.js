import {inject, bindable} from 'aurelia-framework';
import {Storage} from '../services/storage';
import {Config} from '../services/config';
import {State} from '../services/state';

@inject(Element, Config, State, Storage)
export class LeafletMap {

  mapOptions = {
    attributionControl: false
  };

  @bindable() center;
  @bindable() bounds;
  @bindable() fixed = false;
  @bindable() layerControl = true;
  @bindable() zoomControl = true;
  @bindable() overlays;

  constructor(element, config, state, storage) {
    this.el = element;
    this.config = config;
    this.state = state;
    this.storage = storage;

    this.baseLayers = new Map();
    this._overlays = [];

    for (let baseLayer of this.config.basemaps) {
      if (baseLayer.type === 'google') {
        this.baseLayers.set(baseLayer.id, L.gridLayer.googleMutant(baseLayer.config));
      }
    }
  }

  attached() {
    if (!this.bounds) {
      this.bounds = L.latLngBounds(this.state.mapBounds);
    }

    this.mapOptions.zoomControl = this.zoomControl;
    if (!this.map) {
      this.map = L.map(this.mapContainer, this.mapOptions);
    }

    this.map.addLayer(this.baseLayers.get(this.state.baseLayerId));

    if (this.bounds) {
      this.map.fitBounds(this.bounds);
    } else {
      this.map.setView(this.config.map.center, this.config.map.zoom);
    }
    this.updateOverlays();
    this.map.on('click', this.onMapClick.bind(this));
  }

  centerChanged(newValue) {
    if (newValue) {
      this.map.setView(newValue, this.map.getZoom());
    }
  }

  boundsChanged(newValue) {
    if (newValue && this.map) {
      this.map.fitBounds(newValue);
    }
  }

  fixedChanged(newValue) {
    let cssClassFixed = 'leaflet-map-fixed';
    if (newValue === true) {
      this.el.classList.add(cssClassFixed);
    } else {
      this.el.classList.remove(cssClassFixed);
    }
  }

  overlaysChanged(newValue, oldValud) {
    if (this.map) {
      this.updateOverlays();
    }
  }

  updateOverlays() {
    let overlays = this.overlays || [];
    for (let layer of this._overlays) {
      this.map.removeLayer(layer);
    }
    for (let overlay of overlays) {
      let layer;
      if (overlay.type === 'marker') {
        layer = L.marker(overlay.latLng).addTo(this.map);
      }
      layer.data = overlay;
      this._overlays.push(layer);
    }
  }

  showLayerControl() {
    this.layerControlEl.show(this.layerControlTargetEl);
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

  onMapClick(e) {
    var event = new CustomEvent('mapclick', { detail: e });
    this.el.dispatchEvent(event);
  }
}
