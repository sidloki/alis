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
yarn prod
```

This builds the app and starts a webserver. Browse to [https://localhost:9000](https://localhost:9000) to see the app.

To develop the application execute the following command:

```bash
yarn dev
```

You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.

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


## Create production version

### For webserver

Run a production build and copy all files of `dist` folder to the webserver:

```bash
yarn build
```

### For Cordova/PhoneGap

There's a script to export all the required files to a separate folder `www`:

```bash
yarn phonegap
```

The exported files can be used to create a hybrid application on your own machine using [Cordova](https://cordova.apache.org/) or with the [Phonegap Build Service](https://build.phonegap.com/).



[travis-url]: https://travis-ci.org/sidloki/alis
[travis-image]: https://travis-ci.org/sidloki/alis.svg?branch=master
[codecov-url]: https://codecov.io/gh/sidloki/alis
[codecov-image]: https://codecov.io/gh/sidloki/alis/branch/master/graph/badge.svg
