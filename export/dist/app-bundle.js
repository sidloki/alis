System.register("alis/app.html!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", "<template>\n  <ons-splitter>\n    <ons-splitter-side id=\"menu\" side=\"left\" collapse swipeable>\n      <ons-page>\n        TODO\n      </ons-page>\n    </ons-splitter-side>\n    <ons-splitter-content>\n      <ons-navigator></ons-navigator>\n    </ons-splitter-content>\n  </ons-splitter>\n</template>\n");
    }
  };
});
System.register('alis/app.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, App;

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }],
    execute: function () {
      _export('App', App = function () {
        function App() {
          _classCallCheck(this, App);
        }

        _createClass(App, [{
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
            }]);
          }
        }]);

        return App;
      }());

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
System.register("alis/pages/home.html!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", "<template>\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"left\">\n        <ons-toolbar-button click.trigger=\"showMenu()\">\n          <ons-icon icon=\"ion-navicon, material:md-menu\"></ons-icon>\n        </ons-toolbar-button>\n      </div>\n      <div class=\"center\">${router.title}</div>\n      <div class=\"right\">\n        <ons-toolbar-button>\n          <ons-icon icon=\"ion-search, material:md-search\"></ons-icon>\n        </ons-toolbar-button>\n      </div>\n    </ons-toolbar>\n    <ons-bottom-toolbar>\n      <div style=\"line-height:44px;padding:0 8px;\" click.trigger=\"showList()\">Liste anzeigen</div>\n    </ons-bottom-toolbar>\n  </ons-page>\n</template>\n");
    }
  };
});
System.register('alis/pages/home.js', ['node_modules/systemjs-plugin-babel/babel-helpers/classCallCheck.js', 'node_modules/systemjs-plugin-babel/babel-helpers/createClass.js', 'aurelia-router', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var _classCallCheck, _createClass, Router, inject, _dec, _class, Home;

  return {
    setters: [function (_node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs) {
      _classCallCheck = _node_modulesSystemjsPluginBabelBabelHelpersClassCallCheckJs.default;
    }, function (_node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs) {
      _createClass = _node_modulesSystemjsPluginBabelBabelHelpersCreateClassJs.default;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export('Home', Home = (_dec = inject(Router), _dec(_class = function () {
        function Home(router) {
          _classCallCheck(this, Home);

          this.router = router;
        }

        _createClass(Home, [{
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
        }]);

        return Home;
      }()) || _class));

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
System.register('alis/resources/index.js', [], function (_export, _context) {
  "use strict";

  function configure(config) {
    config.globalResources(['./elements/ons-back-button', './elements/ons-navigator']);
  }

  _export('configure', configure);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=app-bundle.js.map