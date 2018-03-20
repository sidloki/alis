import {inject} from 'aurelia-framework';
import {Database} from './services/db';
import {_} from './plugins/aurelia-messageformat';

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
      title: _('pages.help.quickstart.title'),
      nav: true,
      settings: {}
    }, {
      route: 'help/reception',
      name: 'help-reception',
      moduleId: './pages/help/reception',
      nav: true,
      title: _('pages.help.reception.title'),
      settings: {}
    }, {
      route: 'help/video',
      name: 'help-video',
      moduleId: './pages/help/video',
      nav: true,
      title: _('pages.help.video.title'),
      settings: {}
    }, {
      route: 'help/symbols',
      name: 'help-symbols',
      moduleId: './pages/help/symbols',
      nav: true,
      title: _('pages.help.symbols.title'),
      settings: {}
    }, {
      route: 'add-system',
      name: 'add-system',
      moduleId: './pages/system/add',
      title: _('pages.add-system.title'),
      nav: true,
      settings: {}
    }, {
      route: 'sponsors',
      name: 'sponsors',
      moduleId: './pages/sponsors',
      nav: true,
      title: _('pages.sponsors.title'),
      settings: {}
    }, {
      route: 'impressum',
      name: 'impressum',
      moduleId: './pages/impressum',
      nav: true,
      title: _('pages.legal-notice.title'),
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
