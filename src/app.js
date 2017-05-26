import {inject} from 'aurelia-framework';
import {Database} from './services/db';

@inject(Database)
export class App {

  constructor(db) {
    this.db = db;
  }

  activate() {
    return this.db.load()
      .then(() => {
        // console.log("Data loaded");
      }).catch(() => {
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
      route: 'help',
      name: 'help',
      moduleId: './pages/help/index',
      nav: true,
      title: 'Hilfe',
      settings: {}
    }, {
      route: 'help/reception',
      name: 'help-reception',
      moduleId: './pages/help/reception',
      nav: false,
      title: 'Drahtloser Empfang',
      settings: {
        category: 'help'
      }
    }, {
      route: 'help/hearing-loop',
      name: 'help-hearing-loop',
      moduleId: './pages/help/hearing-loop',
      nav: false,
      title: 'Informationen zu Höranlagen',
      settings: {
        category: 'help'
      }
    }, {
      route: 'help/symbols',
      name: 'help-symbols',
      moduleId: './pages/help/symbols',
      nav: false,
      title: 'Symbole',
      settings: {
        category: 'help'
      }
    }, {
      route: 'sponsors',
      name: 'sponsors',
      moduleId: './pages/sponsors',
      nav: true,
      title: 'Sponsoren',
      settings: {}
    }, {
      route: 'impressum',
      name: 'impressum',
      moduleId: './pages/impressum',
      nav: true,
      title: 'Impressum',
      settings: {}
    }, {
      route: 'system/:id',
      name: 'system',
      moduleId: './pages/system/info',
      nav: false
    }, {
      route: 'system/:id/plan',
      name: 'system-plan',
      moduleId: './pages/system/plan',
      nav: false
    }]);
    this.router = router;
  }

  navigateTo(item) {
    this._menu.close();
    this.router.navigateToRoute(item.config.name);
  }
}
