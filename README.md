# ALis

[![Build Status][travis-image]][travis-url]
[![Code Coverage][codecov-image]][codecov-url]

A mobile application to find locations with assistive listening systems.

## Requirements and installation

To run and develop the application [Node.js](https://nodejs.org/en/) (>=6) and [Yarn](https://yarnpkg.com) are required. The install instructions can be found on their websites.

From the project folder, execute the following command to install the dependencies:

```bash
yarn install
```

## Running the app

To run the application, execute the following command:

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

## Export a production version

There's a script to export all the required files to separate folder:

```bash
yarn export
```

The exported files can be used on a webserver or to create a hybrid application on your own machine or with the [Phonegap Build Service](https://build.phonegap.com/).

> To use the Phonegap Build Service you have to delete the `index.html` in the root folder, rename the `export` directory to `www` and commit the changes. To do this, a branch `phonegap` exists.



[travis-url]: https://travis-ci.org/sidloki/alis
[travis-image]: https://travis-ci.org/sidloki/alis.svg?branch=master
[codecov-url]: https://codecov.io/gh/sidloki/alis
[codecov-image]: https://codecov.io/gh/sidloki/alis/branch/master/graph/badge.svg
