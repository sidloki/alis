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
        // data loaded
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
      route: 'quickstart',
      name: 'quickstart',
      moduleId: './pages/help/quickstart',
      title: 'Quickstart',
      nav: true,
      settings: {}
    }, {
      route: 'help/reception',
      name: 'help-reception',
      moduleId: './pages/help/reception',
      nav: true,
      title: 'Informationen zu Hörhilfen',
      settings: {}
    }, {
      route: 'help/video',
      name: 'help-video',
      moduleId: './pages/help/video',
      nav: true,
      title: 'Video: Wie funktioniert eine Höranlage?',
      settings: {}
    }, {
      route: 'help/symbols',
      name: 'help-symbols',
      moduleId: './pages/help/symbols',
      nav: true,
      title: 'Informationen zu Höranlagen',
      settings: {}
    }, {
      route: 'add-system',
      name: 'add-system',
      moduleId: './pages/system/add',
      title: 'Neue Höranlage melden',
      nav: true,
      settings: {}
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
      route: 'system/:id/:plan',
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
