SystemJS.config({
  "paths": {
    "alis/": "src/"
  },
  "map": {
    "aurelia-bootstrapper": "node_modules/aurelia-bootstrapper/dist/commonjs",
    "aurelia-fetch-client": "node_modules/aurelia-fetch-client/dist/commonjs",
    "aurelia-framework": "node_modules/aurelia-framework/dist/commonjs",
    "aurelia-onsenui": "node_modules/aurelia-onsenui/dist/commonjs",
    "core-js": "node_modules/core-js",
    "es6-promise": "node_modules/es6-promise/lib",
    "isomorphic-fetch": "node_modules/isomorphic-fetch",
    "leaflet": "node_modules/leaflet/dist",
    "leaflet-geometryutil": "node_modules/leaflet-geometryutil/src",
    "leaflet.gridlayer.googlemutant": "node_modules/leaflet.gridlayer.googlemutant",
    "leaflet.locatecontrol": "node_modules/leaflet.locatecontrol/src",
    "leaflet.markercluster": "node_modules/leaflet.markercluster/dist",
    "resize-observer-polyfill": "node_modules/resize-observer-polyfill/dist",
    "css": "node_modules/systemjs-plugin-css",
    "text": "node_modules/systemjs-plugin-text",
    "whatwg-fetch": "node_modules/whatwg-fetch",
    "aurelia-event-aggregator": "node_modules/aurelia-event-aggregator/dist/commonjs",
    "aurelia-history": "node_modules/aurelia-history/dist/commonjs",
    "aurelia-history-browser": "node_modules/aurelia-history-browser/dist/commonjs",
    "aurelia-loader-default": "node_modules/aurelia-loader-default/dist/commonjs",
    "aurelia-logging-console": "node_modules/aurelia-logging-console/dist/commonjs",
    "aurelia-pal": "node_modules/aurelia-pal/dist/commonjs",
    "aurelia-pal-browser": "node_modules/aurelia-pal-browser/dist/commonjs",
    "aurelia-polyfills": "node_modules/aurelia-polyfills/dist/commonjs",
    "aurelia-router": "node_modules/aurelia-router/dist/commonjs",
    "aurelia-templating": "node_modules/aurelia-templating/dist/commonjs",
    "aurelia-templating-binding": "node_modules/aurelia-templating-binding/dist/commonjs",
    "aurelia-templating-resources": "node_modules/aurelia-templating-resources/dist/commonjs",
    "aurelia-templating-router": "node_modules/aurelia-templating-router/dist/commonjs",
    "aurelia-logging": "node_modules/aurelia-logging/dist/commonjs",
    "aurelia-loader": "node_modules/aurelia-loader/dist/commonjs",
    "aurelia-metadata": "node_modules/aurelia-metadata/dist/commonjs",
    "aurelia-path": "node_modules/aurelia-path/dist/commonjs",
    "aurelia-dependency-injection": "node_modules/aurelia-dependency-injection/dist/commonjs",
    "aurelia-route-recognizer": "node_modules/aurelia-route-recognizer/dist/commonjs",
    "aurelia-binding": "node_modules/aurelia-binding/dist/commonjs",
    "aurelia-task-queue": "node_modules/aurelia-task-queue/dist/commonjs",
    "onsenui": "node_modules/onsenui/js",
    "node-fetch": "node_modules/node-fetch",
    "encoding": "node_modules/encoding/lib",
    "is-stream": "node_modules/is-stream",
    "iconv-lite": "node_modules/iconv-lite/lib"
  },
  "packages": {
    "alis": {
      "main": "main.js"
    },
    "node_modules/aurelia-bootstrapper/dist/commonjs": {
      "main": "aurelia-bootstrapper.js"
    },
    "node_modules/aurelia-fetch-client/dist/commonjs": {
      "main": "aurelia-fetch-client.js"
    },
    "node_modules/aurelia-framework/dist/commonjs": {
      "main": "aurelia-framework.js"
    },
    "node_modules/aurelia-onsenui/dist/commonjs": {
      "main": "aurelia-onsenui.js"
    },
    "node_modules/core-js": {
      "main": "index.js"
    },
    "node_modules/es6-promise/lib": {
      "main": "dist/es6-promise.js"
    },
    "node_modules/isomorphic-fetch": {
      "main": "fetch-npm-node.js"
    },
    "node_modules/leaflet/dist": {
      "main": "leaflet-src.js"
    },
    "node_modules/leaflet-geometryutil/src": {
      "main": "leaflet.geometryutil.js"
    },
    "node_modules/leaflet.gridlayer.googlemutant": {
      "main": "Leaflet.GoogleMutant.js"
    },
    "node_modules/leaflet.locatecontrol/src": {
      "main": "L.Control.Locate.js"
    },
    "node_modules/leaflet.markercluster/dist": {
      "main": "leaflet.markercluster.js"
    },
    "node_modules/resize-observer-polyfill/dist": {
      "main": "ResizeObserver.es.js",
      "format": "esm"
    },
    "node_modules/systemjs-plugin-css": {
      "main": "css"
    },
    "node_modules/systemjs-plugin-text": {
      "main": "text"
    },
    "node_modules/whatwg-fetch": {
      "main": "fetch.js"
    },
    "node_modules/aurelia-event-aggregator/dist/commonjs": {
      "main": "aurelia-event-aggregator.js"
    },
    "node_modules/aurelia-history/dist/commonjs": {
      "main": "aurelia-history.js"
    },
    "node_modules/aurelia-history-browser/dist/commonjs": {
      "main": "aurelia-history-browser.js"
    },
    "node_modules/aurelia-loader-default/dist/commonjs": {
      "main": "aurelia-loader-default.js"
    },
    "node_modules/aurelia-logging-console/dist/commonjs": {
      "main": "aurelia-logging-console.js"
    },
    "node_modules/aurelia-pal/dist/commonjs": {
      "main": "aurelia-pal.js"
    },
    "node_modules/aurelia-pal-browser/dist/commonjs": {
      "main": "aurelia-pal-browser.js"
    },
    "node_modules/aurelia-polyfills/dist/commonjs": {
      "main": "aurelia-polyfills.js"
    },
    "node_modules/aurelia-router/dist/commonjs": {
      "main": "aurelia-router.js"
    },
    "node_modules/aurelia-templating/dist/commonjs": {
      "main": "aurelia-templating.js"
    },
    "node_modules/aurelia-templating-binding/dist/commonjs": {
      "main": "aurelia-templating-binding.js"
    },
    "node_modules/aurelia-templating-resources/dist/commonjs": {
      "main": "aurelia-templating-resources.js"
    },
    "node_modules/aurelia-templating-router/dist/commonjs": {
      "main": "aurelia-templating-router.js"
    },
    "node_modules/aurelia-logging/dist/commonjs": {
      "main": "aurelia-logging.js"
    },
    "node_modules/aurelia-loader/dist/commonjs": {
      "main": "aurelia-loader.js"
    },
    "node_modules/aurelia-metadata/dist/commonjs": {
      "main": "aurelia-metadata.js"
    },
    "node_modules/aurelia-path/dist/commonjs": {
      "main": "aurelia-path.js"
    },
    "node_modules/aurelia-dependency-injection/dist/commonjs": {
      "main": "aurelia-dependency-injection.js"
    },
    "node_modules/aurelia-route-recognizer/dist/commonjs": {
      "main": "aurelia-route-recognizer.js"
    },
    "node_modules/aurelia-binding/dist/commonjs": {
      "main": "aurelia-binding.js"
    },
    "node_modules/aurelia-task-queue/dist/commonjs": {
      "main": "aurelia-task-queue.js"
    },
    "node_modules/onsenui/js": {
      "main": "onsenui.js"
    },
    "node_modules/node-fetch": {
      "main": "index.js"
    },
    "node_modules/encoding/lib": {
      "main": "encoding.js"
    },
    "node_modules/is-stream": {},
    "node_modules/iconv-lite/lib": {
      "main": "index.js"
    }
  }
});