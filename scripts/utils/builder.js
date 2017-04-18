const Builder = require('systemjs-builder');
const toFileURL = require('systemjs-builder/lib/utils').toFileURL;
const Configurator = require('systemjs-configurator');

let builder = new Builder('', {
  transpiler: 'plugin-babel',
  map: {
    'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
    'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-node.js'
  },
  babelOptions: {
    plugins: [
      '@node/babel-plugin-transform-decorators-legacy'
    ]
  }
});

let bundleOptions = {
  minify: false,
  sourceMaps: true
};

function configure() {
  console.log("build SystemJS config ...");
  let config = Configurator.buildConfig({ outfile: 'systemjs.config.js' });
  builder.config(config);
};

function reset() {
  builder.reset();
};

function invalidate(filename) {
  builder.invalidate(toFileURL(filename));
  builder.invalidate(`${toFileURL(filename)}!*`);
};

function bundle() {
  console.log("bundle files ...");
  return Promise.all([
    builder.bundle('[src/**/*.js] + src/**/*.html!text + src/**/*.css!css', 'dist/app-bundle.js', bundleOptions),
    builder.bundle('text + css + src/**/*.js - [src/**/*.js]', 'dist/vendor-bundle.js', bundleOptions)
  ]);
};

function build() {
  reset();
  configure();
  return bundle();
};

module.exports = {
  build: build,
  bundle: bundle,
  configure: configure,
  invalidate: invalidate,
  reset: reset
};
