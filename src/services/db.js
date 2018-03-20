import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Config} from './config';
import {Building} from '../models/building';
import {Canton} from '../models/canton';
import {Location} from '../models/location';
import {Organisation} from '../models/organisation';
import {RoomType} from '../models/room-type';
import {System} from '../models/system';
import {Technology} from '../models/technology';
import {Rating} from '../models/rating';
import {Lang} from '../models/lang';
import {_} from '../plugins/aurelia-messageformat';

@inject(Config)
export class Database {

  constructor(config) {
    this.config = config;
    this.reset();
    this.httpClient = new HttpClient();
    this.httpClient.configure(cfg => {
      cfg
        .useStandardConfiguration()
        .withBaseUrl(`${this.config.baseUrl}/db_query.php?`)
        .withDefaults();
    });
  }

  reset() {
    this.indexes = new Map();
  }

  load() {
    let models = [Canton, RoomType, System, Technology, Lang];
    this.reset();
    return Promise.all(models.map(Model => {
      let tablename = Model.tablename;
      return this.httpClient
        .fetch(`table=${tablename}`)
        .then(response => response.json())
        .then(data => {
          let index = this.createIndex(Model);
          data.results.forEach((item) => {
            index.set(item[data.id], new Model(item));
          });
        })
        .catch(error => {
          this.createIndex(Model);
        });
    })).then(() => {
      this.process();
      return;
    });
  }

  createIndex(model) {
    let tablename = model.tablename;
    this.indexes.set(tablename, new Map());
    return this.getIndex(model);
  }

  getIndex(model) {
    let tablename = model.tablename;
    return this.indexes.get(tablename);
  }

  process() {
    let systems = this.getIndex(System);
    let roomTypes = this.getIndex(RoomType);
    let buildings = this.createIndex(Building);
    let organisations = this.createIndex(Organisation);
    let locations = this.createIndex(Location);
    let ratings = this.createIndex(Rating);

    for (let [, roomType] of roomTypes.entries()) {
      roomType.name = _(`data.${RoomType.tablename}.${roomType.id}.title`);
    }

    for (let [, system] of systems.entries()) {
      system.buildingId = `${system.plz}-${system.strasse_nr}-${system.gebaeude}`;
      system.organisationId = `${system.organisation}`;
      system.locationId = system.ort.trim();
      system.lang = this.query(Lang).getById(system.langID);

      switch (system.bewertung) {
        case 1:
        case 2:
          system.ratingId = system.bewertung;
          break;
        default:
          system.ratingId = 3;
          break;
      }

      let building = buildings.get(system.buildingId);
      let organisation = organisations.get(system.organisationId);
      let location = locations.get(system.locationId);
      let rating = ratings.get(system.ratingId);

      if (!building) {
        building = new Building({
          id: system.buildingId,
          name: system.gebaeude,
          lat: system.lat,
          lng: system.lng,
          strasse_nr: system.strasse_nr,
          plz: system.plz,
          ort: system.ort,
          cantonId: system.kantonID,
          canton: this.query(Canton).getById(system.kantonID)
        });
        buildings.set(building.id, building);
      }

      if (!location) {
        location = new Location({
          id: system.locationId,
          name: system.locationId,
          plzs: [],
          bounds: L.latLngBounds()
        });
        locations.set(location.id, location);
      }

      if (!organisation) {
        organisation = new Organisation({
          id: system.organisationId,
          name: system.organisation
        });
        organisations.set(organisation.id, organisation);
      }

      if (!rating) {
        rating = new Rating({
          id: system.ratingId
        });
        switch (rating.id) {
          case 1:
            rating.icon = 'r32_green.png';
            break;
          case 2:
            rating.icon = 'r32_yellow.png';
            break;
          default:
            rating.icon = 'r32_white.png';
            break;
        }
        ratings.set(rating.id, rating);
      }

      system.organisation = organisation;
      system.building = building;
      system.rating = rating;

      location.bounds.extend(L.latLng(system.lat, system.lng));

      if (location.plzs.indexOf(system.plz) === -1) {
        location.plzs.push(system.plz);
      }
    }
  }

  query(model) {
    return new Query(this, model, this.getIndex(model));
  }

  sortByDistance(point) {
    let index = this.getIndex(System);
    let records = Array.from(index.values()).sort((a, b) => {
      let distanceA = point.distanceTo(L.latLng(a.lat, a.lng));
      let distanceB = point.distanceTo(L.latLng(b.lat, b.lng));
      return distanceA - distanceB;
    });
    index.clear();
    for (let record of records) {
      index.set(record.id, record);
    }
  }
}

export class Query {

  constructor(db, model, index) {
    this.db = db;
    this.model = model;
    this.index = index;
    this.records = new Map(this.index.entries());
  }

  get(property, value) {
    let match;
    for (let record of this.records.values()) {
      if (record[property] === value) {
        match = record;
        break;
      }
    }
    return match;
  }

  getById(value) {
    return this.records.get(value);
  }

  all() {
    return Array.from(this.records.values());
  }

  filterBy(property, value) {
    let records = new Map();
    for (let [id, record] of this.records.entries()) {
      if (record[property] === value) {
        records.set(id, record);
      }
    }
    this.records = records;
    return this;
  }

  groupByRelation(model) {
    let relationProperty = this.model.relations.get(model);
    let relationQuery = this.db.query(model);
    let records = new Map();
    let map = new Map();
    for (let record of this.records.values()) {
      let key = record[relationProperty];
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(record);
    }
    for (let [key, value] of map.entries()) {
      let record = relationQuery.getById(key);
      if (record) {
        record[this.model.tablename] = value;
        records.set(record.id, record);
      }
    }
    relationQuery.records = records;
    return relationQuery;
  }
}
