import * as ResizeObserver from 'resize-observer-polyfill';
import * as ons from 'onsenui';
import {Router} from 'aurelia-router';
import {inject, bindable} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Config} from '../services/config';
import {Database} from '../services/db';
import {State} from '../services/state';
import {Search} from '../services/search';
import {Storage} from '../services/storage';
import {Building} from '../models/building';
import {RoomType} from '../models/room-type';
import {System} from '../models/system';
import {_} from '../plugins/aurelia-messageformat';

@inject(Router, Database, Storage, Search, Config, State)
export class Home {
  searchText;
  searchResults;
  @bindable()
  isSearching = false;
  categories;

  @bindable()
  state;

  constructor(router, db, storage, search, config, state) {
    this.router = router;
    this.db = db;
    this.storage = storage;
    this.search = search;
    this.config = config;
    this.state = state;

    // init basemaps
    this.baseLayers = new Map();
    for (let basemap of this.config.basemaps) {
      if (basemap.type === 'google') {
        this.baseLayers.set(basemap.id, L.gridLayer.googleMutant(basemap.config));
      }
    }

    // init map overlays
    this.overlays = new Map();
    this.overlays.set('buildings', L.markerClusterGroup({
      maxClusterRadius: this.getMaxClusterRadius,
      iconCreateFunction: this.createClusterIcon
    }));
    this.overlays.set('marker', L.marker(null, { pane: 'selection' }));

    // init map controls
    this.controls = new Map();

    let locateControl = L.control.locate({
      showPopup: false,
      onLocationError: (error) => {
        ons.notification.alert(_('error.geolocation.message'), {
          title: _('error.geolocation.title')
        });
      },
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

    this.onPopState = this._onPopState.bind(this);
  }

  attached() {
    let mapSizeObserver = new ResizeObserver(this.resizeMap.bind(this));
    let buildingsLayer = this.overlays.get('buildings');
    let markerLayer = this.overlays.get('marker');
    let locateControl = this.controls.get('locate');
    let mapbounds = this.state.mapBounds;
    let geolocation = this.storage.getItem('geolocation');

    this.map = L.map(this._map, {
      attributionControl: false
    });

    // create pane for selection marker
    this.map.createPane('selection');
    this.map.getPane('selection').style.zIndex = 625;

    this.map.addLayer(this.baseLayers.get(this.state.baseLayerId));
    this.map.addLayer(buildingsLayer);
    this.map.addControl(locateControl);

    this.map.fitBounds(mapbounds);

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
    this.db.sortByDistance(this.map.getCenter());

    PLATFORM.addEventListener('popstate', this.onPopState);
    if (this.router.history.getState('SearchOverlay') && this.router.isNavigatingRefresh) {
      this.router.history.navigateBack();
    }
  }

  detached() {
    PLATFORM.removeEventListener('popstate', this.onPopState);
  }

  _onPopState(e) {
    if (!e.state) {
      return;
    }
    if (this.router.history.getState('SearchOverlay') && !this.isSearching) {
      this.showSearch();
    } else if (!this.router.history.getState('SearchOverlay') && this.isSearching) {
      this._searchinput.blur();
      this.cancelSearch();
    }
  }

  onToolbarClick(e) {
    if (this.router.history.getState('PopoverTracker')) {
      e.stopPropagation();
      this._searchinput.blur();
      this.router.history.navigateBack();
    }
  }

  isSearchingChanged(newValue, oldValue) {
    if (newValue && !this.router.history.getState('SearchOverlay')) {
      this.router.history.pushState('SearchOverlay', new Date().getTime());
    } else if (!newValue && this.router.history.getState('SearchOverlay')) {
      this.router.history.navigateBack();
    }
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

  set selection(value) {
    let marker = this.overlays.get('marker');
    if (value) {
      marker.setLatLng([value.lat, value.lng]);
      marker.data = value;
      this.map.addLayer(marker);
      this.panToSelection({animate: false});
      marker._bringToFront();
      this._selectionList.scrollTop = 0;
    } else {
      this.map.removeLayer(marker);
      marker.data = null;
    }
  }

  get selection() {
    let marker = this.overlays.get('marker');
    return marker.data;
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
    return layer.getLayers().map(l => l.data);
  }

  updateMapView(evt) {
    let mapSize = evt.target.getSize();
    if (mapSize.x !== 0 && mapSize.y !== 0) {
      let bounds = evt.target.getBounds();
      this.storage.setItem('mapbounds', [
        [bounds.getSouth(), bounds.getWest()],
        [bounds.getNorth(), bounds.getEast()]
      ]);
    }
  }

  showMenu() {
    let menu = document.getElementById('menu');
    menu.open();
  }

  showSearch() {
    if (!this.isSearching) {
      this.isSearching = true;
      this._searchoverlay.scrollTop = 0;
      this.db.sortByDistance(this.map.getCenter());
      this.searchText = this.search.text;
      this.search.update(this.search.text);
      this.searchResults = this.search.results;
      this.searchText = this.search.text;
    }
  }

  cancelSearch() {
    this.isSearching = false;
    this.searchText = this.search.text;
  }

  clearSearch() {
    if (this.isSearching) {
      this.search.applyFilter = false;
      this.search.update(null);
      this.searchText = null;
      this.searchResults = this.search.results;
      this._searchinput.focus();
    } else {
      this.search.reset();
      this.buildings = this.db.query(System).groupByRelation(Building).all();
      this.selection = null;
      this.searchText = this.search.text;
      this.searchResults = this.search.results;
    }
  }

  showInfo(system) {
    this.router.navigateToRoute('system', {id: system.id});
  }

  searchCategory(item) {
    this.isSearching = false;
    this.buildings = this.db.query(System).filterBy('typID', item.id).groupByRelation(Building).all();
    this.search.filter = {
      property: 'typID',
      value: item.id
    };
    this.searchText = this.search.text = item.name;
    this.selection = null;
    this.zoomToNearest();
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

  onResultClick(system) {
    let query = this.search.query.groupByRelation(Building);
    this.isSearching = false;
    this.buildings = query.all();
    this.search.text = this.searchText;
    this.selection = null;
    this.map.once('moveend', () => {
      this.selection = query.getById(system.building.id);
    });
    this.disableGeolocationTracking();
    this.map.setView([system.building.lat, system.building.lng], 17);
  }

  onLocationResultClick(location) {
    this.isSearching = false;
    let query = this.search.query.groupByRelation(Building);
    this.buildings = query.all();
    this.search.text = this.searchText;
    this.selection = null;
    this.disableGeolocationTracking();
    this.map.fitBounds(location.bounds);
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
      if (this.search.applyFilters) {
        this.search.applyFilters = false;
        this.search.update();
      }
      this.searchResults = this.search.execute(value);
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
      this.map.once('resize', e => {
        if (e.oldSize.x !== 0 && e.oldSize.y !== 0 && e.newSize.x !== 0 && e.newSize.y !== 0) {
          let marker = this.overlays.get('marker');
          this.panToSelection({animate: true});
          marker._bringToFront();
        }
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
      html =
        `<div style="background-color:${icon.color}">
          <span class="ons-icon ${icon.prefix} ${icon.prefix}-${icon.name}"></span>
        </div>`;
    } else {
      html = `<div>${building.systems.length}</div>`;
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
    let childCount = cluster.getChildCount();

    let c = ' marker-cluster-';
    let size = 22;
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
    }
    return 20;
  }
}
