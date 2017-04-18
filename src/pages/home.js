import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router)
export class Home {
  constructor (router) {
    this.router = router;
  }

  showMenu() {
    let menu = document.getElementById('menu');
    menu.open();
  }

  showList() {
    this.router.navigateToRoute('list');
  }
}
