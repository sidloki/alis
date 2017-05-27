import {inject} from 'aurelia-framework';
import {Database} from './db';
import {Location} from '../models/location';
import {System} from '../models/system';
import {Building} from '../models/building';

@inject(Database)
export class Search {

  constructor(db) {
    this.db = db;
    this.reset();
  }

  reset() {
    this.text = null;
    this.filter = null;
    this.applyFilters = true;
    this.dataset = [];
    this.results = {
      locations: [],
      systems: []
    };
  }

  update(searchText=null) {
    this.query = this.db.query(System);

    if (this.applyFilters && this.filter) {
      this.query.filterBy(this.filter.property, this.filter.value);
    }

    this.dataset = this.query.all();

    if (this.applyFilters) {
      let lookups = new Map();
      this.results = {
        locations: [],
        systems: []
      };

      for (let system of this.dataset) {
        let building = system.building;
        let organisation = system.organisation;
        let lookupId = `${building.id}-${organisation.id}`;
        if (!lookups.has(lookupId)) {
          lookups.set(lookupId, system);
          this.results.systems.push(system);
        }
        if (this.results.systems.length === 20) {
          break;
        }
      }
    } else if (searchText) {
      this.results = this.execute(searchText);
    }
  }

  execute(text, count=10) {
    let results = {
      locations: [],
      systems: []
    }

    text = text.trim().toLowerCase().split(' ').filter(word => word !== '');

    for (let location of this.db.query(Location).all()) {
      let searchString = `${location.name} ${location.plzs}`.toLowerCase();
      let matches = 0;
      for (let i = 0; i < text.length; i++) {
        let word = text[i];
        if (searchString.indexOf(word) > -1) {
          matches++;
        }
      }
      if (matches === text.length) {
        results.locations.push(location);
      }
      if (results.locations.length === 3) {
        break;
      }
    }

    let lookups = new Map();
    for (let system of this.dataset) {
      let building = system.building;
      let organisation = system.organisation;
      let lookupId = `${building.id}-${organisation.id}`;
      if (!lookups.has(lookupId)) {
        let matches = 0;
        let searchString = `${building.name} ${building.strasse_nr} ${building.ort} ${building.plz} ${building.canton.kantonkuerzel} ${organisation.name} ${system.roomtype.typ}`;
        searchString = searchString.toLowerCase();
        for (let i = 0; i < text.length; i++) {
          let word = text[i];
          if (searchString.indexOf(word) > -1) {
            matches++;
          }
        }
        if (matches === text.length) {
          lookups.set(lookupId, system);
          results.systems.push(system);
        }
      }
      if (results.systems.length === count) {
        break;
      }
    }

    return results;
  }
}
