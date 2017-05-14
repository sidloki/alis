import {HttpClient} from 'aurelia-fetch-client';
import {Building,} from '../models/building';
import {Canton} from '../models/canton';
import {Location} from '../models/location';
import {Organisation} from '../models/organisation';
import {RoomType} from '../models/room-type';
import {System} from '../models/system';
import {Technology} from '../models/technology';


export class Database {

  constructor() {
    this.resetData();
    this.http = new HttpClient();
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('//www.zeta.hoeranlagenverzeichnis.ch/query.php?')
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

  resetData() {
    this.data = {};
  }

  loadData(force=false) {
    let models = [Canton, RoomType, System, Technology];
    if (force === true || Object.keys(this.data).length === 0) {
      this.resetData();
      return Promise.all(models.map(model => {
        let tablename = model.tablename;
        return this.http
          .fetch(`table=${tablename}`)
          .then(response => response.json())
          .then(data => {
            this.data[tablename] = data.results.map(result => new model(result));
          })
          .catch(error => {
            console.error(error);
            this.data[tablename] = [];
          });
      })).then(() => {
        this.processData();
        return this.data;
      });
    } else {
      return Promise.resolve(this.data)
    }
  }

  processData() {
    let systems = this.data[System.tablename];
    let cantons = this.data[Canton.tablename];
    let buildings = {};
    let locations = {};
    let organisations = {};

    this.data[Building.tablename] = [];
    this.data[Location.tablename] = [];
    this.data[Organisation.tablename] = [];

    systems.forEach(system => {
      system.gebaeudeID = `${system.plz}-${system.strasse_nr}-${system.gebaeude}`;
      system.organisationID = `${system.organisation}`;
      system.locationID = system.ort.trim();

      let building = buildings[system.gebaeudeID];
      let location = locations[system.locationID];

      if (!building) {
        building = new Building({
          id: system.gebaeudeID,
          name: system.gebaeude,
          lat: system.lat,
          lng: system.lng,
          strasse_nr: system.strasse_nr,
          plz: system.plz,
          ort: system.ort,
          kanton: cantons.find(item => item.kantonID === system.kantonID),
          kantonID: system.kantonID,
          rooms: [],
          organisations: []
        });
        buildings[system.gebaeudeID] = building;
      }
      if (!location) {
        location = new Location({
          id: system.locationID,
          name: system.locationID,
          plzs: [],
          bounds: L.latLngBounds()
        });
        locations[system.locationID] = location;
      }

      let organisation = building.organisations.find(item => item.id === system.organisationID);
      if (!organisation) {
        organisation = new Organisation({
          id: system.organisationID,
          name: system.organisation,
          rooms: []
        });
        building.organisations.push(organisation);
      }

      building.rooms.push(system);
      organisation.rooms.push(system);

      location.bounds.extend(L.latLng(system.lat, system.lng));

      if (location.plzs.indexOf(system.plz) === -1) {
        location.plzs.push(system.plz);
      }
    });

    this.data[Building.tablename] = Object.keys(buildings).map(key => buildings[key]);
    this.data[Location.tablename] = Object.keys(locations).map(key => locations[key]);
    this.data[Organisation.tablename] = Object.keys(organisations).map(key => organisations[key]);
  }

  queryBuildingsByRoomType(roomType) {
    let buildings = [];
    return this.data.buildings.reduce((acc, building) => {
      let rooms = building.rooms.filter(room => room.typID === roomType.typID);
      if (rooms.length > 0) {
        let buildingCopy = new Building(building);
        buildingCopy.rooms = rooms;
        buildingCopy.organisations = [];
        building.organisations.forEach(organisation => {
          let rooms = organisation.rooms.filter(room => room.typID === roomType.typID);
          if (rooms.length > 0) {
            let organisationCopy = new Organisation(organisation);
            organisationCopy.rooms = rooms;
            buildingCopy.organisations.push(organisationCopy);
          }
        });
        acc.push(buildingCopy);
      }
      return acc;
    }, []);
  }
}
