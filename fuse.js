const fs = require('fs-extra-promise');
const path = require('path');
const klawSync = require('klaw-sync');
const yaml = require('js-yaml');
const MessageFormat = require('messageformat');
const UglifyJS = require("uglify-js");
const bs = require('browser-sync').create();
const {
  EnvPlugin,
  FuseBox,
  RawPlugin,
  Sparky,
  Log,
  UglifyJSPlugin,
  WebIndexPlugin
} = require('fuse-box');

const AureliaPlugin = function() {
  let Loader = function() {};
  Loader.prototype.init = function(context) {};
  Loader.prototype.bundleEnd = function(context) {
    context.source.addContent(`FuseBox.import('fuse-box-aurelia-loader')`);
    context.source.addContent(`FuseBox.import('aurelia-bootstrapper')`);
  };
  return new Loader();
};

const production = process.env.NODE_ENV === 'production';
const outDir = process.env.OUT_DIR ? process.env.OUT_DIR : 'dist';
const server = process.env.SERVER ? process.env.SERVER : false;
const indexTemplate = outDir === 'dist' ? 'index.html' : 'index_cordova.html';

const resources = [
  '.nojekyll',
  'favicon.ico',
  'LICENSE',
  'node_modules/core-js/client/core.min.js',
  'node_modules/onsenui/css/onsenui.css',
  'node_modules/onsenui/css/onsen-css-components.min.css',
  'node_modules/onsenui/css/font_awesome/css/font-awesome.min.css',
  'node_modules/onsenui/css/font_awesome/fonts/',
  'node_modules/onsenui/css/ionicons/css/ionicons.min.css',
  'node_modules/onsenui/css/ionicons/fonts/',
  'node_modules/onsenui/css/material-design-iconic-font/css/material-design-iconic-font.min.css',
  'node_modules/onsenui/css/material-design-iconic-font/fonts/',
  'node_modules/leaflet/dist/leaflet.css',
  'node_modules/leaflet/dist/images/',
  'node_modules/leaflet.markercluster/dist/MarkerCluster.css',
  'node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
  'node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css',
  'node_modules/leaflet-easybutton/src/easy-button.css',
  'node_modules/mapkeyicons/dist/MapkeyIcons.css',
  'node_modules/mapkeyicons/dist/MapkeyIcons.eot',
  'node_modules/mapkeyicons/dist/MapkeyIcons.svg',
  'node_modules/mapkeyicons/dist/MapkeyIcons.ttf',
  'node_modules/mapkeyicons/dist/MapkeyIcons.woff',
  'resources/'
];

Sparky.task('clean', () => {
  return Sparky.src(outDir + '/**/*').clean(outDir);
});

Sparky.task('copy', () => {
  return Promise.all(resources.map((item) => {
    return fs.copyAsync(item, path.join(outDir, item));
  }));
});

Sparky.task('compile:translations', () => {
  const compile = (file) => {
    file.read();

    const lang = path.basename(file.name, path.extname(file.name));
    try {
      const translations = yaml.safeLoad(file.contents);
      const mf = new MessageFormat(lang);
      let source = mf.compile(translations).toString('export default');
      
      file.setContent(source);
      file.ext('js');
    } catch (e) {
      console.error(`Error parsing YAML file: ${file.name}`);
    }
  };
  if (!production) {
    return Sparky.watch("locales/**/*.yaml")
          .file("*", async (file) => {
            compile(file);
          })
          .dest(`./src`).exec();

  } else {
    return Sparky.src("locales/**/*.yaml")
          .file("*", async (file) => {
            compile(file);
          })
          .dest(`./src`).exec();
  }
});

Sparky.task('build', ['compile:translations'], () => {
  const fuse = FuseBox.init({
    homeDir: 'src',
    output: outDir + '/$name.js',
    target: 'browser',
    useTypescriptCompiler: true,
    hash: production,
    cache: !production,
    plugins: [
      EnvPlugin({ NODE_ENV: production ? 'production' : 'development' }),
      AureliaPlugin(),
      RawPlugin(['.css', '.html']),
      production ? UglifyJSPlugin() : function () {},
      WebIndexPlugin({
        title: 'Höranlagen',
        template: `src/${indexTemplate}`,
        path: './'
      })
    ]
  });

  const vendor = fuse.bundle('vendor')
    .instructions(`
      + aurelia-bootstrapper
      + aurelia-event-aggregator
      + aurelia-fetch-client
      + aurelia-framework
      + aurelia-history-browser
      + aurelia-logging-console
      + aurelia-onsenui
      + aurelia-pal-browser
      + aurelia-templating-binding
      + aurelia-templating-resources
      + aurelia-templating-router
      + fuse-box-aurelia-loader
      + onsenui
      + resize-observer-polyfill
      + whatwg-fetch
    `).shim({
      'leaflet': {
        source: 'node_modules/leaflet/dist/leaflet.js',
        exports: 'L'
      },
      'leaflet.markercluster': {
        source: 'node_modules/leaflet.markercluster/dist/leaflet.markercluster.js',
        exports: 'L'
      },
      'leaflet.locatecontrol': {
        source: 'node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.js',
        exports: 'L'
      },
      'leaflet.gridlayer.googlemutant': {
        source: 'node_modules/leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant.js',
        exports: 'L'
      },
      'leaflet-easybutton': {
        source: 'node_modules/leaflet-easybutton/src/easy-button.js',
        exports: 'L'
      },
      'leaflet-geometryutil': {
        source: 'node_modules/leaflet-geometryutil/src/leaflet.geometryutil.js',
        exports: 'L'
      }
    });

  const app = fuse.bundle('app')
    .instructions(`
      !> [main.ts]
      + [**/*.{js,html,css}]
      - index.html
      - index_cordova.html
    `);

  if (!production) {
    let watcher = app.watch()
      .completed(() => {
        bs.reload();
      }).sourceMaps(true);
  }

  if (server) {
    fuse.dev({
    }, server => {
      bs.init({
        online: false,
        open: false,
        https: true,
        port: 9000,
        proxy: `localhost:4444`
      });
    });
  }

  fuse.run();
});

Sparky.task('default', ['clean', 'copy', 'build'], () => {});
