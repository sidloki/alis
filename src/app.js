import {inject} from 'aurelia-framework';
import {Database} from './services/db';

@inject(Database)
export class App {

  constructor(db) {
    this.db = db;
  }

  activate() {
    return this.db.loadData().catch(() => {
      return;
    });
  }

  configureRouter(config, router) {
    config.title = 'Höranlagen';
    config.map([{
      route: ['', 'home'],
      name: 'home',
      moduleId: './pages/home',
      nav: false
    }, {
      route: 'list',
      name: 'list',
      moduleId: './pages/list',
      nav: false,
      options: {
        animation: 'lift'
      }
    }, {
      route: 'room/:id',
      name: 'room',
      moduleId: './pages/room/info',
      nav: false
    }, {
      route: 'room/:id/plan',
      name: 'room-plan',
      moduleId: './pages/room/plan',
      nav: false
    }]);
    this.router = router;
  }

  navigateTo(item) {
    this._menu.close();
    this.router.navigateToRoute(item.config.name);
  }
}
