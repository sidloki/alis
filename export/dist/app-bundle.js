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
            return this.db.load();
          }
        }, {
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = 'Höranlagen';
            config.map([{
              route: ['', 'home'],
              name: 'home',
              moduleId: './pages/home',
              nav: false,
              title: 'Home'
            }, {
              route: 'list',
              name: 'list',
              moduleId: './pages/list',
              nav: false,
              title: 'List',
              options: {
                animation: 'lift'
              }
            }, {
              route: 'room/:id',
              name: 'room',
              moduleId: './pages/room/info',
              nav: false,
              title: 'Room'
            }]);
          }
        }]);

        return App;
      }()) || _class));

      _export('App', App);
    }
  };
});
System.register('alis/lib/custom-router.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'node_modules/systemjs-plugin-babel/babel-helpers/possibleConstructorReturn.js', 'node_modules/systemjs-plugin-babel/babel-helpers/get.js', 'node_modules/systemjs-plugin-babel/babel-helpers/inherits.js', 'aurelia-logging', 'aurelia-dependency-injection', 'aurelia-history', 'aurelia-router', 'aurelia-route-recognizer', 'aurelia-event-aggregator'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, _possibleConstructorReturn, _get, _inherits, LogManager, Container, inject, History, Router, PipelineProvider, AppRouter, isNavigationCommand, RouteRecognizer, EventAggregator, _dec, _class, CustomRouter;

  function processResult(instruction, result, instructionCount, router) {
    if (!(result && 'completed' in result && 'output' in result)) {
      result = result || {};
      result.output = new Error('Expected router pipeline to return a navigation result, but got [' + JSON.stringify(result) + '] instead.');
    }

    var finalResult = null;
    if (isNavigationCommand(result.output)) {
      result.output.navigate(router);
    } else {
      finalResult = result;

      if (!result.completed) {
        if (result.output instanceof Error) {
          logger.error(result.output);
        }

        restorePreviousLocation(router);
      }
    }

    return router._dequeueInstruction(instructionCount + 1).then(function (innerResult) {
      return finalResult || innerResult || result;
    });
  }

  function resolveInstruction(instruction, result, isInnerInstruction, router) {
    instruction.resolve(result);

    var eventArgs = { instruction: instruction, result: result };
    if (!isInnerInstruction) {
      router.isNavigating = false;
      router.isExplicitNavigation = false;
      router.isExplicitNavigationBack = false;
      router.isNavigatingFirst = false;
      router.isNavigatingNew = false;
      router.isNavigatingRefresh = false;
      router.isNavigatingForward = false;
      router.isNavigatingBack = false;

      var eventName = void 0;

      if (result.output instanceof Error) {
        eventName = 'error';
      } else if (!result.completed) {
        eventName = 'canceled';
      } else {
        var queryString = instruction.queryString ? '?' + instruction.queryString : '';
        router.history.previousLocation = instruction.fragment + queryString;
        eventName = 'success';
      }

      router.events.publish('router:navigation:' + eventName, eventArgs);
      router.events.publish('router:navigation:complete', eventArgs);
    } else {
      router.events.publish('router:navigation:child:complete', eventArgs);
    }

    return result;
  }

  function restorePreviousLocation(router) {
    var previousLocation = router.history.previousLocation;
    if (previousLocation) {
      router.navigate(router.history.previousLocation, { trigger: false, replace: true });
    } else if (router.fallbackRoute) {
      router.navigate(router.fallbackRoute, { trigger: true, replace: true });
    } else {
      logger.error('Router navigation failed, and no previous location or fallbackRoute could be restored.');
    }
  }
  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersPossibleConstructorReturnJs) {
      _possibleConstructorReturn = _node_modulesSystemjsPluginBabelBabelHelpersPossibleConstructorReturnJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersGetJs) {
      _get = _node_modulesSystemjsPluginBabelBabelHelpersGetJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersInheritsJs) {
      _inherits = _node_modulesSystemjsPluginBabelBabelHelpersInheritsJs.default;
    }, function (_aureliaLogging) {
      LogManager = _aureliaLogging;
    }, function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaHistory) {
      History = _aureliaHistory.History;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
      PipelineProvider = _aureliaRouter.PipelineProvider;
      AppRouter = _aureliaRouter.AppRouter;
      isNavigationCommand = _aureliaRouter.isNavigationCommand;
    }, function (_aureliaRouteRecognizer) {
      RouteRecognizer = _aureliaRouteRecognizer.RouteRecognizer;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      _export('CustomRouter', CustomRouter = (_dec = inject(Container, History, PipelineProvider, EventAggregator), _dec(_class = function (_AppRouter) {
        _inherits(CustomRouter, _AppRouter);

        /**
        * True if the [[Router]] is navigating due to a browser refresh.
        */

        /**
        * True if the [[Router]] is navigating forward in the browser session history.
        */

        /**
        * True if the [[Router]] is navigating into the app for the first time in the browser session.
        */
        function CustomRouter(container, history, piplineProvider, events) {
          _classCallCheck(this, CustomRouter);

          return _possibleConstructorReturn(this, (CustomRouter.__proto__ || Object.getPrototypeOf(CustomRouter)).call(this, container, history, piplineProvider, events));
        }

        /**
        * The currently active navigation tracker.
        */

        /**
        * True if the [[Router]] is navigating back in the browser session history.
        */

        /**
        * True if the [[Router]] is navigating to a page instance not in the browser session history.
        */

        _createClass(CustomRouter, [{
          key: 'reset',
          value: function reset() {
            _get(CustomRouter.prototype.__proto__ || Object.getPrototypeOf(CustomRouter.prototype), 'reset', this).call(this);
            this.isNavigatingFirst = false;
            this.isNavigatingNew = false;
            this.isNavigatingRefresh = false;
            this.isNavigatingForward = false;
            this.isNavigatingBack = false;
          }
        }, {
          key: '_dequeueInstruction',
          value: function _dequeueInstruction(instructionCount) {
            var _this2 = this;

            return Promise.resolve().then(function () {
              if (_this2.isNavigating && !instructionCount) {
                return undefined;
              }

              var instruction = _this2._queue.shift();
              _this2._queue.length = 0;

              if (!instruction) {
                return undefined;
              }

              _this2.isNavigating = true;

              var navtracker = _this2.history.getState('NavigationTracker');
              if (!navtracker && !_this2.currentNavigationTracker) {
                _this2.isNavigatingFirst = true;
                _this2.isNavigatingNew = true;
              } else if (!navtracker) {
                _this2.isNavigatingNew = true;
              } else if (!_this2.currentNavigationTracker) {
                _this2.isNavigatingRefresh = true;
              } else if (_this2.currentNavigationTracker < navtracker) {
                _this2.isNavigatingForward = true;
              } else if (_this2.currentNavigationTracker > navtracker) {
                _this2.isNavigatingBack = true;
              }
              if (!navtracker) {
                navtracker = Date.now();
                _this2.history.setState('NavigationTracker', navtracker);
              }
              _this2.currentNavigationTracker = navtracker;

              instruction.previousInstruction = _this2.currentInstruction;

              if (!instructionCount) {
                _this2.events.publish('router:navigation:processing', { instruction: instruction });
              } else if (instructionCount === _this2.maxInstructionCount - 1) {
                logger.error(instructionCount + 1 + ' navigation instructions have been attempted without success. Restoring last known good location.');
                restorePreviousLocation(_this2);
                return _this2._dequeueInstruction(instructionCount + 1);
              } else if (instructionCount > _this2.maxInstructionCount) {
                throw new Error('Maximum navigation attempts exceeded. Giving up.');
              }

              var pipeline = _this2.pipelineProvider.createPipeline();

              return pipeline.run(instruction).then(function (result) {
                return processResult(instruction, result, instructionCount, _this2);
              }).catch(function (error) {
                return { output: error instanceof Error ? error : new Error(error) };
              }).then(function (result) {
                return resolveInstruction(instruction, result, !!instructionCount, _this2);
              });
            });
          }
        }]);

        return CustomRouter;
      }(AppRouter)) || _class));

      _export('CustomRouter', CustomRouter);
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
System.register('alis/main.js', ['aurelia-binding', 'aurelia-bootstrapper', 'aurelia-event-aggregator', 'aurelia-framework', 'aurelia-dependency-injection', 'aurelia-history-browser', 'aurelia-loader-default', 'aurelia-logging-console', 'aurelia-metadata', 'aurelia-pal-browser', 'aurelia-path', 'aurelia-polyfills', 'aurelia-route-recognizer', 'aurelia-router', 'aurelia-templating', 'aurelia-templating-binding', 'aurelia-templating-resources', 'aurelia-templating-router', './lib/custom-router', './environment'], function (_export, _context) {
  "use strict";

  var BrowserHistory, CustomRouter, Router, RouteLoader, TemplatingRouteLoader, environment;
  function configure(aurelia) {
    aurelia.use.singleton(RouteLoader, TemplatingRouteLoader).singleton(Router, CustomRouter);
    aurelia.use.container.registerAlias(Router, CustomRouter);
    aurelia.use.basicConfiguration().history().feature('alis/resources');

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
    setters: [function (_aureliaBinding) {}, function (_aureliaBootstrapper) {}, function (_aureliaEventAggregator) {}, function (_aureliaFramework) {}, function (_aureliaDependencyInjection) {}, function (_aureliaHistoryBrowser) {
      BrowserHistory = _aureliaHistoryBrowser.BrowserHistory;
    }, function (_aureliaLoaderDefault) {}, function (_aureliaLoggingConsole) {}, function (_aureliaMetadata) {}, function (_aureliaPalBrowser) {}, function (_aureliaPath) {}, function (_aureliaPolyfills) {}, function (_aureliaRouteRecognizer) {}, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
      RouteLoader = _aureliaRouter.RouteLoader;
    }, function (_aureliaTemplating) {}, function (_aureliaTemplatingBinding) {}, function (_aureliaTemplatingResources) {}, function (_aureliaTemplatingRouter) {
      TemplatingRouteLoader = _aureliaTemplatingRouter.TemplatingRouteLoader;
    }, function (_libCustomRouter) {
      CustomRouter = _libCustomRouter.CustomRouter;
    }, function (_environment) {
      environment = _environment.default;
    }],
    execute: function () {

      BrowserHistory.prototype.setState = function (key, value) {
        var state = Object.assign({}, this.history.state);
        state[key] = value;
        this.history.replaceState(state, null, null);
      };

      BrowserHistory.prototype.getState = function (key) {
        var state = Object.assign({}, this.history.state);
        return state[key];
      };
    }
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

      _export("default", ".leaflet-system-icon {\n  background-color: #db4437;\n  border-radius: 50%;\n  border: 1.5px solid #ffffff;\n  box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.75);\n  line-height: 22px;\n  font-size: 14px;\n  color: #ffffff;\n  text-align: center;\n}\n");
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

      _export("default", "<template>\n  <require from=\"./home.css\"></require>\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"left\">\n        <ons-toolbar-button click.trigger=\"showMenu()\">\n          <ons-icon icon=\"ion-navicon, material:md-menu\"></ons-icon>\n        </ons-toolbar-button>\n      </div>\n      <div class=\"center\">${router.title}</div>\n      <div class=\"right\">\n        <!-- <ons-toolbar-button click.trigger=\"test()\">\n          <ons-icon icon=\"ion-search, material:md-search\"></ons-icon>\n        </ons-toolbar-button> -->\n      </div>\n    </ons-toolbar>\n    <div style=\"display:flex;flex-direction:column;height:100%;\">\n      <div ref=\"map\" style=\"flex:1;width:100%;\"></div>\n      <div show.bind=\"selection\" style=\"position:relative;max-height:60%;height:auto;overflow:overlay;z-index:10000\" ref=\"roomlist\">\n        <ons-button style=\"position:fixed;right:0;left:auto;margin-top:-16px;z-index:10000;\" modifier=\"quiet\">\n          <ons-icon icon=\"ion-record,material:md-circle\" size=\"2x\" style=\"color:#fff;\"></ons-icon>\n        </ons-button>\n        <ons-button click.trigger=\"deselect()\" style=\"position:fixed;right:0;left:auto;margin-top:-16px;z-index:10001;\" modifier=\"quiet\">\n          <ons-icon icon=\"ion-ios-close,material:md-close-circle\" size=\"2x\"></ons-icon>\n        </ons-button>\n        <ons-list>\n          <template if.bind=\"selection.rooms.length === 1\">\n            <ons-list-header if.bind=\"selection.name && selection.name !== getRoomName(selection.rooms[0])\">\n              <span>${selection.name}</span>\n            </ons-list-header>\n            <template repeat.for=\"org of selection.organisations\">\n              <ons-list-item repeat.for=\"room of org.rooms\" tappable click.trigger=\"showRoom(room)\">\n                <span class=\"list-item__title\">\n                  <span>${getRoomName(room)}</span>\n                </span>\n                <span class=\"list-item__subtitle\" if.bind=\"room.organisation\">\n                  <span>${room.organisation}</span>\n                </span>\n              </ons-list-item>\n            </template>\n          </template>\n          <template if.bind=\"selection.rooms.length > 1\">\n            <ons-list-header if.bind=\"selection.name\">\n              <span>${selection.name}</span>\n            </ons-list-header>\n              <template repeat.for=\"org of selection.organisations\">\n                <ons-list-item repeat.for=\"room of org.rooms\" tappable click.trigger=\"showRoom(room)\">\n                  <span class=\"list-item__title\">\n                    <span>${getRoomName(room)}</span>\n                  </span>\n                  <span class=\"list-item__subtitle\" if.bind=\"room.organisation\">\n                    <span>${room.organisation}</span>\n                  </span>\n                </ons-list-item>\n              </template>\n          </template>\n        </ons-list>\n      </div>\n      <!-- <ons-bottom-toolbar show.bind=\"!selection\" style=\"position:relative;\">\n        <div style=\"line-height:44px;padding:0 16px;\" click.trigger=\"showList()\">\n            Liste anzeigen\n        </div>\n      </ons-bottom-toolbar> -->\n    </div>\n  </ons-page>\n</template>\n");
    }
  };
});
System.register('alis/pages/home.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-router', 'aurelia-framework', '../services/db'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, Router, inject, bindable, Database, _dec, _class, _desc, _value, _class2, _descriptor, Home;

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
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_servicesDb) {
      Database = _servicesDb.Database;
    }],
    execute: function () {
      _export('Home', Home = (_dec = inject(Router, Database), _dec(_class = (_class2 = function () {
        function Home(router, db) {
          _classCallCheck(this, Home);

          _initDefineProp(this, 'selection', _descriptor, this);

          this.router = router;
          this.db = db;
        }

        _createClass(Home, [{
          key: 'test',
          value: function test() {
            debugger;
          }
        }, {
          key: 'attached',
          value: function attached() {
            var _this = this;

            var map = L.map(this.map, {
              attributionControl: false
            });
            var markers = L.markerClusterGroup({
              maxClusterRadius: 40
            }).addTo(map);
            var roads = L.gridLayer.googleMutant({
              type: 'roadmap', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
              styles: [{
                featureType: "poi",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
              }]
            }).addTo(map);
            map.setView([46.801111, 8.226667], 7);

            markers.on('click', function (e) {
              _this.selection = e.layer.data;
            });

            this._map = map;

            this.db.data.buildings.forEach(function (building) {
              // TODO: marker icons
              var myIcon = L.divIcon({
                className: 'leaflet-system-icon fa fa-deaf',
                iconSize: 22
              });
              var marker = L.marker([building.lat, building.lng], { icon: myIcon }).addTo(markers);
              marker.data = building;
            });
          }
        }, {
          key: 'deselect',
          value: function deselect() {
            this.selection = null;
          }
        }, {
          key: 'selectionChanged',
          value: function selectionChanged(newValue, oldValue) {
            if (newValue) {
              this.roomlist.scrollTop = 0;
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
          key: 'showFilter',
          value: function showFilter() {
            // this.filter.show();
          }
        }]);

        return Home;
      }(), _descriptor = _applyDecoratedDescriptor(_class2.prototype, 'selection', [bindable], {
        enumerable: true,
        initializer: null
      }), _class2)) || _class));

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
System.register("alis/pages/room.html!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", "<template>\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"left\">\n        <ons-back-button></ons-back-button>\n      </div>\n      <div class=\"center\">${getRoomName()}</div>\n    </ons-toolbar>\n    <div if.bind=\"getPhotoUrl()\" style=\"background-image:url('${getPhotoUrl()}');background-repeat:no-repeat;background-size:cover;background-position:center;width:100%;height:35%;\">\n    </div>\n    <ons-list>\n      <ons-list-item if.bind=\"data.strasse_nr || data.plz || data.org\" tappable>\n        <span class=\"left\">\n          <ons-icon icon=\"ion-ios-location,material:md-pin\" fixed-width=\"true\"></ons-icon>\n        </span>\n        <span class=\"center\">\n          <span class=\"list-item__title\">\n            ${data.organisation}\n            <br if.bind=\"data.gebaeude\"/>\n            ${data.gebaeude}\n          </span>\n          <span class=\"list-item__subtitle\">\n            ${data.strasse_nr}\n            <br if.bind=\"data.plz || data.org\"/>${data.plz} ${data.ort}\n          </span>\n      </ons-list-item>\n      <ons-list-item if.bind=\"data.webadresse\" click.trigger=\"openWebsite()\" tappable>\n        <span class=\"left\">\n          <ons-icon icon=\"md-globe\" fixed-width=\"true\"></ons-icon>\n        </span>\n        <span class=\"center\">${data.webtext || 'Website'}</span>\n      </ons-list-item>\n      <ons-list-item>\n        <span class=\"left\" style=\"\">\n          <img src=\"${getTechImageUrl()}\" alt=\"\" style=\"width:1.28571429em;\"/>\n        </span>\n        <span class=\"center\">\n          ${getTechName()}\n        </span>\n      </ons-list-item>\n      <ons-list-item if.bind=\"data.bemerkung\">\n        ${data.bemerkung}\n      </ons-list-item>\n    </ons-list>\n  </ons-page>\n</template>\n");
    }
  };
});
System.register('alis/pages/room.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-framework', '../services/db'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, inject, Database, _dec, _class, Room;

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
      _export('Room', Room = (_dec = inject(Database), _dec(_class = function () {
        function Room(db) {
          _classCallCheck(this, Room);

          this.db = db;
        }

        _createClass(Room, [{
          key: 'activate',
          value: function activate(params) {
            this.data = this.db.data.systems.find(function (item) {
              return params.id === item.anlageID;
            });
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
              return '//hoeranlagenverzeichnis.ch/admin/images/image_front/' + url;
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
          key: 'getRoomName',
          value: function getRoomName() {
            var _this3 = this;

            var name = (this.data.raum + ' ' + this.data.raumnummer).trim();
            if (!name) {
              name = this.data.gebaeude;
            }
            if (!name) {
              var type = this.db.data.roomtypes.find(function (type) {
                return type.typID === _this3.data.typID;
              });
              name = type.typ;
            }
            return name;
          }
        }]);

        return Room;
      }()) || _class));

      _export('Room', Room);
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

      _export("default", "<template>\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"left\">\n        <ons-back-button></ons-back-button>\n      </div>\n      <div class=\"center\">${getRoomName()}</div>\n    </ons-toolbar>\n    <ons-tabbar ref=\"tabbar\">\n      <ons-tab repeat.for=\"tab of tabs\" model.bind=\"tab\">\n    </ons-tabbar>\n  </ons-page>\n</template>\n");
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
              label: 'Infos',
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

      _export("default", "<template>\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"left\">\n        <ons-back-button></ons-back-button>\n      </div>\n      <div class=\"center\">${getRoomName()}</div>\n    </ons-toolbar>\n    <div if.bind=\"getPhotoUrl()\" style=\"background-image:url('${getPhotoUrl()}');background-repeat:no-repeat;background-size:cover;background-position:center;width:100%;height:35%;\">\n    </div>\n    <ons-list>\n      <ons-list-item if.bind=\"data.strasse_nr || data.plz || data.org\" tappable>\n        <span class=\"left\">\n          <ons-icon icon=\"ion-ios-location,material:md-pin\" fixed-width=\"true\"></ons-icon>\n        </span>\n        <span class=\"center\">\n          <span class=\"list-item__title\">\n            ${data.organisation}\n            <br if.bind=\"data.gebaeude\"/>\n            ${data.gebaeude}\n          </span>\n          <span class=\"list-item__subtitle\">\n            ${data.strasse_nr}\n            <br if.bind=\"data.plz || data.org\"/>${data.plz} ${data.ort}\n          </span>\n      </ons-list-item>\n      <ons-list-item if.bind=\"data.webadresse\" click.trigger=\"openWebsite()\" tappable>\n        <span class=\"left\">\n          <ons-icon icon=\"md-globe\" fixed-width=\"true\"></ons-icon>\n        </span>\n        <span class=\"center\">${data.webtext || 'Website'}</span>\n      </ons-list-item>\n      <ons-list-item>\n        <span class=\"left\" style=\"\">\n          <img src=\"${getTechImageUrl()}\" alt=\"\" style=\"width:1.28571429em;\"/>\n        </span>\n        <span class=\"center\">\n          ${getTechName()}\n        </span>\n      </ons-list-item>\n      <ons-list-item if.bind=\"data.bemerkung\">\n        ${data.bemerkung}\n      </ons-list-item>\n    </ons-list>\n  </ons-page>\n</template>\n");
    }
  };
});
System.register('alis/pages/room/info.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-framework', '../../services/db'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, inject, Database, _dec, _class, Info;

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
      _export('Info', Info = (_dec = inject(Database), _dec(_class = function () {
        function Info(db) {
          _classCallCheck(this, Info);

          this.db = db;
        }

        _createClass(Info, [{
          key: 'activate',
          value: function activate(params) {
            this.data = this.db.data.systems.find(function (item) {
              return params.id === item.anlageID;
            });
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
              return '//hoeranlagenverzeichnis.ch/admin/images/image_front/' + url;
            }
          }
        }, {
          key: 'getTechImageUrl',
          value: function getTechImageUrl() {
            var _this2 = this;

            var technology = this.db.data.technologies.find(function (type) {
              return type.techID === _this2.data.techID;
            });
            return 'resources/symbols/' + technology.technologie + '.png';
          }
        }, {
          key: 'getTechName',
          value: function getTechName() {
            var _this3 = this;

            var technology = this.db.data.technologies.find(function (type) {
              return type.techID === _this3.data.techID;
            });
            return technology.technologie;
          }
        }]);

        return Info;
      }()) || _class));

      _export('Info', Info);
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

      _export("default", "<template>\n  <ons-page>\n    <!-- <div if.bind=\"plans.length > 0\" style=\"display:flex;width:100%;height:100%;\">\n      <ons-list if.bind=\"plans.length > 1\" style=\"width:100%;\">\n        <ons-list-item>\n          <ons-select value.bind=\"selection\" style=\"width:100%;\">\n            <option repeat.for=\"plan of plans\" value.bind=\"plan.value\">${plan.name}</option>\n          </ons-select>\n        </ons-list-item>\n      </ons-list>\n    </div>\n    <div if.bind=\"plans.length === 0\" style=\"padding:0 16px;\">\n      <p>Für diesen Raum sind keine Raumpläne vorhanden.</p>\n    </div> -->\n\n    <div style=\"display:flex;flex-direction:column;height:100%;\">\n      <div ref=\"plan\" style=\"flex:1;width:100%;\"></div>\n      <ons-button click.trigger=\"test()\">Test</ons-button>\n    </div>\n  </ons-page>\n</template>\n");
    }
  };
});
System.register('alis/services/db.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-fetch-client'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, HttpClient, Database;

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }],
    execute: function () {
      _export('Database', Database = function () {
        function Database() {
          _classCallCheck(this, Database);

          this.data = {};
          this.http = new HttpClient();
          this.http.configure(function (config) {
            config.useStandardConfiguration().withBaseUrl('http://zeta.hoeranlagenverzeichnis.ch/query.php?').withDefaults({
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

            var tables = ['systems', 'roomtypes', 'cantons', 'technologies'];
            return Promise.all(tables.map(function (table) {
              return _this.http.fetch('table=' + table).then(function (response) {
                return response.json();
              });
            })).then(function (data) {
              tables.forEach(function (table, index) {
                _this.data[table] = data[index].results;
              });
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
                    kantonID: system.kantonID,
                    rooms: []
                  };
                }
                system.gebaeudeID = data[buildingId].id;
                data[buildingId].rooms.push(system);
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
              var stats = {
                roomsPerBuilding: {},
                orgsPerBuilding: {}
              };
              _this.data.buildings.forEach(function (building) {
                var roomCount = building.rooms.length;
                if (!stats.roomsPerBuilding[roomCount]) {
                  stats.roomsPerBuilding[roomCount] = 0;
                }
                stats.roomsPerBuilding[roomCount]++;
                var orgCount = building.organisations.length;
                if (!stats.orgsPerBuilding[orgCount]) {
                  stats.orgsPerBuilding[orgCount] = 0;
                }
                stats.orgsPerBuilding[orgCount]++;
              });
              console.log(stats);
              return _this.data;
            });
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

          _initDefineProp(this, 'selection', _descriptor, this);

          this.db = db;
        }

        _createClass(Plan, [{
          key: 'test',
          value: function test() {
            debugger;
          }
        }, {
          key: 'activate',
          value: function activate(params) {
            var _this = this;

            debugger;
            this.data = this.db.data.systems.find(function (item) {
              return params.id === item.anlageID;
            });
            var promises = [];
            // this.data = params.data;
            this.plans = [];
            if (this.data.plan1_dateiname !== 'transp.png') {
              (function () {
                var plan = {};
                plan.name = 'Raumplan ' + (_this.plans.length + 1);
                plan.value = _this.data.plan1_dateiname, plan.url = '//hoeranlagenverzeichnis.ch/admin/images/image_room1/' + _this.data.plan1_dateiname;
                // plan.layer = L.imageOverlay(plan.url);

                _this.plans.push(plan);

                var img = new Image();
                promises.push(new Promise(function (resolve, reject) {
                  img.onload = function () {
                    plan.width = img.width;
                    plan.height = img.height;
                    // let scale = 256 / img.width;
                    // plan.bounds = L.latLngBounds([
                    //   [0, 0],
                    //   [img.height/2, img.width/2]
                    // ]);
                    // plan.layer = L.imageOverlay(plan.url, [[img.height/-2,img.width/-2], [img.height/2,img.width/2]]);
                    resolve();
                  };
                  img.src = plan.url;
                }));
              })();
            }
            if (this.data.plan2_dateiname !== 'transp.png') {
              (function () {
                var img = new Image();
                var plan = {};
                plan.name = 'Raumplan ' + (_this.plans.length + 1);
                plan.value = _this.data.plan2_dateiname, plan.url = '//hoeranlagenverzeichnis.ch/admin/images/image_room2/' + _this.data.plan2_dateiname;
                // plan.layer = L.imageOverlay(plan.url);

                _this.plans.push(plan);

                promises.push(new Promise(function (resolve, reject) {
                  img.onload = function () {
                    plan.width = img.width;
                    plan.height = img.height;
                    plan.layer = L.imageOverlay(plan.url, [[0, 0], [img.height / 1000, img.width / 1000]]);
                    resolve();
                  };
                  img.src = plan.url;
                }));
              })();
            }
            return Promise.all(promises);
          }
        }, {
          key: 'attached',
          value: function attached() {
            debugger;
            this.map = L.map(this.plan, {
              crs: L.CRS.Simple,
              attributionControl: false
            });
            if (this.plans.length > 0) {
              this.selection = this.plans[0].value;
            }
          }
        }, {
          key: 'selectionChanged',
          value: function selectionChanged(newValue, oldValue) {
            if (this.currentPlan) {
              this.map.removeLayer(this.currentPlan.layer);
            }
            this.currentPlan = this.plans.find(function (plan) {
              return plan.value === newValue;
            });
            if (this.currentPlan) {
              // let plan = this.currentPlan;
              // let bounds = L.latLngBounds([[0,0],[plan.height,plan.width]]);
              // let layer = L.imageOverlay(plan.url, bounds);
              // this.map.addLayer(layer);
              // this.map.fitBounds(bounds);
              // this.map.addLayer(layer);
              // this.map.fitBounds(layer.getBounds());
              // let h = this.currentPlan.height;
              // let w = this.currentPlan.width;
              // debugger;
              var southWest = this.map.unproject([0, this.currentPlan.height], this.map.getMaxZoom());
              var northEast = this.map.unproject([this.currentPlan.width, 0], this.map.getMaxZoom());
              var bounds = new L.LatLngBounds(southWest, northEast);
              // // let bounds = this.currentPlan.layer.getBounds();
              // this.currentPlan.layer.setBounds(bounds);
              // // this.currentPlan.layer.setBounds([[0,0], [this.currentPlan.height, this.currentPlan.height]]);
              // // this.map.setMaxBounds(bounds);
              // // this.map.setMinZoom(Math.ceil(this.currentPlan.width/256)*-1);
              // // this.map.setCenter()
              // this.map.addLayer(this.currentPlan.layer);
              // this.map.setMaxBounds(bounds);
            }
          }
        }]);

        return Plan;
      }(), _descriptor = _applyDecoratedDescriptor(_class2.prototype, 'selection', [bindable], {
        enumerable: true,
        initializer: null
      }), _class2)) || _class));

      _export('Plan', Plan);
    }
  };
});
System.register('alis/resources/elements/ons-back-button.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-dependency-injection', 'aurelia-pal', 'aurelia-templating', 'aurelia-router'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, inject, DOM, customElement, noView, bindable, Router, _dec, _dec2, _class, OnsBackButton;

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_aureliaTemplating) {
      customElement = _aureliaTemplating.customElement;
      noView = _aureliaTemplating.noView;
      bindable = _aureliaTemplating.bindable;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }],
    execute: function () {
      _export('OnsBackButton', OnsBackButton = (_dec = customElement('ons-back-button'), _dec2 = inject(DOM.Element, Router), _dec(_class = noView(_class = _dec2(_class = function () {
        function OnsBackButton(element, router) {
          _classCallCheck(this, OnsBackButton);

          this.router = router;
          this.element = element;
          this.element.onClick = this.onClick.bind(this);
        }

        _createClass(OnsBackButton, [{
          key: 'onClick',
          value: function onClick() {
            this.router.navigateBack();
          }
        }]);

        return OnsBackButton;
      }()) || _class) || _class) || _class));

      _export('OnsBackButton', OnsBackButton);
    }
  };
});
System.register('alis/resources/elements/ons-navigator.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'node_modules/systemjs-plugin-babel/babel-helpers/possibleConstructorReturn.js', 'node_modules/systemjs-plugin-babel/babel-helpers/inherits.js', 'onsenui', 'aurelia-dependency-injection', 'aurelia-pal', 'aurelia-templating', 'aurelia-router', 'aurelia-templating-router'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, _possibleConstructorReturn, _inherits, ons, Container, inject, DOM, bindable, CompositionEngine, CompositionTransaction, customElement, noView, ShadowDOM, SwapStrategies, ViewSlot, ViewLocator, Router, RouterView, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, OnsNavigator;

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

  function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
      return Promise.resolve().then(function () {
        return instance[name](model);
      }).then(function (result) {
        if (result !== null && result !== undefined) {
          return result;
        }

        return true;
      });
    }

    return Promise.resolve(true);
  }
  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersPossibleConstructorReturnJs) {
      _possibleConstructorReturn = _node_modulesSystemjsPluginBabelBabelHelpersPossibleConstructorReturnJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersInheritsJs) {
      _inherits = _node_modulesSystemjsPluginBabelBabelHelpersInheritsJs.default;
    }, function (_onsenui) {
      ons = _onsenui.default;
    }, function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_aureliaTemplating) {
      bindable = _aureliaTemplating.bindable;
      CompositionEngine = _aureliaTemplating.CompositionEngine;
      CompositionTransaction = _aureliaTemplating.CompositionTransaction;
      customElement = _aureliaTemplating.customElement;
      noView = _aureliaTemplating.noView;
      ShadowDOM = _aureliaTemplating.ShadowDOM;
      SwapStrategies = _aureliaTemplating.SwapStrategies;
      ViewSlot = _aureliaTemplating.ViewSlot;
      ViewLocator = _aureliaTemplating.ViewLocator;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_aureliaTemplatingRouter) {
      RouterView = _aureliaTemplatingRouter.RouterView;
    }],
    execute: function () {
      _export('OnsNavigator', OnsNavigator = (_dec = customElement('ons-navigator'), _dec2 = inject(DOM.Element, Container, ViewSlot, Router, ViewLocator, CompositionTransaction, CompositionEngine), _dec(_class = noView(_class = _dec2(_class = (_class2 = function (_RouterView) {
        _inherits(OnsNavigator, _RouterView);

        function OnsNavigator(element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine) {
          _classCallCheck(this, OnsNavigator);

          var _this = _possibleConstructorReturn(this, (OnsNavigator.__proto__ || Object.getPrototypeOf(OnsNavigator)).call(this, element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine));

          _initDefineProp(_this, 'swapOrder', _descriptor, _this);

          _initDefineProp(_this, 'layoutView', _descriptor2, _this);

          _initDefineProp(_this, 'layoutViewModel', _descriptor3, _this);

          _initDefineProp(_this, 'layoutModel', _descriptor4, _this);

          _this.element.pageLoader = new ons.PageLoader(_this.load.bind(_this), _this.unload.bind(_this));

          _this.view;
          _this.viewStack = [];
          return _this;
        }

        _createClass(OnsNavigator, [{
          key: 'swap',
          value: function swap(viewPortInstruction) {
            if (viewPortInstruction.component.router.isNavigatingBack) {
              var options = viewPortInstruction.component.router.currentInstruction.previousInstruction.config.options || {};
              options.data = viewPortInstruction;
              return this.element.popPage(options);
            } else {
              var _options = viewPortInstruction.component.router.currentInstruction.config.options || {};
              _options.data = viewPortInstruction;
              return this.element.pushPage(viewPortInstruction.moduleId, _options);
            }
          }
        }, {
          key: 'load',
          value: function load(_ref, done) {
            var _this2 = this;

            var page = _ref.page,
                parent = _ref.parent,
                params = _ref.params;

            var viewPortInstruction = params;
            var previousView = this.view;

            var work = function work() {
              var pageElement = _this2.view.fragment.firstElementChild;
              _this2.viewSlot.add(_this2.view);
              if (previousView) {
                _this2.viewStack.push(previousView);
              }
              _this2._notify();
              return done(pageElement);
            };

            var ready = function ready(owningView) {
              viewPortInstruction.controller.automate(_this2.overrideContext, owningView);
              if (_this2.compositionTransactionOwnershipToken) {
                return _this2.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function () {
                  _this2.compositionTransactionOwnershipToken = null;
                  return work();
                });
              }

              return work();
            };

            this.view = viewPortInstruction.controller.view;

            return ready(this.owningView);
          }
        }, {
          key: 'unload',
          value: function unload(pageElement) {
            var _this3 = this;

            return invokeLifecycle(this.view.controller.viewModel, 'deactivate').then(function () {
              _this3.viewSlot.remove(_this3.view);
              _this3.view.unbind();
              _this3.view = _this3.viewStack.pop();
            });
          }
        }]);

        return OnsNavigator;
      }(RouterView), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'swapOrder', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'layoutView', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'layoutViewModel', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'layoutModel', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class));

      _export('OnsNavigator', OnsNavigator);
    }
  };
});
System.register('alis/resources/elements/ons-select.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-dependency-injection', 'aurelia-pal', 'aurelia-templating', 'aurelia-binding'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, inject, DOM, customElement, noView, bindable, bindingMode, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, OnsSelect;

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
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_aureliaTemplating) {
      customElement = _aureliaTemplating.customElement;
      noView = _aureliaTemplating.noView;
      bindable = _aureliaTemplating.bindable;
    }, function (_aureliaBinding) {
      bindingMode = _aureliaBinding.bindingMode;
    }],
    execute: function () {
      _export('OnsSelect', OnsSelect = (_dec = customElement('ons-select'), _dec2 = inject(DOM.Element), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = noView(_class = _dec2(_class = (_class2 = function () {
        function OnsSelect(element) {
          _classCallCheck(this, OnsSelect);

          _initDefineProp(this, 'value', _descriptor, this);

          // hack to remove au-content element
          var content = element.querySelector('au-content');
          content.parentNode.replaceChild(content.firstChild, content);

          this.element = element;
          this.element.onchange = this.onChange.bind(this);
        }

        _createClass(OnsSelect, [{
          key: 'attached',
          value: function attached() {
            this.element.value = this.value;
          }
        }, {
          key: 'onChange',
          value: function onChange() {
            this.value = this.element.value;
          }
        }, {
          key: 'valueChanged',
          value: function valueChanged(newValue, oldValue) {
            this.element.value = newValue;
          }
        }]);

        return OnsSelect;
      }(), _descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
        enumerable: true,
        initializer: null
      }), _class2)) || _class) || _class) || _class));

      _export('OnsSelect', OnsSelect);
    }
  };
});
System.register('alis/resources/elements/ons-tab.js', ['node_modules/systemjs-plugin-babel/babel-helpers/slicedToArray.js', 'node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'onsenui', 'aurelia-dependency-injection', 'aurelia-pal', 'aurelia-templating'], function (_export, _context) {
  "use strict";

  var _slicedToArray, _classCallCheck, _createClass, ons, inject, Container, DOM, ViewSlot, ViewResources, CompositionEngine, customElement, noView, bindable, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, elementAttributes, OnsTab;

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

  function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
      return Promise.resolve().then(function () {
        return instance[name](model);
      }).then(function (result) {
        if (result !== null && result !== undefined) {
          return result;
        }

        return true;
      });
    }

    return Promise.resolve(true);
  }
  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersSlicedToArrayJs) {
      _slicedToArray = _node_modulesSystemjsPluginBabelBabelHelpersSlicedToArrayJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_onsenui) {
      ons = _onsenui.default;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
      Container = _aureliaDependencyInjection.Container;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_aureliaTemplating) {
      ViewSlot = _aureliaTemplating.ViewSlot;
      ViewResources = _aureliaTemplating.ViewResources;
      CompositionEngine = _aureliaTemplating.CompositionEngine;
      customElement = _aureliaTemplating.customElement;
      noView = _aureliaTemplating.noView;
      bindable = _aureliaTemplating.bindable;
    }],
    execute: function () {
      elementAttributes = ['page', 'icon', 'active-icon', 'label', 'badge', 'active'];

      _export('OnsTab', OnsTab = (_dec = customElement('ons-tab'), _dec2 = inject(DOM.Element, Container, CompositionEngine, ViewSlot, ViewResources), _dec(_class = noView(_class = _dec2(_class = (_class2 = function () {
        function OnsTab(element, container, compositionEngine, viewSlot, viewResources) {
          _classCallCheck(this, OnsTab);

          _initDefineProp(this, 'model', _descriptor, this);

          this.element = element;
          this.container = container;
          this.compositionEngine = compositionEngine;
          this.viewSlot = viewSlot;
          this.viewResources = viewResources;

          this.element.pageLoader = new ons.PageLoader(this.load.bind(this), this.unload.bind(this));

          this.view = null;
        }

        _createClass(OnsTab, [{
          key: 'created',
          value: function created(owningView) {
            this.owningView = owningView;
          }
        }, {
          key: 'bind',
          value: function bind(bindingContext, overrideContext) {
            var _this = this;

            this.bindingContext = bindingContext;
            this.overrideContext = overrideContext;
            Object.entries(this.model).forEach(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              if (elementAttributes.indexOf(key) > -1) {
                _this.element.setAttribute(key, value);
              }
            });
          }
        }, {
          key: 'unbind',
          value: function unbind(bindingContext, overrideContext) {
            this.bindingContext = null;
            this.overrideContext = null;
          }
        }, {
          key: 'load',
          value: function load(_ref3, done) {
            var _this2 = this;

            var page = _ref3.page,
                parent = _ref3.parent,
                params = _ref3.params;

            var instruction = {
              container: this.container,
              model: this.model,
              viewResources: this.viewResources
            };
            if (/\.html/.test(page)) {
              instruction.view = page;
            } else {
              instruction.viewModel = page;
            }
            this.compositionEngine.createController(instruction).then(function (controller) {
              var pageElement = controller.view.fragment.firstElementChild;
              controller.automate(_this2.overrideContext, _this2.owningView);
              _this2.viewSlot.add(controller.view);
              _this2.view = controller.view;
              done(pageElement);
            });
          }
        }, {
          key: 'unload',
          value: function unload(pageElement) {
            var _this3 = this;

            return invokeLifecycle(this.view.controller.viewModel, 'deactivate').then(function () {
              _this3.viewSlot.remove(_this3.view);
              _this3.view.unbind();
            });
          }
        }]);

        return OnsTab;
      }(), _descriptor = _applyDecoratedDescriptor(_class2.prototype, 'model', [bindable], {
        enumerable: true,
        initializer: null
      }), _class2)) || _class) || _class) || _class));

      _export('OnsTab', OnsTab);
    }
  };
});
System.register('alis/resources/index.js', [], function (_export, _context) {
  "use strict";

  function configure(config) {
    config.globalResources(['./elements/ons-back-button', './elements/ons-navigator', './elements/ons-tab', './elements/ons-select']);
  }

  _export('configure', configure);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=app-bundle.js.map