# Wear4cast (Suggestions on what to wear based on the weather forecast)

[![build status](https://img.shields.io/travis/erikras/react-redux-universal-hot-example/master.svg?style=flat-square)](https://travis-ci.org/erikras/react-redux-universal-hot-example)
[![Dependency Status](https://david-dm.org/erikras/react-redux-universal-hot-example.svg?style=flat-square)](https://david-dm.org/erikras/react-redux-universal-hot-example)
[![devDependency Status](https://david-dm.org/erikras/react-redux-universal-hot-example/dev-status.svg?style=flat-square)](https://david-dm.org/erikras/react-redux-universal-hot-example#info=devDependencies)
[![react-redux-universal channel on discord](https://img.shields.io/badge/discord-react--redux--universal%40reactiflux-brightgreen.svg?style=flat-square)](https://discord.gg/0ZcbPKXt5bZZb1Ko)
[![Demo on Heroku](https://img.shields.io/badge/demo-heroku-brightgreen.svg?style=flat-square)](https://react-redux.herokuapp.com)
[![PayPal donate button](https://img.shields.io/badge/donate-paypal-brightgreen.svg?style=flat-square)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E2LK57ZQ9YRMN)

----

## About

This project is using [React Redux Universal Hot Example](https://github.com/erikras/react-redux-universal-hot-example) as a starter boilerplate:

* ~~Isomorphic~~ [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) rendering
* Both client and server make calls to load data from separate API server
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [Express](http://expressjs.com)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Redux](https://github.com/rackt/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs).
* [React Router Redux](https://github.com/reactjs/react-router-redux) Redux/React Router bindings.
* [ESLint](http://eslint.org) to maintain a consistent code style
* [redux-form](https://github.com/erikras/redux-form) to manage form state in Redux
* [lru-memoize](https://github.com/erikras/lru-memoize) to speed up form validation
* [multireducer](https://github.com/erikras/multireducer) to combine single reducers into one key-based reducer
* [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader) and [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css, sass and less,
* [bootstrap-sass-loader](https://github.com/shakacode/bootstrap-sass-loader) and [font-awesome-webpack](https://github.com/gowravshekar/font-awesome-webpack) to customize Bootstrap and FontAwesome
* [react-helmet](https://github.com/nfl/react-helmet) to manage title and meta tag information on both server and client
* [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server
* [mocha](https://mochajs.org/) to allow writing unit tests for the project.

In addition it is using:
* [OpenWeatherMap API](http://openweathermap.org/api) for current weather and forecasted weather
* [redux-promise](https://github.com/acdlite/redux-promise) middleware
* [axios](https://github.com/mzabriskie/axios) for async HTTP requests
* [moment-timezone](http://momentjs.com/timezone/) Unix to local time conversion (OpenWeatherMap API returns Unix time)
* [coordinate-tz](https://github.com/thingsinjars/coordinate-tz) Timezone based on coordinates (OpenWeatherMap API returns longitude and latitude)
* [react-chartjs](https://www.npmjs.com/package/react-chartjs) and [chart.js](http://www.chartjs.org/) charts
* [react-custom-scrollbars](https://malte-wessel.github.io/react-custom-scrollbars/) better looking scrollbars

## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

The first time it may take a little while to generate the first `webpack-assets.json` and complain with a few dozen `[webpack-isomorphic-tools] (waiting for the first Webpack build to finish)` printouts, but be patient. Give it 30 seconds.

### Using Redux DevTools

[Redux Devtools](https://github.com/gaearon/redux-devtools) are enabled by default in development.

- <kbd>CTRL</kbd>+<kbd>H</kbd> Toggle DevTools Dock
- <kbd>CTRL</kbd>+<kbd>Q</kbd> Move DevTools Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detailed information.

If you have the
[Redux DevTools chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) installed it will automatically be used on the client-side instead.

If you want to disable the dev tools during development, set `__DEVTOOLS__` to `false` in `/webpack/dev.config.js`.  
DevTools are not enabled during production.

## Building and Running Production Server

```bash
npm run build
npm run start
```

## Demo
<!--
A demonstration of this app can be seen [running on heroku](https://react-redux.herokuapp.com), which is a deployment of the [heroku branch](https://github.com/erikras/react-redux-universal-hot-example/tree/heroku). -->

#### Images
I used AWS S3 to host images on this site

#### Unit Tests

The project uses [Mocha](https://mochajs.org/) to run your unit tests, it uses [Karma](http://karma-runner.github.io/0.13/index.html) as the test runner, it enables the feature that you are able to render your tests to the browser (e.g: Firefox, Chrome etc.), which means you are able to use the [Test Utilities](http://facebook.github.io/react/docs/test-utils.html) from Facebook api like `renderIntoDocument()`.

To run the tests in the project, just simply run `npm test` if you have `Chrome` installed, it will be automatically launched as a test service for you.

To keep watching your test suites that you are working on, just set `singleRun: false` in the `karma.conf.js` file. Please be sure set it to `true` if you are running `npm test` on a continuous integration server (travis-ci, etc).

## Deployment on Heroku

To get this project to work on Heroku, you need to:

1. Remove the `"PORT": 8080` line from the `betterScripts` / `start-prod` section of `package.json`.
2. `heroku config:set NODE_ENV=production`
3. `heroku config:set NODE_PATH=./src`
4. `heroku config:set NPM_CONFIG_PRODUCTION=false`
  * This is to enable webpack to run the build on deploy.

The first deploy might take a while, but after that your `node_modules` dir should be cached.
