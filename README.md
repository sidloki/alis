# ALiS

[![Build Status][travis-image]][travis-url]
[![Code Coverage][codecov-image]][codecov-url]

A mobile application to find locations with assistive listening systems.

## Requirements and installation

To run and develop the application [Node.js](https://nodejs.org/en/) (>=6) and [Yarn](https://yarnpkg.com) are required. The install instructions can be found on their websites.

To install the projcet dependencies, execute the following command from the project folder:

```bash
yarn install
```

## Running the app

To run the app, execute the following command:

```bash
yarn serve
```

This builds the app and starts a webserver. Browse to [https://localhost:9000](https://localhost:9000) to see the app.

To develop the application execute the following command:

```bash
yarn watch
```

You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.

> The app uses [BrowserSync](http://www.browsersync.io/) for automated page refreshes on code changes concurrently across multiple browsers. If you prefer to disable the mirroring feature set the [ghostMode option](http://www.browsersync.io/docs/options/#option-ghostMode) to `false`.

## Running the test

Scripts are created to run the unit test, either wiht or without showing and creating a coverage report:

```bash
yarn test
```
or

```bash
yarn test-coverage
```

For a static code analysis [ESLint](http://eslint.org/) is prepared. To run the analysis execute the follwoing command:

```bash
yarn lint
```


## Export a production version

There's a script to export all the required files to a separate folder `export`:

```bash
yarn export
```

The exported files can be used on a webserver or to create a hybrid application on your own machine useing [Cordova](https://cordova.apache.org/) or with the [Phonegap Build Service](https://build.phonegap.com/).

> To use the Phonegap Build Service you have to delete the `index.html` in the root folder, rename the `export` directory to `www` and commit the changes. To do this, a branch `phonegap` exists.

> To create the hybrid App on your own system, renaming the `export` folder to `www` is sufficient and you don't have to commit the changes.



[travis-url]: https://travis-ci.org/sidloki/alis
[travis-image]: https://travis-ci.org/sidloki/alis.svg?branch=master
[codecov-url]: https://codecov.io/gh/sidloki/alis
[codecov-image]: https://codecov.io/gh/sidloki/alis/branch/master/graph/badge.svg
