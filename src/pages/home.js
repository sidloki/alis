import ons from 'onsenui';
import {Router} from 'aurelia-router';
import {inject, bindable} from 'aurelia-framework';
import {Database} from '../services/db';
import {Search} from '../services/search';
import {Storage} from '../services/storage';

@inject(Router, Database, Storage, Search)
export class Home {
  @bindable selection;
  @bindable currentResults;
  categories;
  results;
  isFiltered;
  isLoading;

  constructor(router, db, storage, search) {
    this.router = router;
    this.db = db;
    this.storage = storage;
    this.search = search;

    this.isLoading = true;
  }

  attached() {
    if (ons.platform.isAndroid()) {
      this._map.classList.add('map--material');
    }
    this.map = L.map(this._map, {
      attributionControl: false
    });

    this.basemap = L.gridLayer.googleMutant({
      type: 'roadmap', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
      styles: [{
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }]
      }]
    }).addTo(this.map);

    this.buildingsLayer = L.markerClusterGroup({
      maxClusterRadius: 40
    }).addTo(this.map);

    this.markers = L.featureGroup().addTo(this.map);

    this.locateControl = L.control.locate({
      showPopup: false,
      locateControl: {}
    }).addTo(this.map);
    this.locateControl._start = this.locateControl.start.bind(this.locateControl);
    this.locateControl._stop = this.locateControl.stop.bind(this.locateControl);
    this.locateControl._setView = this.locateControl.setView.bind(this.locateControl);
    this.locateControl.stop = this.onLocateControlStop.bind(this);
    this.locateControl.start = this.onLocateControlStart.bind(this);
    this.locateControl.setView = this.onLocateControlSetView.bind(this);

    let mapbounds = this.storage.getItem('mapbounds');
    if (mapbounds) {
      this.map.fitBounds(mapbounds);
    } else {
      this.map.setView([46.801111, 8.226667], 7);
    }

    if (this.storage.getItem('geolocation')) {
      this.locateControl.start();
    }

    this.map.on('moveend', this.updateMapView, this);
    this.markers.on('click', this.onMarkerClick, this);
    this.buildingsLayer.on('click', this.onBuildingClick, this);
    this.buildingsLayer.on('dblclick', this.onBuildingDoubleClick, this);

    this.db.loadData().then(() => {
      this.buildings = this.db.data.buildings;
      this.categories = this.db.data.roomtypes;
      this.isLoading = false;
    });
  }

  onBuildingClick(e) {
    if (this.selection === e.layer.data && this.selection.rooms.length === 1) {
      this.showRoom(this.selection.rooms[0]);
    } else {
      this.selection = e.layer.data;
    }
  }

  onBuildingDoubleClick(e) {
    this.selection = e.layer.data;
    if (this.selection.rooms.length === 1) {
      this.showRoom(this.selection.rooms[0]);
    }
  }

  onMarkerClick(e) {
    if (this.selection && this.selection.rooms.length === 1) {
      this.showRoom(this.selection.rooms[0]);
    }
  }

  deselect() {
    this.selection = null;
  }

  selectionChanged(newValue, oldValue) {
    this.markers.clearLayers();
    if (newValue) {
      let marker = L.marker([newValue.lat, newValue.lng]);
      this.markers.addLayer(marker);
      this.roomlist.scrollTop = 0;
      setTimeout(() => {
        this.map.invalidateSize({
          pan: false
        });
        if (!this.map.getBounds().contains(marker.getLatLng())) {
          this.locateControl._onDrag();
          this.map.setView(marker.getLatLng(), this.map.getZoom());
          marker._bringToFront();
        }
      }, 50);
    } else {
      setTimeout(() => {
        this.map.invalidateSize({
          pan: false
        });
      }, 50);
    }
  }

  set buildings(value) {
    this.buildingsLayer.clearLayers();
    value.forEach(building => {
      // TODO: marker icons
      let icon;
      if (building.rooms.length === 1) {
        icon = L.divIcon({
          className: 'leaflet-system-icon fa fa-deaf',
          iconSize: 22
        });
      } else {
        icon = L.divIcon({
          className: 'leaflet-system-icon',
          iconSize: 22,
          html: building.rooms.length
        })
      }
      let marker = L.marker([building.lat, building.lng], {icon: icon});
      marker.data = building;
      this.buildingsLayer.addLayer(marker);
    });
  }

  get buildings() {
    return this.buildingsLayer.getLayers().map(layer => layer.data);
  }

  updateMapView(evt) {
    let bounds = evt.target.getBounds();
    this.storage.setItem('mapbounds', [
      [bounds.getSouth(), bounds.getWest()],
      [bounds.getNorth(), bounds.getEast()]
    ]);
  }

  onLocateControlStart() {
    this.storage.setItem('geolocation', true);
    this.locateControl.isLocatingStart = true;
    this.locateControl._start();
  }

  onLocateControlStop() {
    this.storage.setItem('geolocation', false);
    this.locateControl._stop();
  }

  onLocateControlSetView() {
    if (this.locateControl.isLocatingStart) {
      this.locateControl.isLocatingStart = false;
      this.locateControl.options.keepCurrentZoomLevel = false;
      this.locateControl.options.locateOptions.maxZoom = this.map.getZoom() < 15 ? 15 : this.map.getZoom();
      this.locateControl._setView();
      this.locateControl.options.keepCurrentZoomLevel = true;
      this.locateControl.options.locateOptions.maxZoom = Infinity;
    } else {
      this.locateControl._setView();
    }
  }

  getRoomName(room) {
    let name = `${room.raum} ${room.raumnummer}`.trim();
    if (!name) {
      name = room.gebaeude;
    }
    if (!name) {
      let type = this.db.data.roomtypes.find((type) => {
        return type.typID === room.typID;
      });
      name = type.typ;
    }
    return name;
  }

  showMenu() {
    let menu = document.getElementById('menu');
    menu.open();
  }

  showSearch() {
    this._search.show();
    this._searchinput.focus();
    this.isSearching = true;
    this.currentSearchText = this.searchText;
    this.currentResults = this.results;
  }

  cancelSearch() {
    this._search.hide();
    this.currentSearchText = '';
    this.currentResults = {};
    this.isSearching = false;
  }

  clearSearch() {
    this.searchText = this.currentSearchText = '';
    this.buildings = this.db.data.buildings;
    this.selection = null;
  }

  showList() {
    this.router.navigateToRoute('list');
  }

  showRoom(room) {
    this.router.navigateToRoute('room', {id: room.anlageID});
  }

  searchCategory(item) {
    this.isFiltered = true;
    this._search.hide();
    this.searchText = this.currentSearchText = item.typ;
    this.buildings = this.db.queryBuildingsByRoomType(item);
    this.results = this.currentResults = {
      buildings: this.buildings,
      locations: []
    };
    this.selection = null;
    this.zoomToNearest();
  }

  zoomToNearest() {
    let center = this.map.getCenter();
    let closest = L.GeometryUtil.closestLayer(this.map, this.buildingsLayer.getLayers(), center);
    if (!this.map.getBounds().contains(closest.layer.getLatLng())) {
      let bounds = L.latLngBounds(closest.layer.getLatLng(), center);
      this.locateControl._onDrag();
      this.map.fitBounds(bounds, {
        maxZoom: this.map.getZoom(),
        padding: [40, 40]
      });
    }
  }

  clearCurrentSearch() {
    this.currentSearchText = '';
    this.currentResults = {
      buildings: [],
      locations: []
    };
    this._searchinput.focus();
  }

  onBuildingResultClick(building) {
    if (!this.isFiltered) {
      this.buildings = this.db.data.buildings;
    }
    this.searchText = this.currentSearchText;
    this.results = this.currentResults;
    this.selection = null;
    this._search.hide();
    this.map.once('moveend', () => {
      this.selection = building;
    });
    this.locateControl._onDrag();
    this.map.setView([building.lat, building.lng], 17);
  }

  onLocationResultClick(location) {
    if (!this.isFiltered) {
      this.buildings = this.db.data.buildings;
    }
    this.searchText = this.currentSearchText;
    this.results = this.currentResults;
    this.selection = null;
    this._search.hide();
    this.locateControl._onDrag();
    this.map.fitBounds(location.bounds);
  }

  onSearch() {
    this.currentResults = this.search.execute(this.currentSearchText, 20);
  }

  onSearchInput() {
    this.isFiltered = false;
    this.currentResults = this.search.execute(this._searchinput.value, 10);
  }
}
