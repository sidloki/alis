import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router)
export class Home {
  constructor (router) {
    this.router = router;
  }

  attached() {
    let map = new L.Map(this.map);
    let roads = L.gridLayer.googleMutant({
      type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    }).addTo(map);
    map.setView([46.801111, 8.226667], 7);
  }

  showMenu() {
    let menu = document.getElementById('menu');
    menu.open();
  }

  showList() {
    this.router.navigateToRoute('list');
  }
}
