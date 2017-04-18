export class App {

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
    }]);
  }
}
