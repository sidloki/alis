import {inject} from 'aurelia-framework';
import {Database} from './db';

@inject(Database)
export class Search {

  constructor(db) {
    this.db = db;
  }

  execute(text, count=10) {
    let results = {
      locations: [],
      buildings: []
    }

    text = text.trim();

    if (text.length < 3) {
      return results;
    }

    text = text.toLowerCase().split(' ').filter(word => word !== '');

    for (let i = 0; i < this.db.data.locations.length; i++) {
      let location = this.db.data.locations[i];
      let searchString = `${location.name} ${location.plz}`.toLowerCase();
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

    for (let i = 0; i < this.db.data.buildings.length; i++) {
      let building = this.db.data.buildings[i];
      let searchString = `${building.name} ${building.strasse_nr} ${building.ort} ${building.plz} ${building.kanton.kantonkuerzel}`;
      building.organisations.forEach(org => {
        searchString = `${searchString} ${org.name}`;
      });
      building.rooms.forEach(room => {
        let roomType = this.db.data.roomtypes.find(item => item.typID === room.typID);
        searchString = `${searchString} ${roomType.typ}`;
      });
      searchString = searchString.toLowerCase();
      let matches = 0;
      for (let i = 0; i < text.length; i++) {
        let word = text[i];
        if (searchString.indexOf(word) > -1) {
          matches++;
        }
      }
      if (matches === text.length) {
        results.buildings.push(building);
      }
      if (results.buildings.length === count) {
        break;
      }
    }

    return results;
  }
}
