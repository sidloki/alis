import ons from 'onsenui';
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
      maxClusterRadius: function(zoom) {
        if (zoom < 13) {
          return 80;
        } else if (zoom < 15) {
          return 50;
        } else if (zoom < 17) {
          return 30;
        } else {
          return 20;
        }
      },
      iconCreateFunction: function(cluster) {
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
  }

  selectionChanged(newValue, oldValue) {
    this.markers.clearLayers();
    if (newValue) {
      let marker = L.marker([newValue.lat, newValue.lng]);
      this.markers.addLayer(marker);
      this._selectionList.scrollTop = 0;
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
      let markerIcon;
      let buildingIcon = building.icon;
      if (buildingIcon) {
        markerIcon = L.divIcon({
          className: `leaflet-system-icon`,
          iconSize: 28,
          html: `<div style="background-color:${buildingIcon.color}"><span class="ons-icon ${buildingIcon.prefix} ${buildingIcon.prefix}-${buildingIcon.name}"></span></div>`
        });
      } else {
        markerIcon = L.divIcon({
          className: 'leaflet-system-icon',
          iconSize: 28,
          html: `<div>${building.systems.length}</div>`
        })
      }
      let marker = L.marker([building.lat, building.lng], {icon: markerIcon});
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

  showList() {
    this.router.navigateToRoute('list');
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
      this.locateControl._onDrag();
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
      this.locateControl._onDrag();
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
}
