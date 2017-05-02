import {HttpClient} from 'aurelia-fetch-client';

const tables = ['systems', 'roomtypes', 'cantons', 'technologies'];

export class Database {

  constructor() {
    this.data = {};
    this.http = new HttpClient();
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('//zeta.hoeranlagenverzeichnis.ch/query.php?')
        .withDefaults({
          headers: {
            // 'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
    });
  }

  load() {
    return Promise.all(
      tables.map(table => this.http
        .fetch(`table=${table}`)
        .then(response => response.json())
        .catch(error => {
          console.error(error);
          return {
            results: []
          };
        }))
    ).then(data => {
      tables.forEach((table, index) => {
        this.data[table] = data[index].results;
      });
      let locations = {};
      let buildingCounter = 0;
      let buildings = this.data.systems.reduce((data, system) => {
        let buildingId = `${system.plz}-${system.strasse_nr}-${system.gebaeude}`;
        let orgId = `${system.organisation}`;
        if (!data[buildingId]) {
          buildingCounter++;
          data[buildingId] = {
            id: buildingCounter,
            name: system.gebaeude,
            lat: system.lat,
            lng: system.lng,
            strasse_nr: system.strasse_nr,
            plz: system.plz,
            ort: system.ort,
            kanton: this.data.cantons.find(item => item.kantonID === system.kantonID),
            rooms: []
          }
        }
        system.gebaeudeID = data[buildingId].id;
        data[buildingId].rooms.push(system);
        let locationId = system.ort.trim();
        if (!locations[locationId]) {
          locations[locationId] = {
            name: locationId,
            plz: system.plz,
            bounds: L.latLngBounds()
          }
        }
        locations[locationId].bounds.extend(L.latLng(system.lat, system.lng));
        return data;
      }, {});
      this.data.buildings = Object.keys(buildings).map(key => {
        return buildings[key];
      }).map((building, index, all) => {
        let org = {};
        building.rooms.forEach((room) => {
          let orgId = room.organisation;
          if (!org[orgId]) {
            org[orgId] = {
              name: room.organisation,
              rooms: []
            }
          }
          org[orgId].rooms.push(room);
        });
        building.organisations = Object.keys(org).map(key => org[key]);
        return building;
      });
      this.data.locations = Object.keys(locations).map(key => locations[key]);
      return this.data;
    });
  }

  queryBuildingsByRoomType(roomType) {
    return this.data.buildings.slice().reduce((acc, building) => {
      let rooms = building.rooms.slice().filter(room => room.typID === roomType.typID);
      if (rooms.length > 0) {
        let org = {};
        building.rooms = rooms;
        building.rooms.forEach((room) => {
          let orgId = room.organisation;
          if (!org[orgId]) {
            org[orgId] = {
              name: room.organisation,
              rooms: []
            }
          }
          org[orgId].rooms.push(room);
        });
        building.organisations = Object.keys(org).map(key => org[key]);
        acc.push(building);
      }
      return acc;
    }, []);
  }

  search(text, count=10) {
    let results = {
      locations: [],
      buildings: []
    }
    if (text.length < 3) {
      return results;
    }
    text = text.toLowerCase();
    text = text.split(' ');
    text = text.filter(word => word !== '');

    for (let i = 0; i < this.data.locations.length; i++) {
      let location = this.data.locations[i];
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

    for (let i = 0; i < this.data.buildings.length; i++) {
      let building = this.data.buildings[i];
      let searchString = `${building.name} ${building.strasse_nr} ${building.ort} ${building.plz} ${building.kanton.kantonkuerzel}`;
      building.organisations.forEach(org => {
        searchString = `${searchString} ${org.name}`;
      });
      building.rooms.forEach(room => {
        let roomType = this.data.roomtypes.find(item => item.typID === room.typID);
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
