# Game of Drones

### Installation

it requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install 
$ npm start
```

For run tests ...

```sh
$ npm test
```

To load initial data in the app, replace the initialState of the app in app/main.js(5) by

```sh
var initialState = require('mocks/mockedState');
```