import {inject} from 'aurelia-framework';
import {Database} from './services/db';

@inject(Database)
export class App {

  constructor(db) {
    this.db = db;
  }

  activate() {
    return this.db.load();
  }

  configureRouter(config, router) {
    config.title = 'Höranlagen';
    config.map([{
      route: ['', 'home'],
      name: 'home',
      moduleId: './pages/home',
      nav: false,
      title: 'Home'
    }, {
      route: 'list',
      name: 'list',
      moduleId: './pages/list',
      nav: false,
      title: 'List',
      options: {
        animation: 'lift'
      }
    }, {
      route: 'room/:id',
      name: 'room',
      moduleId: './pages/room/index',
      nav: false,
      title: 'Room'
    }]);
  }
}
