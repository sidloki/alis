import { assert } from 'chai';
// import { stub } from 'sinon';

import {Config} from '../src/services/config';

describe('#config', () => {
  let config;

  beforeEach(() => {
    config = new Config();
  });

  it('should have base url defined', () => {
    assert(config.baseUrl);
  });
});
