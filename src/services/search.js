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
    this.isFiltered = false;
    this.text = null;
    this.dataset = this.db.query(System).all();
    this.results = {
      locations: [],
      systems: []
    };
  }

  sort(center) {
    this.dataset = this.dataset.sort((a, b) => {
      let distanceA = center.distanceTo(L.latLng(a.lat, a.lng));
      let distanceB = center.distanceTo(L.latLng(b.lat, b.lng));
      return distanceA - distanceB;
    });
    if (this.isFiltered) {
      this.results = {
        locations: [],
        systems: []
      };
      this.results.systems = this.dataset.slice(0, 10);
    } else if (this.text) {
      this.results = this.execute(this.text);
    }
  }

  filter(systems) {
    let lookup = new Map();
    this.isFiltered = true;
    this.dataset = [];
    for (let system of systems) {
      let building = system.building;
      let organisation = system.organisation;
      let lookupId = `${building.id}-${organisation.id}`;
      if (!lookup.has(lookupId)) {
        lookup.set(lookupId, system);
        this.dataset.push(system);
      }
    }
  }

  execute(text, count=10) {
    console.log("Exec search");
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

    let lookup = new Map();
    for (let system of this.dataset) {
      let building = system.building;
      let organisation = system.organisation;
      let lookupId = `${building.id}-${organisation.id}`;
      if (!lookup.has(lookupId)) {
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
          lookup.set(lookupId, system);
          results.systems.push(system);
        }
      }
      if (lookup.size === count) {
        break;
      }
    }

    return results;
  }
}
