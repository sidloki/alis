import ons from 'onsenui';
import ResizeObserver from 'resize-observer-polyfill';
import {Router} from 'aurelia-router';
import {inject, bindable} from 'aurelia-framework';
import {Database} from '../services/db';
import {Search} from '../services/search';
import {Storage} from '../services/storage';
import {Building} from '../models/building';
import {RoomType} from '../models/room-type';
import {System} from '../models/system';
import {Organisation} from '../models/organisation';

@inject(Router, Database, Storage, Search)
export class Home {
  @bindable selection;
  @bindable currentResults;
  categories;
  results;
  isFiltered;

  constructor(router, db, storage, search) {
    this.router = router;
    this.db = db;
    this.storage = storage;
    this.search = search;

    // init basemaps
    this.basemaps = new Map();
    this.basemaps.set('roadmap', L.gridLayer.googleMutant({
      type: 'roadmap', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
      styles: [{
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }]
      }]
    }));

    // init map overlays
    this.overlays = new Map();
    this.overlays.set('buildings', L.markerClusterGroup({
      maxClusterRadius: this.getMaxClusterRadius,
      iconCreateFunction: this.createClusterIcon
    }));
    this.overlays.set('marker', L.marker());

    // init map controls
    this.controls = new Map();

    let locateControl = L.control.locate({
      showPopup: false,
      locateControl: {}
    });

    // locate control tweaks to intercept geolocation start and stop
    locateControl._start = locateControl.start.bind(locateControl);
    locateControl._stop = locateControl.stop.bind(locateControl);
    locateControl._setView = locateControl.setView.bind(locateControl);
    locateControl.stop = this.stopGeolocation.bind(this);
    locateControl.start = this.startGeolocation.bind(this);
    locateControl.setView = this.setGeolocationView.bind(this);

    this.controls.set('locate', locateControl);
  }

  attached() {
    let mapSizeObserver = new ResizeObserver(this.resizeMap.bind(this));
    let basemapLayer = this.basemaps.get('roadmap');
    let buildingsLayer = this.overlays.get('buildings');
    let markerLayer = this.overlays.get('marker');
    let locateControl = this.controls.get('locate');
    let mapbounds = this.storage.getItem('mapbounds');
    let geolocation = this.storage.getItem('geolocation');

    if (ons.platform.isAndroid()) {
      this._map.classList.add('map--material');
    }
    this.map = L.map(this._map, {
      attributionControl: false
    });

    this.map.addLayer(basemapLayer);
    this.map.addLayer(buildingsLayer);
    this.map.addControl(locateControl);

    if (mapbounds) {
      this.map.fitBounds(mapbounds);
    } else {
      this.map.setView([46.801111, 8.226667], 7);
    }

    if (geolocation) {
      locateControl.start();
    }

    this.map.on('moveend', this.updateMapView, this);
    markerLayer.on('click', this.onMarkerClick, this);
    buildingsLayer.on('click', this.onBuildingClick, this);
    buildingsLayer.on('dblclick', this.onBuildingDoubleClick, this);

    mapSizeObserver.observe(this._map);

    this.buildings = this.db.query(System).groupByRelation(Building).all();
    this.categories = this.db.query(RoomType).all();
    this.search.sort(this.map.getCenter());
  }

  onBuildingClick(e) {
    if (this.selection === e.layer.data && this.selection.systems.length === 1) {
      this.showInfo(this.selection.systems[0]);
    } else {
      this.selection = e.layer.data;
    }
  }

  onBuildingDoubleClick(e) {
    this.selection = e.layer.data;
    if (this.selection.systems.length === 1) {
      this.showInfo(this.selection.systems[0]);
    }
  }

  onMarkerClick(e) {
    if (this.selection && this.selection.systems.length === 1) {
      this.showInfo(this.selection.systems[0]);
    }
  }

  deselect() {
    this.selection = null;
    this._selectionList.scrollTop = 0;
  }

  selectionChanged(newValue, oldValue) {
    let marker = this.overlays.get('marker');
    if (oldValue) {
      this.map.removeLayer(marker);
    }
    if (newValue) {
      marker.setLatLng([newValue.lat, newValue.lng]);
      this.map.addLayer(marker);
      this.panToSelection({animate: false});
      marker._bringToFront();
      this._selectionList.scrollTop = 0;
    }
  }

  set buildings(value) {
    let layer = this.overlays.get('buildings');
    layer.clearLayers();
    value.forEach(building => {
      let marker = this.createBuildingMarker(building);
      marker.data = building;
      layer.addLayer(marker);
    });
  }

  get buildings() {
    let layer = this.overlays.get('buildings');
    return layer.getLayers().map(layer => layer.data);
  }

  updateMapView(evt) {
    let bounds = evt.target.getBounds();
    this.storage.setItem('mapbounds', [
      [bounds.getSouth(), bounds.getWest()],
      [bounds.getNorth(), bounds.getEast()]
    ]);
  }

  showMenu() {
    let menu = document.getElementById('menu');
    menu.open();
  }

  showSearch() {
    let center = this.map.getCenter();
    this.searchExec = false;
    this._search.show();
    this._searchinput.focus();
    this.search.sort(this.map.getCenter());
    this.currentSearchText = this.search.text;
    this.currentResults = this.search.results;
  }

  cancelSearch() {
    this._search.hide();
  }

  clearSearch() {
    this.search.reset();
    this.searchText = this.currentSearchText = this.search.text;
    this.buildings = this.db.query(System).groupByRelation(Building).all();
    this.selection = null;
  }

  showInfo(system) {
    this.router.navigateToRoute('system', {id: system.id});
  }

  searchCategory(item) {
    this._search.hide().then(() => {
      let systems = this.db.query(System).filterBy('typID', item.id);
      this.search.isFiltered = true;
      this.search.text = item.typ;
      this.searchText = this.currentSearchText = this.search.text;
      this.buildings = systems.groupByRelation(Building).all();
      this.selection = null;
      this.zoomToNearest();

      let center = this.map.getCenter();
      this.search.filter(systems.all());
      this.search.sort(this.map.getCenter());
    });
  }

  zoomToNearest() {
    let center = this.map.getCenter();
    let layer = this.overlays.get('buildings');
    let closest = L.GeometryUtil.closestLayer(this.map, layer.getLayers(), center);
    if (!this.map.getBounds().contains(closest.layer.getLatLng())) {
      let bounds = L.latLngBounds(closest.layer.getLatLng(), center);
      this.disableGeolocationTracking();
      this.map.fitBounds(bounds, {
        maxZoom: this.map.getZoom(),
        padding: [40, 40]
      });
    }
  }

  clearCurrentSearch() {
    this.currentSearchText = '';
    this.currentResults = {
      systems: [],
      locations: []
    };
    this._searchinput.focus();
  }

  onResultClick(system) {
    this._search.hide().then(() => {
      let query = this.db.query(System).groupByRelation(Building);
      if (!this.search.isFiltered) {
        this.buildings = query.all();
      }
      this.search.text = this.currentSearchText;
      this.search.results = this.currentResults;
      this.searchText = this.search.text ;
      this.results = this.currentResults;
      this.selection = null;
      this.map.once('moveend', () => {
        this.selection = query.getById(system.building.id);
      });
      this.disableGeolocationTracking();
      this.map.setView([system.building.lat, system.building.lng], 17);
    });
  }

  onLocationResultClick(location) {
    this._search.hide().then(() => {
      this.buildings = this.db.query(System).groupByRelation(Building).all();
      this.search.text = this.currentSearchText;
      this.search.results = this.currentResults;
      this.searchText = this.currentSearchText;
      this.results = this.currentResults;
      this.selection = null;
      this.disableGeolocationTracking();
      this.map.fitBounds(location.bounds);
    });
  }

  onSearch() {
    this.onSearchInput();
  }

  onSearchInput() {
    let value = this._searchinput.value;
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      if (this.search.isFiltered) {
        this.search.isFiltered = false;
        this.search.reset();
        this.search.sort(this.map.getCenter());
      }
      this.currentResults = this.search.execute(value);
      this.searchExec = true;
    }, 500);
  }

  startGeolocation() {
    let locateControl = this.controls.get('locate');
    this.storage.setItem('geolocation', true);
    locateControl.isLocatingStart = true;
    locateControl._start();
  }

  stopGeolocation() {
    let locateControl = this.controls.get('locate');
    this.storage.setItem('geolocation', false);
    locateControl._stop();
  }

  setGeolocationView() {
    let locateControl = this.controls.get('locate');
    if (locateControl.isLocatingStart) {
      locateControl.isLocatingStart = false;
      locateControl.options.keepCurrentZoomLevel = false;
      locateControl.options.locateOptions.maxZoom = this.map.getZoom() < 15 ? 15 : this.map.getZoom();
      locateControl._setView();
      locateControl.options.keepCurrentZoomLevel = true;
      locateControl.options.locateOptions.maxZoom = Infinity;
    } else {
      locateControl._setView();
    }
  }

  disableGeolocationTracking() {
    let locateControl = this.controls.get('locate');
    locateControl._onDrag();
  }

  resizeMap() {
    if (this.selection) {
      this.map.once('moveend', () => {
        this.panToSelection({animate: true});
      });
    }
    this.map.invalidateSize({pan: false});
  }

  panToSelection(options) {
    let coords = L.latLng(this.selection.lat, this.selection.lng);
    let bounds = this.map.getBounds();
    if (!bounds.contains(coords)) {
      this.map.panTo(coords, options);
    }
  }

  createBuildingMarker(building) {
    let icon = building.icon;
    let iconSize = 28;
    let className = 'leaflet-building-icon';
    let html;
    if (icon) {
      html = `<div style="background-color:${icon.color}"><span class="ons-icon ${icon.prefix} ${icon.prefix}-${icon.name}"></span></div>`;
    } else {
      html = `<div>${building.systems.length}</div>`
    }

    return L.marker([building.lat, building.lng], {
      icon: L.divIcon({
        className: className,
        iconSize: iconSize,
        html: html
      })
    });
  }

  createClusterIcon(cluster) {
    var childCount = cluster.getChildCount();

    var c = ' marker-cluster-';
    var size = 22;
    if (childCount < 10) {
      c += 'small';
    } else if (childCount < 100) {
      c += 'medium';
      size = 26;
    } else {
      c += 'large';
      size = 30;
    }

    return new L.DivIcon({
      html: '<div>' + childCount + '</div>',
      className: 'marker-cluster' + c,
      iconSize: size
    });
  }

  getMaxClusterRadius(zoom) {
    if (zoom < 13) {
      return 80;
    } else if (zoom < 15) {
      return 50;
    } else if (zoom < 17) {
      return 30;
    } else {
      return 20;
    }
  }
}
