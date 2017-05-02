import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Database} from '../services/db';

@inject(Router, EventAggregator, Database)
export class Search {
  @bindable searchText;

  constructor(router, events, db) {
    this.router = router;
    this.events = events;
    this.db = db;
  }

  activate() {
    this.categories = this.db.data.roomtypes;
  }

  attached() {
    this._searchinput.focus();
  }


  clearSearch() {
    this.searchText = null;
  }

  searchTextChanged(newValue, oldValue) {
    console.log(newValue);
  }

  searchCategory(item) {
    this._searchinput.value = item.typ;

    this.events.publish('search', {
      text: item.typ,
      type: 'roomtype',
      value: item.typID
    });
    this._backbutton.onClick();
  }
}
