import {inject} from 'aurelia-framework';
import {Database} from './services/db';

@inject(Database)
export class App {

  constructor(db) {
    this.db = db;
  }

  activate() {
    return this.db.load().catch(() => {
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
      route: 'search',
      name: 'search',
      moduleId: './pages/search',
      nav: false,
      settings: {
        navigator: {
          animation: 'fade-ios',
          animationOptions: {
            duration: 0.1
          }
        }
      }
    }, {
      route: 'room/:id',
      name: 'room',
      moduleId: './pages/room/index',
      nav: false
    }]);
  }
}
