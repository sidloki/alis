import {HttpClient} from 'aurelia-fetch-client';

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
    let tables = ['systems', 'roomtypes', 'cantons', 'technologies'];
    return Promise.all(
      tables.map(table => this.http
        .fetch(`table=${table}`)
        .then(response => response.json()))
    ).then(data => {
      tables.forEach((table, index) => {
        this.data[table] = data[index].results;
      });
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
            kantonID: system.kantonID,
            rooms: []
          }
        }
        system.gebaeudeID = data[buildingId].id;
        data[buildingId].rooms.push(system)
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
      return this.data;
    });
  }
}
