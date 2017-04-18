import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class List {
  constructor (router) {
    this.title = 'Anlagen';
    this.router = router;
  }
}
