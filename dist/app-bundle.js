System.register("alis/app.html!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", "<template>\n  <ons-splitter>\n    <ons-splitter-side id=\"menu\" side=\"left\" collapse>\n      <ons-page>\n        TODO\n      </ons-page>\n    </ons-splitter-side>\n    <ons-splitter-content>\n      <ons-navigator></ons-navigator>\n    </ons-splitter-content>\n  </ons-splitter>\n</template>\n");
    }
  };
});
System.register('alis/app.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-framework', './services/db'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, inject, Database, _dec, _class, App;

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_servicesDb) {
      Database = _servicesDb.Database;
    }],
    execute: function () {
      _export('App', App = (_dec = inject(Database), _dec(_class = function () {
        function App(db) {
          _classCallCheck(this, App);

          this.db = db;
        }

        _createClass(App, [{
          key: 'activate',
          value: function activate() {
            return this.db.load().catch(function () {
              return;
            });
          }
        }, {
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = 'Höranlagen';
            config.map([{
              route: ['', 'home'],
              name: 'home',
              moduleId: './pages/home',
              nav: false
            }, {
              route: 'list',
              name: 'list',
              moduleId: './pages/list',
              nav: false,
              options: {
                animation: 'lift'
              }
            }, {
              route: 'room/:id',
              name: 'room',
              moduleId: './pages/room/index',
              nav: false
            }]);
          }
        }]);

        return App;
      }()) || _class));

      _export('App', App);
    }
  };
});
System.register("alis/environment.js", [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", {
        debug: true,
        testing: false
      });
    }
  };
});
System.register('alis/main.js', ['aurelia-binding', 'aurelia-bootstrapper', 'aurelia-event-aggregator', 'aurelia-framework', 'aurelia-dependency-injection', 'aurelia-history-browser', 'aurelia-loader-default', 'aurelia-logging-console', 'aurelia-metadata', 'aurelia-pal-browser', 'aurelia-path', 'aurelia-polyfills', 'aurelia-route-recognizer', 'aurelia-router', 'aurelia-templating', 'aurelia-templating-binding', 'aurelia-templating-resources', 'aurelia-templating-router', 'aurelia-onsenui', './environment'], function (_export, _context) {
  "use strict";

  var environment;
  function configure(aurelia) {
    aurelia.use.basicConfiguration().history().plugin('aurelia-onsenui').feature('alis/resources');

    if (environment.debug) {
      aurelia.use.developmentLogging();
    }

    if (environment.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaBinding) {}, function (_aureliaBootstrapper) {}, function (_aureliaEventAggregator) {}, function (_aureliaFramework) {}, function (_aureliaDependencyInjection) {}, function (_aureliaHistoryBrowser) {}, function (_aureliaLoaderDefault) {}, function (_aureliaLoggingConsole) {}, function (_aureliaMetadata) {}, function (_aureliaPalBrowser) {}, function (_aureliaPath) {}, function (_aureliaPolyfills) {}, function (_aureliaRouteRecognizer) {}, function (_aureliaRouter) {}, function (_aureliaTemplating) {}, function (_aureliaTemplatingBinding) {}, function (_aureliaTemplatingResources) {}, function (_aureliaTemplatingRouter) {}, function (_aureliaOnsenui) {}, function (_environment) {
      environment = _environment.default;
    }],
    execute: function () {}
  };
});
System.register("alis/pages/home.css!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", ".leaflet-system-icon {\n  background-color: #2B2C5A;\n  border-radius: 50%;\n  border: 1.5px solid #ffffff;\n  line-height: 22px;\n  font-size: 14px;\n  color: #ffffff;\n  text-align: center;\n}\n\n.leaflet-container .leaflet-google-mutant .gmnoprint {\n  display: none;\n}\n.leaflet-container .leaflet-google-mutant .gmnoprint.gm-style-cc {\n  display: inherit;\n}\n\n.toolbar.searchbar {\n  padding: 5px 10px 0;\n}\n\n.toolbar.searchbar.floating + .page__background + .page__content {\n    margin-top: -1px;\n    top: 0;\n}\n\n.toolbar.searchbar.toolbar--transparent .center {\n  box-shadow: 0 1px 5px rgba(0,0,0,.3);\n  border-color: transparent;\n}\n\n.toolbar.searchbar .toolbar-button {\n  color: #666;\n  margin: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.toolbar.searchbar.toolbar--material .toolbar-button--material {\n  color: #666;\n  margin: 0;\n}\n.toolbar.searchbar.toolbar--material .toolbar-button--material .ons-icon {\n  width: 22px;\n  font-size: 22px;\n}\n.toolbar.searchbar .toolbar-button .ons-icon {\n  width: 17px;\n}\n\n.toolbar.searchbar .left, .toolbar.searchbar .right {\n  min-width: auto;\n  width: auto;\n}\n.toolbar.searchbar .center {\n  flex: 1;\n  display: flex;\n  height: 34px;\n  line-height: 34px;\n  border-radius: 4px;\n  background-color: #fff;\n  max-width: 100%;\n}\n.toolbar.searchbar.toolbar--material .center {\n  height: 46px;\n  line-height: 46px;\n}\n.toolbar.searchbar .search-input {\n  width: 100%;\n  height: 100%;\n  background-image: none;\n  background-color: transparent;\n  border: none;\n  font-size: 17px;\n  padding: 0 8px;\n}\n\n.card {\n  margin: 10px;\n  /*border: 1px solid #ccc;*/\n  border-radius: 4px;\n  background-color: #fff;\n  padding: 10px;\n  box-shadow: 0 1px 5px rgba(0,0,0,.3);\n}\n\n.category-item {\n  width: 25%;\n  text-align:center;\n}\n.category-item .category-label {\n  padding-top:5px;\n  font-size:12px;\n  max-width:100%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #666;\n}\n\n@media (max-width: 320px) {\n  .category-item {\n    width: 33%;\n    text-align:center;\n  }\n}\n");
    }
  };
});
System.register("alis/pages/home.html!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", "<template>\n  <require from=\"./home.css\"></require>\n  <ons-page>\n    <ons-toolbar modifier=\"\" class=\"searchbar\">\n      <div class=\"left\">\n      </div>\n      <div class=\"center\">\n        <ons-toolbar-button click.delegate=\"showMenu()\">\n          <ons-icon icon=\"ion-navicon, material:md-menu\"></ons-icon>\n        </ons-toolbar-button>\n        <div style=\"flex:1\" click.delegate=\"showSearch()\">\n          <input type=\"search\" class=\"search-input\" placeholder=\"Höranlage suchen...\" value.bind=\"searchText\" />\n        </div>\n        <ons-toolbar-button if.bind=\"searchText\" click.delegate=\"clearSearch()\">\n          <ons-icon icon=\"ion-ios-close-empty, material:md-close\"></ons-icon>\n        </ons-toolbar-button>\n      </div>\n      <div class=\"right\">\n      </div>\n    </ons-toolbar>\n    <div style=\"display:flex;flex-direction:column;height:100%;\">\n      <div ref=\"_map\" style=\"flex:1;width:100%;\"></div>\n      <div show.bind=\"selection\" style=\"position:relative;max-height:60%;height:auto;overflow:overlay;z-index:10000\" ref=\"roomlist\">\n        <ons-button style=\"position:fixed;right:0;left:auto;margin-top:-16px;z-index:10000;\" modifier=\"quiet\">\n          <ons-icon icon=\"ion-record,material:md-circle\" size=\"2x\" style=\"color:#fff;\"></ons-icon>\n        </ons-button>\n        <ons-button click.trigger=\"deselect()\" style=\"position:fixed;right:0;left:auto;margin-top:-16px;z-index:10001;\" modifier=\"quiet\">\n          <ons-icon icon=\"ion-ios-close,material:md-close-circle\" size=\"2x\"></ons-icon>\n        </ons-button>\n        <ons-list>\n          <template if.bind=\"selection.rooms.length === 1\">\n            <ons-list-header if.bind=\"selection.name && selection.name !== getRoomName(selection.rooms[0])\">\n              <span>${selection.name}</span>\n            </ons-list-header>\n            <template repeat.for=\"org of selection.organisations\">\n              <ons-list-item repeat.for=\"room of org.rooms\" tappable click.trigger=\"showRoom(room)\">\n                <span class=\"list-item__title\">\n                  <span>${getRoomName(room)}</span>\n                </span>\n                <span class=\"list-item__subtitle\" if.bind=\"room.organisation\">\n                  <span>${room.organisation}</span>\n                </span>\n              </ons-list-item>\n            </template>\n          </template>\n          <template if.bind=\"selection.rooms.length > 1\">\n            <ons-list-header if.bind=\"selection.name\">\n              <span>${selection.name}</span>\n            </ons-list-header>\n              <template repeat.for=\"org of selection.organisations\">\n                <ons-list-item repeat.for=\"room of org.rooms\" tappable click.trigger=\"showRoom(room)\">\n                  <span class=\"list-item__title\">\n                    <span>${getRoomName(room)}</span>\n                  </span>\n                  <span class=\"list-item__subtitle\" if.bind=\"room.organisation\">\n                    <span>${room.organisation}</span>\n                  </span>\n                </ons-list-item>\n              </template>\n          </template>\n        </ons-list>\n      </div>\n      <!-- <ons-bottom-toolbar show.bind=\"!selection\" style=\"position:relative;\">\n        <div style=\"line-height:44px;padding:0 16px;\" click.trigger=\"showList()\">\n            Liste anzeigen\n        </div>\n      </ons-bottom-toolbar> -->\n    </div>\n  </ons-page>\n    <ons-modal ref=\"_search\">\n      <ons-page>\n        <ons-toolbar modifier=\"transparent\" class=\"searchbar\">\n          <div class=\"left\">\n          </div>\n          <div class=\"center\">\n            <ons-toolbar-button click.delegate=\"cancelSearch()\">\n              <ons-icon icon=\"ion-ios-arrow-back, material:md-arrow-left\"></ons-icon>\n            </ons-toolbar-button>\n            <form style=\"flex:1;\" submit.delegate=\"onSearch()\">\n              <input ref=\"_searchinput\" type=\"search\" class=\"search-input\" placeholder=\"Höranlage suchen...\" value.bind=\"currentSearchText\" input.trigger=\"onSearchInput()\" />\n            </form>\n            <ons-toolbar-button show.bind=\"currentSearchText\" click.delegate=\"clearCurrentSearch()\">\n              <ons-icon icon=\"ion-ios-close-empty, material:md-close\"></ons-icon>\n            </ons-toolbar-button>\n          </div>\n          <div class=\"right\">\n          </div>\n        </ons-toolbar>\n        <div class=\"card\" if.bind=\"!currentSearchText\">\n          <div style=\"display:flex;flex-wrap:wrap;align-items:flex-start;\">\n            <div class=\"category-item\" repeat.for=\"category of db.data.roomtypes\">\n              <div style=\"padding:10px 5px;\" click.delegate=\"searchCategory(category)\">\n                <ons-button style=\"width:48px;height:48px;border-radius:100%;line-height:48px;padding:0;\">\n                  <ons-icon icon=\"fa-deaf\" size=\"24px\"></ons-icon>\n                </ons-button>\n                <div class=\"category-label\">${category.typ}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"card\" style=\"padding:0;\" if.bind=\"currentSearchText\">\n          <ons-list>\n            <ons-list-item repeat.for=\"location of currentResults.locations\" tappable modifier=\"longdivider\" click.delegate=\"onLocationResultClick(location)\">\n              <div class=\"left\"></div>\n              <div class=\"center\">\n                <span class=\"list-item__title\">${location.name}</span>\n              </div>\n            </ons-list-item>\n            <template repeat.for=\"building of currentResults.buildings\">\n              <ons-list-item repeat.for=\"org of building.organisations\" tappable modifier=\"longdivider\" click.delegate=\"onBuildingResultClick(building)\">\n                <div class=\"left\"></div>\n                <div class=\"center\">\n                  <span class=\"list-item__title\">${building.name || org.name}</span>\n                  <span class=\"list-item__subtitle\">\n                    <span if.bind=\"building.name\">${org.name}</span>\n                    <br if.bind=\"building.name\"/>\n                    <span>${building.strasse_nr}, ${building.plz} ${building.ort}</span>\n                  </span>\n                </div>\n              </ons-list-item>\n            </template>\n          </ons-list>\n        </div>\n      </ons-page>\n    </ons-modal>\n</template>\n");
    }
  };
});
System.register('alis/services/storage.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, Storage;

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }],
    execute: function () {
      _export('Storage', Storage = function () {
        function Storage() {
          _classCallCheck(this, Storage);

          this.stores = {
            local: localStorage,
            session: sessionStorage
          };
        }

        _createClass(Storage, [{
          key: 'getItem',
          value: function getItem(name) {
            var store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'local';

            return JSON.parse(this.stores[store].getItem(name));
          }
        }, {
          key: 'setItem',
          value: function setItem(name, value) {
            var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'local';

            this.stores[store].setItem(name, JSON.stringify(value));
          }
        }]);

        return Storage;
      }());

      _export('Storage', Storage);
    }
  };
});
System.register('alis/pages/home.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'onsenui', 'aurelia-router', 'aurelia-framework', '../services/db', '../services/storage'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, ons, Router, inject, bindable, Database, Storage, _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, Home;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_onsenui) {
      ons = _onsenui.default;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_servicesDb) {
      Database = _servicesDb.Database;
    }, function (_servicesStorage) {
      Storage = _servicesStorage.Storage;
    }],
    execute: function () {
      _export('Home', Home = (_dec = inject(Router, Database, Storage), _dec(_class = (_class2 = function () {
        function Home(router, db, storage) {
          _classCallCheck(this, Home);

          _initDefineProp(this, 'selection', _descriptor, this);

          _initDefineProp(this, 'currentResults', _descriptor2, this);

          this.router = router;
          this.db = db;
          this.storage = storage;
        }

        _createClass(Home, [{
          key: 'activate',
          value: function activate(params) {}
        }, {
          key: 'attached',
          value: function attached() {
            if (ons.platform.isAndroid()) {
              this._map.classList.add('map--material');
            }
            this.map = L.map(this._map, {
              attributionControl: false
            });

            this.basemap = L.gridLayer.googleMutant({
              type: 'roadmap', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
              styles: [{
                featureType: "poi",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
              }]
            }).addTo(this.map);

            this.buildingsLayer = L.markerClusterGroup({
              maxClusterRadius: 40
            }).addTo(this.map);

            this.markers = L.featureGroup().addTo(this.map);

            this.locateControl = L.control.locate({
              showPopup: false,
              locateControl: {}
            }).addTo(this.map);
            this.locateControl._start = this.locateControl.start.bind(this.locateControl);
            this.locateControl._stop = this.locateControl.stop.bind(this.locateControl);
            this.locateControl._setView = this.locateControl.setView.bind(this.locateControl);
            this.locateControl.stop = this.onLocateControlStop.bind(this);
            this.locateControl.start = this.onLocateControlStart.bind(this);
            this.locateControl.setView = this.onLocateControlSetView.bind(this);

            var mapbounds = this.storage.getItem('mapbounds');
            if (mapbounds) {
              this.map.fitBounds(mapbounds);
            } else {
              this.map.setView([46.801111, 8.226667], 7);
            }

            if (this.storage.getItem('geolocation')) {
              this.locateControl.start();
            }

            this.map.on('moveend', this.updateMapView, this);

            this.buildingsLayer.on('click', this.onBuildingClick, this);
            this.buildings = this.db.data.buildings;
          }
        }, {
          key: 'onBuildingClick',
          value: function onBuildingClick(e) {
            this.selection = e.layer.data;
          }
        }, {
          key: 'deselect',
          value: function deselect() {
            this.selection = null;
          }
        }, {
          key: 'selectionChanged',
          value: function selectionChanged(newValue, oldValue) {
            var _this = this;

            this.markers.clearLayers();
            if (newValue) {
              (function () {
                var marker = L.marker([newValue.lat, newValue.lng]);
                _this.markers.addLayer(marker);
                _this.roomlist.scrollTop = 0;
                setTimeout(function () {
                  _this.map.invalidateSize({
                    pan: false
                  });
                  if (!_this.map.getBounds().contains(marker.getLatLng())) {
                    _this.locateControl._onDrag();
                    _this.map.setView(marker.getLatLng(), _this.map.getZoom());
                    marker._bringToFront();
                  }
                }, 50);
              })();
            } else {
              setTimeout(function () {
                _this.map.invalidateSize({
                  pan: false
                });
              }, 50);
            }
          }
        }, {
          key: 'updateMapView',
          value: function updateMapView(evt) {
            var bounds = evt.target.getBounds();
            this.storage.setItem('mapbounds', [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]]);
          }
        }, {
          key: 'onLocateControlStart',
          value: function onLocateControlStart() {
            this.storage.setItem('geolocation', true);
            this.locateControl.isLocatingStart = true;
            this.locateControl._start();
          }
        }, {
          key: 'onLocateControlStop',
          value: function onLocateControlStop() {
            this.storage.setItem('geolocation', false);
            this.locateControl._stop();
          }
        }, {
          key: 'onLocateControlSetView',
          value: function onLocateControlSetView() {
            if (this.locateControl.isLocatingStart) {
              this.locateControl.isLocatingStart = false;
              this.locateControl.options.keepCurrentZoomLevel = false;
              this.locateControl.options.locateOptions.maxZoom = this.map.getZoom() < 15 ? 15 : this.map.getZoom();
              this.locateControl._setView();
              this.locateControl.options.keepCurrentZoomLevel = true;
              this.locateControl.options.locateOptions.maxZoom = Infinity;
            } else {
              this.locateControl._setView();
            }
          }
        }, {
          key: 'getRoomName',
          value: function getRoomName(room) {
            var name = (room.raum + ' ' + room.raumnummer).trim();
            if (!name) {
              name = room.gebaeude;
            }
            if (!name) {
              var type = this.db.data.roomtypes.find(function (type) {
                return type.typID === room.typID;
              });
              name = type.typ;
            }
            return name;
          }
        }, {
          key: 'showMenu',
          value: function showMenu() {
            var menu = document.getElementById('menu');
            menu.open();
          }
        }, {
          key: 'showSearch',
          value: function showSearch() {
            this._search.show();
            this._searchinput.focus();
            this.isSearching = true;
            this.currentSearchText = this.searchText;
            this.currentResults = this.results;
          }
        }, {
          key: 'cancelSearch',
          value: function cancelSearch() {
            this._search.hide();
            this.currentSearchText = '';
            this.currentResults = {};
            this.isSearching = false;
          }
        }, {
          key: 'clearSearch',
          value: function clearSearch() {
            this.searchText = this.currentSearchText = '';
            this.buildings = this.db.data.buildings;
            this.selection = null;
          }
        }, {
          key: 'showList',
          value: function showList() {
            this.router.navigateToRoute('list');
          }
        }, {
          key: 'showRoom',
          value: function showRoom(room) {
            this.router.navigateToRoute('room', { id: room.anlageID });
          }
        }, {
          key: 'searchCategory',
          value: function searchCategory(item) {
            this.isFiltered = true;
            this._search.hide();
            this.searchText = this.currentSearchText = item.typ;
            this.buildings = this.db.queryBuildingsByRoomType(item);
            this.results = this.currentResults = {
              buildings: this.buildings,
              locations: []
            };
            this.selection = null;
            this.zoomToNearest();
          }
        }, {
          key: 'zoomToNearest',
          value: function zoomToNearest() {
            var center = this.map.getCenter();
            var closest = L.GeometryUtil.closestLayer(this.map, this.buildingsLayer.getLayers(), center);
            if (!this.map.getBounds().contains(closest.layer.getLatLng())) {
              var bounds = L.latLngBounds(closest.layer.getLatLng(), center);
              this.locateControl._onDrag();
              this.map.fitBounds(bounds, {
                maxZoom: this.map.getZoom(),
                padding: [40, 40]
              });
            }
          }
        }, {
          key: 'clearCurrentSearch',
          value: function clearCurrentSearch() {
            this.currentSearchText = '';
            this.currentResults = {
              buildings: [],
              locations: []
            };
            this._searchinput.focus();
          }
        }, {
          key: 'onBuildingResultClick',
          value: function onBuildingResultClick(building) {
            var _this2 = this;

            if (!this.isFiltered) {
              this.buildings = this.db.data.buildings;
            }
            this.searchText = this.currentSearchText;
            this.results = this.currentResults;
            this.selection = null;
            this._search.hide();
            this.map.once('moveend', function () {
              _this2.selection = building;
            });
            this.locateControl._onDrag();
            this.map.setView([building.lat, building.lng], 17);
          }
        }, {
          key: 'onLocationResultClick',
          value: function onLocationResultClick(location) {
            if (!this.isFiltered) {
              this.buildings = this.db.data.buildings;
            }
            this.searchText = this.currentSearchText;
            this.results = this.currentResults;
            this.selection = null;
            this._search.hide();
            this.locateControl._onDrag();
            this.map.fitBounds(location.bounds);
          }
        }, {
          key: 'onSearch',
          value: function onSearch() {
            this.currentResults = this.db.search(this.currentSearchText, 20);
          }
        }, {
          key: 'onSearchInput',
          value: function onSearchInput() {
            this.isFiltered = false;
            this.currentResults = this.db.search(this._searchinput.value, 10);
          }
        }, {
          key: 'buildings',
          set: function set(value) {
            var _this3 = this;

            this.buildingsLayer.clearLayers();
            value.forEach(function (building) {
              // TODO: marker icons
              var myIcon = L.divIcon({
                className: 'leaflet-system-icon fa fa-deaf',
                iconSize: 22
              });
              var marker = L.marker([building.lat, building.lng], { icon: myIcon });
              marker.data = building;
              _this3.buildingsLayer.addLayer(marker);
            });
          },
          get: function get() {
            return this.buildingsLayer.getLayers().map(function (layer) {
              return layer.data;
            });
          }
        }]);

        return Home;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'selection', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'currentResults', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class));

      _export('Home', Home);
    }
  };
});
System.register("alis/pages/list.html!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", "<template>\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"left\">\n        <ons-back-button></ons-back-button>\n      </div>\n      <div class=\"center\">${title}</div>\n    </ons-toolbar>\n\n    Some content ...\n  </ons-page>\n</template>\n");
    }
  };
});
System.register('alis/pages/list.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'aurelia-framework', 'aurelia-router'], function (_export, _context) {
  "use strict";

  var _classCallCheck, inject, Router, _dec, _class, List;

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }],
    execute: function () {
      _export('List', List = (_dec = inject(Router), _dec(_class = function List(router) {
        _classCallCheck(this, List);

        this.title = 'Anlagen';
        this.router = router;
      }) || _class));

      _export('List', List);
    }
  };
});
System.register("alis/pages/room/index.html!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", "<template>\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"left\">\n        <ons-back-button></ons-back-button>\n      </div>\n      <div class=\"center\">${getRoomName()}</div>\n    </ons-toolbar>\n    <ons-tabbar>\n      <ons-tab repeat.for=\"tab of tabs\" model.bind=\"tab\"></ons-tab>\n    </ons-tabbar>\n  </ons-page>\n</template>\n");
    }
  };
});
System.register('alis/pages/room/index.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-framework', '../../services/db'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, inject, Database, _dec, _class, Index;

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_servicesDb) {
      Database = _servicesDb.Database;
    }],
    execute: function () {
      _export('Index', Index = (_dec = inject(Database), _dec(_class = function () {
        function Index(db) {
          _classCallCheck(this, Index);

          this.db = db;
        }

        _createClass(Index, [{
          key: 'activate',
          value: function activate(params) {
            this.data = this.db.data.systems.find(function (item) {
              return params.id === item.anlageID;
            });
            this.tabs = [{
              page: './info',
              label: 'Info',
              active: true,
              data: this.data
            }, {
              page: './plan',
              label: 'Raumplan',
              data: this.data
            }];
          }
        }, {
          key: 'getRoomName',
          value: function getRoomName() {
            var _this = this;

            var name = (this.data.raum + ' ' + this.data.raumnummer).trim();
            if (!name) {
              name = this.data.gebaeude;
            }
            if (!name) {
              var type = this.db.data.roomtypes.find(function (type) {
                return type.typID === _this.data.typID;
              });
              name = type.typ;
            }
            return name;
          }
        }]);

        return Index;
      }()) || _class));

      _export('Index', Index);
    }
  };
});
System.register("alis/pages/room/info.html!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", "<template>\n  <ons-page>\n    <div if.bind=\"getPhotoUrl()\" style=\"background-image:url('${getPhotoUrl()}');background-repeat:no-repeat;background-size:cover;background-position:center;width:100%;height:35%;\">\n    </div>\n    <ons-list>\n      <ons-list-item if.bind=\"data.strasse_nr || data.plz || data.org\" tappable>\n        <span class=\"left\">\n          <ons-icon icon=\"ion-ios-location,material:md-pin\" fixed-width=\"true\"></ons-icon>\n        </span>\n        <span class=\"center\">\n          ${data.gebaeude}<template if.bind=\"data.organisation && data.gebaeude\">, </template>${data.organisation}<br/>\n          ${data.strasse_nr}, ${data.plz} ${data.ort}\n      </ons-list-item>\n      <ons-list-item if.bind=\"data.webadresse\" click.trigger=\"openWebsite()\" tappable>\n        <span class=\"left\">\n          <ons-icon icon=\"md-globe\" fixed-width=\"true\"></ons-icon>\n        </span>\n        <span class=\"center\">Website</span>\n      </ons-list-item>\n      <ons-list-header>\n        Höranlage\n      </ons-list-header>\n      <ons-list-item>\n        <span class=\"left\" style=\"\">\n          <img src=\"${getTechImageUrl()}\" alt=\"\" style=\"width:1.28571429em;\"/>\n        </span>\n        <span class=\"center\">\n          ${getTechName()}\n        </span>\n      </ons-list-item>\n      <ons-list-item>\n        <span class=\"left\" style=\"\">\n          <img src=\"${getRatingImageUrl()}\" alt=\"\" style=\"width:1.28571429em;\"/>\n        </span>\n        <span class=\"center\">\n          ${getRatingName()}\n        </span>\n      </ons-list-item>\n      <ons-list-item if.bind=\"data.bemerkung\">\n        ${data.bemerkung}\n      </ons-list-item>\n    </ons-list>\n  </ons-page>\n</template>\n");
    }
  };
});
System.register('alis/pages/room/info.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-framework', 'aurelia-router', '../../services/db'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, inject, Router, Database, _dec, _class, Info;

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_servicesDb) {
      Database = _servicesDb.Database;
    }],
    execute: function () {
      _export('Info', Info = (_dec = inject(Router, Database), _dec(_class = function () {
        function Info(router, db) {
          _classCallCheck(this, Info);

          this.router = router;
          this.db = db;
        }

        _createClass(Info, [{
          key: 'activate',
          value: function activate(params) {
            this.data = params.data;
          }
        }, {
          key: 'openWebsite',
          value: function openWebsite() {
            window.open(this.data.webadresse, '_system');
          }
        }, {
          key: 'getPhotoUrl',
          value: function getPhotoUrl() {
            var url = this.data.foto_dateiname;
            if (!url || url === 'transp.png') {
              return null;
            } else {
              return '//www.zeta.hoeranlagenverzeichnis.ch/admin/images/image_front/' + url;
            }
          }
        }, {
          key: 'getTechImageUrl',
          value: function getTechImageUrl() {
            var _this = this;

            var technology = this.db.data.technologies.find(function (type) {
              return type.techID === _this.data.techID;
            });
            return 'resources/symbols/' + technology.technologie + '.png';
          }
        }, {
          key: 'getTechName',
          value: function getTechName() {
            var _this2 = this;

            var technology = this.db.data.technologies.find(function (type) {
              return type.techID === _this2.data.techID;
            });
            return technology.technologie;
          }
        }, {
          key: 'getRatingImageUrl',
          value: function getRatingImageUrl() {
            var name = 'resources/symbols/';
            switch (this.data.bewertung) {
              case "1":
                name += 'r32_green.png';
                break;
              case "2":
                name += 'r32_yellow.png';
                break;
              default:
                name += 'r32_white.png';
                break;
            }
            return name;
          }
        }, {
          key: 'getRatingName',
          value: function getRatingName() {
            var name = '';
            switch (this.data.bewertung) {
              case "1":
                name = 'Geprüfte Höranlage gemäss Norm';
                break;
              case "2":
                name = 'Geprüfte Höranlage nicht nach Norm';
                break;
              default:
                name = 'Nicht überprüfte Höranlage';
                break;
            }
            return name;
          }
        }]);

        return Info;
      }()) || _class));

      _export('Info', Info);
    }
  };
});
System.register("alis/pages/room/plan.css!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", "ons-select.no-underbar select.select-input--material {\n  background-image: none;\n  padding: 0;\n}\n");
    }
  };
});
System.register("alis/pages/room/plan.html!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", "<template>\n  <require from=\"./plan.css\"></require>\n  <ons-page>\n    <ons-list if.bind=\"plans.length > 0\" style=\"display:flex;flex-direction:column;height:100%;\">\n      <ons-list-item modifier=\"longdivider\" if.bind=\"plans.length > 1\">\n        <ons-select style=\"width:100%;\" value.bind=\"plan\" class=\"no-underbar\">\n          <option repeat.for=\"plan of plans\" value.bind=\"plan.value\">${plan.text}</option>\n        </ons-select>\n      </ons-list-item>\n      <ons-list-item style=\"flex:1;padding:0 0 0 0;\">\n        <div class=\"center\" style=\"min-height:auto;padding:1px 0 0 0\"><div ref=\"planmap\" style=\"width:100%;height:100%;\"></div></div>\n      </ons-list-item>\n    </ons-list>\n    <div if.bind=\"plans.length === 0\" style=\"padding:0 12px;\">\n      <p>\n        Für diesen Raum wurden keine Pläne gefunden.\n      </p>\n    </div>\n  </ons-page>\n</template>\n");
    }
  };
});
System.register('alis/services/db.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-fetch-client'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, HttpClient, tables, Database;

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }],
    execute: function () {
      tables = ['systems', 'roomtypes', 'cantons', 'technologies'];

      _export('Database', Database = function () {
        function Database() {
          _classCallCheck(this, Database);

          this.data = {};
          this.http = new HttpClient();
          this.http.configure(function (config) {
            config.useStandardConfiguration().withBaseUrl('//www.zeta.hoeranlagenverzeichnis.ch/query.php?').withDefaults({
              headers: {
                // 'X-Requested-With': 'Fetch'
              }
            }).withInterceptor({
              request: function request(_request) {
                console.log('Requesting ' + _request.method + ' ' + _request.url);
                return _request;
              },
              response: function response(_response) {
                console.log('Received ' + _response.status + ' ' + _response.url);
                return _response;
              }
            });
          });
        }

        _createClass(Database, [{
          key: 'load',
          value: function load() {
            var _this = this;

            return Promise.all(tables.map(function (table) {
              return _this.http.fetch('table=' + table).then(function (response) {
                return response.json();
              }).catch(function (error) {
                console.error(error);
                return {
                  results: []
                };
              });
            })).then(function (data) {
              tables.forEach(function (table, index) {
                _this.data[table] = data[index].results;
              });
              var locations = {};
              var buildingCounter = 0;
              var buildings = _this.data.systems.reduce(function (data, system) {
                var buildingId = system.plz + '-' + system.strasse_nr + '-' + system.gebaeude;
                var orgId = '' + system.organisation;
                if (!data[buildingId]) {
                  buildingCounter++;
                  data[buildingId] = {
                    id: buildingCounter,
                    name: system.gebaeude,
                    lat: system.lat,
                    lng: system.lng,
                    strasse_nr: system.strasse_nr,
                    plz: system.plz,
                    ort: system.ort,
                    kanton: _this.data.cantons.find(function (item) {
                      return item.kantonID === system.kantonID;
                    }),
                    rooms: []
                  };
                }
                system.gebaeudeID = data[buildingId].id;
                data[buildingId].rooms.push(system);
                var locationId = system.ort.trim();
                if (!locations[locationId]) {
                  locations[locationId] = {
                    name: locationId,
                    plz: system.plz,
                    bounds: L.latLngBounds()
                  };
                }
                locations[locationId].bounds.extend(L.latLng(system.lat, system.lng));
                return data;
              }, {});
              _this.data.buildings = Object.keys(buildings).map(function (key) {
                return buildings[key];
              }).map(function (building, index, all) {
                var org = {};
                building.rooms.forEach(function (room) {
                  var orgId = room.organisation;
                  if (!org[orgId]) {
                    org[orgId] = {
                      name: room.organisation,
                      rooms: []
                    };
                  }
                  org[orgId].rooms.push(room);
                });
                building.organisations = Object.keys(org).map(function (key) {
                  return org[key];
                });
                return building;
              });
              _this.data.locations = Object.keys(locations).map(function (key) {
                return locations[key];
              });
              return _this.data;
            });
          }
        }, {
          key: 'queryBuildingsByRoomType',
          value: function queryBuildingsByRoomType(roomType) {
            return this.data.buildings.slice().reduce(function (acc, building) {
              var rooms = building.rooms.slice().filter(function (room) {
                return room.typID === roomType.typID;
              });
              if (rooms.length > 0) {
                (function () {
                  var org = {};
                  building.rooms = rooms;
                  building.rooms.forEach(function (room) {
                    var orgId = room.organisation;
                    if (!org[orgId]) {
                      org[orgId] = {
                        name: room.organisation,
                        rooms: []
                      };
                    }
                    org[orgId].rooms.push(room);
                  });
                  building.organisations = Object.keys(org).map(function (key) {
                    return org[key];
                  });
                  acc.push(building);
                })();
              }
              return acc;
            }, []);
          }
        }, {
          key: 'search',
          value: function search(text) {
            var _this2 = this;

            var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

            var results = {
              locations: [],
              buildings: []
            };

            text = text.trim();

            if (text.length < 3) {
              return results;
            }

            text = text.toLowerCase().split(' ').filter(function (word) {
              return word !== '';
            });

            for (var i = 0; i < this.data.locations.length; i++) {
              var location = this.data.locations[i];
              var searchString = (location.name + ' ' + location.plz).toLowerCase();
              var matches = 0;
              for (var _i = 0; _i < text.length; _i++) {
                var word = text[_i];
                if (searchString.indexOf(word) > -1) {
                  matches++;
                }
              }
              if (matches === text.length) {
                results.locations.push(location);
              }
              if (results.locations.length === 3) {
                break;
              }
            }

            var _loop = function _loop(_i2) {
              var building = _this2.data.buildings[_i2];
              var searchString = building.name + ' ' + building.strasse_nr + ' ' + building.ort + ' ' + building.plz + ' ' + building.kanton.kantonkuerzel;
              building.organisations.forEach(function (org) {
                searchString = searchString + ' ' + org.name;
              });
              building.rooms.forEach(function (room) {
                var roomType = _this2.data.roomtypes.find(function (item) {
                  return item.typID === room.typID;
                });
                searchString = searchString + ' ' + roomType.typ;
              });
              searchString = searchString.toLowerCase();
              var matches = 0;
              for (var _i3 = 0; _i3 < text.length; _i3++) {
                var _word = text[_i3];
                if (searchString.indexOf(_word) > -1) {
                  matches++;
                }
              }
              if (matches === text.length) {
                results.buildings.push(building);
              }
              if (results.buildings.length === count) {
                return 'break';
              }
            };

            for (var _i2 = 0; _i2 < this.data.buildings.length; _i2++) {
              var _ret2 = _loop(_i2);

              if (_ret2 === 'break') break;
            }

            return results;
          }
        }]);

        return Database;
      }());

      _export('Database', Database);
    }
  };
});
System.register('alis/pages/room/plan.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-framework', '../../services/db'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, inject, bindable, Database, _dec, _class, _desc, _value, _class2, _descriptor, Plan;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_servicesDb) {
      Database = _servicesDb.Database;
    }],
    execute: function () {
      _export('Plan', Plan = (_dec = inject(Database), _dec(_class = (_class2 = function () {
        function Plan(db, element) {
          _classCallCheck(this, Plan);

          _initDefineProp(this, 'plan', _descriptor, this);

          this.db = db;
        }

        _createClass(Plan, [{
          key: 'activate',
          value: function activate(params) {
            var _this = this;

            var promises = [];
            this.data = params.data;
            this.plans = [];
            if (this.data.plan1_dateiname !== 'transp.png') {
              (function () {
                var plan = {
                  value: _this.data.plan1_dateiname,
                  text: _this.data.plan2_dateiname !== 'transp.png' ? 'Raumplan ' + (Object.keys(_this.plans).length + 1) : 'Raumplan',
                  url: '//www.zeta.hoeranlagenverzeichnis.ch/admin/images/image_room1/' + _this.data.plan1_dateiname
                };
                promises.push(new Promise(function (resolve, reject) {
                  var img = new Image();
                  img.onload = function () {
                    var scale = 256 / img.width;
                    plan.layer = L.imageOverlay(plan.url, [[0, 0], [img.height * scale, img.width * scale]]);
                    resolve();
                  };
                  img.src = plan.url;
                }));
                _this.plans.push(plan);
              })();
            }
            if (this.data.plan2_dateiname !== 'transp.png') {
              (function () {
                var plan = {
                  value: _this.data.plan2_dateiname,
                  text: _this.data.plan1_dateiname !== 'transp.png' ? 'Raumplan ' + (Object.keys(_this.plans).length + 1) : 'Raumplan',
                  url: '//www.zeta.hoeranlagenverzeichnis.ch/admin/images/image_room2/' + _this.data.plan2_dateiname
                };
                promises.push(new Promise(function (resolve, reject) {
                  var img = new Image();
                  img.onload = function () {
                    var scale = 256 / img.width;
                    plan.layer = L.imageOverlay(plan.url, [[0, 0], [img.height * scale, img.width * scale]]);
                    resolve();
                  };
                  img.src = plan.url;
                }));
                _this.plans.push(plan);
              })();
            }

            return Promise.all(promises);
          }
        }, {
          key: 'attached',
          value: function attached() {
            if (this.plans.length > 0) {
              this.map = L.map(this.planmap, {
                crs: L.CRS.Simple,
                attributionControl: false,
                maxZoom: 4
              });
              this.plan = this.plans[0].value;
            }
          }
        }, {
          key: 'planChanged',
          value: function planChanged(newValue, oldValue) {
            if (oldValue) {
              var plan = this.getPlan(oldValue);
              this.map.removeLayer(plan.layer);
            }
            if (newValue) {
              var _plan = this.getPlan(newValue);
              this.map.addLayer(_plan.layer);
              this.map.fitBounds(_plan.layer.getBounds());
              this.map.setMaxBounds(_plan.layer.getBounds());
            }
          }
        }, {
          key: 'getPlan',
          value: function getPlan(value) {
            return this.plans.find(function (plan) {
              return plan.value === value;
            });
          }
        }]);

        return Plan;
      }(), _descriptor = _applyDecoratedDescriptor(_class2.prototype, 'plan', [bindable], {
        enumerable: true,
        initializer: null
      }), _class2)) || _class));

      _export('Plan', Plan);
    }
  };
});
System.register("alis/resources/index.js", [], function (_export, _context) {
  "use strict";

  function configure(config) {
    // config.globalResources([]);
  }

  _export("configure", configure);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=app-bundle.js.map