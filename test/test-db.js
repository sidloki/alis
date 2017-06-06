import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { assert } from 'chai';
// import { stub } from 'sinon';

import {Config} from '../src/services/config';
import {Database} from '../src/services/db';
import {System} from '../src/models/system';

describe('#database', () => {
  let db;
  let config = new Config();

  beforeEach(() => {
    fetchMock.get(`${config.baseUrl}/query.php?table=systems`, {id: 'anlageID', results: []});
    fetchMock.get(`${config.baseUrl}/query.php?table=technologies`, {id: 'techID', results: []});
    fetchMock.get(`${config.baseUrl}/query.php?table=cantons`, {id: 'kantonID', results: []});
    fetchMock.get(`${config.baseUrl}/query.php?table=roomtypes`, {id: 'typID', results: []});
    db = new Database(config);
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('load data should create data index', (done) => {
    db.load().then(() => {
      assert(db.getIndex(System));
      done();
    });
  });
});
