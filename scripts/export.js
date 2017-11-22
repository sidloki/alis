#!/usr/bin/env node
const fs = require('fs-extra-promise')
const path = require('path');
const builder = require('./utils/builder');
const dest = 'export';
const list = [
  '.nojekyll',
  'index.html',
  // 'favicon.ico',
  'LICENSE',
  'dist/',
  'systemjs.config.js',
  'node_modules/systemjs/dist/system.js',
  'node_modules/es6-promise/dist/es6-promise.auto.min.js',
  'node_modules/core-js/client/core.min.js',
  'node_modules/onsenui/css/onsenui.css',
  'node_modules/onsenui/css/onsen-css-components.min.css',
  'node_modules/onsenui/css/font_awesome/css/font-awesome.min.css',
  'node_modules/onsenui/css/font_awesome/fonts/',
  'node_modules/onsenui/css/ionicons/css/ionicons.min.css',
  'node_modules/onsenui/css/ionicons/fonts/',
  'node_modules/onsenui/css/material-design-iconic-font/css/material-design-iconic-font.min.css',
  'node_modules/onsenui/css/material-design-iconic-font/fonts/',
  'node_modules/leaflet/dist/leaflet.js',
  'node_modules/leaflet/dist/leaflet.css',
  'node_modules/leaflet/dist/images/',
  'node_modules/leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant.js',
  'node_modules/leaflet.markercluster/dist/leaflet.markercluster.js',
  'node_modules/leaflet.markercluster/dist/MarkerCluster.css',
  'node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
  'node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.js',
  'node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css',
  'node_modules/leaflet-geometryutil/src/leaflet.geometryutil.js',
  'node_modules/leaflet-easybutton/src/easy-button.css',
  'node_modules/leaflet-easybutton/src/easy-button.js',
  'node_modules/mapkeyicons/dist/MapkeyIcons.css',
  'node_modules/mapkeyicons/dist/MapkeyIcons.eot',
  'node_modules/mapkeyicons/dist/MapkeyIcons.svg',
  'node_modules/mapkeyicons/dist/MapkeyIcons.ttf',
  'node_modules/mapkeyicons/dist/MapkeyIcons.woff',
  'resources/'
];

let bundleOptions = {
  minify: true,
  sourceMaps: false
};

builder.build(bundleOptions).then(() => {
  fs.emptyDirAsync(dest).then(() => {
    return Promise.all(list.map((item) => {
      return fs.copyAsync(item, path.join(dest, item));
    }));
  });
});
