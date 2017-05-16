import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Index {

  constructor(router) {
    this.router = router;
    this.navigation = router.routes.filter(route => route.settings.category === 'help');
  }

  activate(params, routeConfig) {
    this.title = routeConfig.title;
  }

  navigateTo(item) {
    this.router.navigateToRoute(item.name);
  }
}
