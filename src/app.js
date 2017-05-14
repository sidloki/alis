export class App {

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
  }
}
