import * as LogManager from 'aurelia-logging';
import {Container, inject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {Router, PipelineProvider, AppRouter, isNavigationCommand} from 'aurelia-router';
import {RouteRecognizer} from 'aurelia-route-recognizer';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Container, History, PipelineProvider, EventAggregator)
export class CustomRouter extends AppRouter {

  /**
  * True if the [[Router]] is navigating into the app for the first time in the browser session.
  */
  isNavigatingFirst;

  /**
  * True if the [[Router]] is navigating to a page instance not in the browser session history.
  */
  isNavigatingNew;

  /**
  * True if the [[Router]] is navigating forward in the browser session history.
  */
  isNavigatingForward;

  /**
  * True if the [[Router]] is navigating back in the browser session history.
  */
  isNavigatingBack;

  /**
  * True if the [[Router]] is navigating due to a browser refresh.
  */
  isNavigatingRefresh;

  /**
  * The currently active navigation tracker.
  */
  currentNavigationTracker;

  constructor(container, history, piplineProvider, events) {
    super(container, history, piplineProvider, events);
  }

  reset() {
    super.reset();
    this.isNavigatingFirst = false;
    this.isNavigatingNew = false;
    this.isNavigatingRefresh = false;
    this.isNavigatingForward = false;
    this.isNavigatingBack = false;
  }

  _dequeueInstruction(instructionCount) {
    return Promise.resolve().then(() => {
      if (this.isNavigating && !instructionCount) {
        return undefined;
      }

      let instruction = this._queue.shift();
      this._queue.length = 0;

      if (!instruction) {
        return undefined;
      }

      this.isNavigating = true;

      let navtracker = this.history.getState('NavigationTracker');
      if (!navtracker && !this.currentNavigationTracker) {
        this.isNavigatingFirst = true;
        this.isNavigatingNew = true;
      }
      else if (!navtracker) {
        this.isNavigatingNew = true;
      }
      else if (!this.currentNavigationTracker) {
        this.isNavigatingRefresh = true;
      }
      else if (this.currentNavigationTracker < navtracker) {
        this.isNavigatingForward = true;
      }
      else if (this.currentNavigationTracker > navtracker) {
        this.isNavigatingBack = true;
      }
      if (!navtracker) {
        navtracker = Date.now();
        this.history.setState('NavigationTracker', navtracker);
      }
      this.currentNavigationTracker = navtracker;

      instruction.previousInstruction = this.currentInstruction;

      if (!instructionCount) {
        this.events.publish('router:navigation:processing', { instruction });
      } else if (instructionCount === this.maxInstructionCount - 1) {
        logger.error(`${instructionCount + 1} navigation instructions have been attempted without success. Restoring last known good location.`);
        restorePreviousLocation(this);
        return this._dequeueInstruction(instructionCount + 1);
      } else if (instructionCount > this.maxInstructionCount) {
        throw new Error('Maximum navigation attempts exceeded. Giving up.');
      }

      let pipeline = this.pipelineProvider.createPipeline();

      return pipeline
        .run(instruction)
        .then(result => processResult(instruction, result, instructionCount, this))
        .catch(error => {
          return { output: error instanceof Error ? error : new Error(error) };
        })
        .then(result => resolveInstruction(instruction, result, !!instructionCount, this));
    });
  }
}

function processResult(instruction, result, instructionCount, router) {
  if (!(result && 'completed' in result && 'output' in result)) {
    result = result || {};
    result.output = new Error(`Expected router pipeline to return a navigation result, but got [${JSON.stringify(result)}] instead.`);
  }

  let finalResult = null;
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

  return router._dequeueInstruction(instructionCount + 1)
    .then(innerResult => finalResult || innerResult || result);
}

function resolveInstruction(instruction, result, isInnerInstruction, router) {
  instruction.resolve(result);

  let eventArgs = { instruction, result };
  if (!isInnerInstruction) {
    router.isNavigating = false;
    router.isExplicitNavigation = false;
    router.isExplicitNavigationBack = false;
    router.isNavigatingFirst = false;
    router.isNavigatingNew = false;
    router.isNavigatingRefresh = false;
    router.isNavigatingForward = false;
    router.isNavigatingBack = false;

    let eventName;

    if (result.output instanceof Error) {
      eventName = 'error';
    } else if (!result.completed) {
      eventName = 'canceled';
    } else {
      let queryString = instruction.queryString ? ('?' + instruction.queryString) : '';
      router.history.previousLocation = instruction.fragment + queryString;
      eventName = 'success';
    }

    router.events.publish(`router:navigation:${eventName}`, eventArgs);
    router.events.publish('router:navigation:complete', eventArgs);
  } else {
    router.events.publish('router:navigation:child:complete', eventArgs);
  }

  return result;
}

function restorePreviousLocation(router) {
  let previousLocation = router.history.previousLocation;
  if (previousLocation) {
    router.navigate(router.history.previousLocation, { trigger: false, replace: true });
  } else if (router.fallbackRoute) {
    router.navigate(router.fallbackRoute, { trigger: true, replace: true });
  } else {
    logger.error('Router navigation failed, and no previous location or fallbackRoute could be restored.');
  }
}
