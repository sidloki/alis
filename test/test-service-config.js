import { assert } from 'chai';
// import { stub } from 'sinon';

import {Config} from '../src/services/config';

describe('#config', () => {
  let config;

  beforeEach(() => {
    config = new Config();
  });

  it('should have base url defined', () => {
    assert.isDefined(config.baseUrl);
  });

  it('should have map defined', () => {
    assert.isDefined(config.map);
  });

  it('should have basemaps defined', () => {
    assert.isDefined(config.basemaps);
  });
});
