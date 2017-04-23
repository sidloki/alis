import {Router} from 'aurelia-router';
import {inject, bindable} from 'aurelia-framework';
import {Database} from '../services/db';

@inject(Router, Database)
export class Home {
  constructor (router, db) {
    this.router = router;
    this.db = db;
  }
  }

  attached() {
    let map = L.map(this.map, {
      attributionControl: false
    });
    let markers = L.markerClusterGroup({
      maxClusterRadius: 40
    }).addTo(map);
    let roads = L.gridLayer.googleMutant({
      type: 'roadmap', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
      styles: [{
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }]
      }]
    }).addTo(map);
    map.setView([46.801111, 8.226667], 7);

    markers.on('click', (e) => {
      this.selection = e.layer.data;
    });

    this._map = map;

    this.db.data.buildings.forEach(building => {
      // TODO: marker icons
      let myIcon = L.divIcon({
        className: 'leaflet-system-icon fa fa-deaf',
        iconSize: 22
      });
      let marker = L.marker([building.lat, building.lng], {icon: myIcon}).addTo(markers);
      marker.data = building;
    });
  }

  showMenu() {
    let menu = document.getElementById('menu');
    menu.open();
  }

  showList() {
    this.router.navigateToRoute('list');
  }
}
