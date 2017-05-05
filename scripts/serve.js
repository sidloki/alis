#!/usr/bin/env node
const server = require('./utils/server');
const builder = require('./utils/builder');

builder.build().then(() => {
  server.start();
});
