const fs = require('fs-extra-promise')
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

let defaultBundleOptions = {
  minify: false,
  sourceMaps: true
};

function configure() {
  console.log("build SystemJS config ...");
  let config = Configurator.buildConfig({ outfile: 'systemjs.config.js' });
  builder.config(config);
};

function clean() {
  console.log("clean...");
  fs.emptyDir('dist');
}

function reset() {
  builder.reset();
};

function invalidate(filename) {
  builder.invalidate(toFileURL(filename));
  builder.invalidate(`${toFileURL(filename)}!*`);
};

function bundle(bundleOptions) {
  console.log("bundle files ...");
  let options = bundleOptions || defaultBundleOptions;
  return Promise.all([
    builder.bundle('[src/**/*.js] + src/**/*.html!text + src/**/*.css!text', 'dist/app-bundle.js', options),
    builder.bundle('text + src/**/*.js - [src/**/*.js]', 'dist/vendor-bundle.js', options)
  ])
  .then(() => {
    console.log("bundle complete.")
  })
  .catch((error) => {
    console.error(error.stack);
  });
};

function build(bundleOptions) {
  clean();
  reset();
  configure();
  return bundle(bundleOptions);
};

module.exports = {
  build: build,
  bundle: bundle,
  clean: clean,
  configure: configure,
  invalidate: invalidate,
  reset: reset
};
