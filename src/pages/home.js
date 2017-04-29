import {Router} from 'aurelia-router';
import {inject, bindable} from 'aurelia-framework';
import {Database} from '../services/db';
import {Storage} from '../services/storage';

@inject(Router, Database, Storage)
export class Home {
  @bindable selection;

  constructor (router, db, storage) {
    this.router = router;
    this.db = db;
    this.storage = storage;
  }

  attached() {
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
    this.markers = L.markerClusterGroup({
      maxClusterRadius: 40
    }).addTo(this.map);
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

    this.markers.on('click', (e) => {
      this.selection = e.layer.data;
    });

    this.db.data.buildings.forEach(building => {
      // TODO: marker icons
      let myIcon = L.divIcon({
        className: 'leaflet-system-icon fa fa-deaf',
        iconSize: 22
      });
      let marker = L.marker([building.lat, building.lng], {icon: myIcon}).addTo(this.markers);
      marker.data = building;
    });
  }

  deselect() {
    this.selection = null;
  }

  selectionChanged(newValue, oldValue) {
    if (newValue) {
      this.roomlist.scrollTop = 0;
    }
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

  showList() {
    this.router.navigateToRoute('list');
  }

  showRoom(room) {
    this.router.navigateToRoute('room', {id: room.anlageID});
  }
}
