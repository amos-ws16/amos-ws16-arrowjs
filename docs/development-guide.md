# Guidelines for development

## Directory structure

All files should have lowercase names with hypens to separate subwords, see
also [Node.js best practices @ Heroku Dev](https://devcenter.heroku.com/articles/node-best-practices#stick-with-lowercase).

The directory structure should be organized like this:

    <project root>
    ├── bin
    │   └── cli.js
    ├── docs
    │   ├── api
    │   │   ├── module1.md
    │   │   └── module2.md
    │   ├── examples.md
    │   ├── guides.md
    │   └── tutorials.md
    ├── lib
    │   ├── module1-model.js
    │   ├── module1.js
    │   └── module2.js
    └── test
        ├── buster.js
        ├── module1
        │   ├── submodule1-test.js
        │   └── submodule2-test.js
        └── module2-test.js

## Setup

    $ git clone git@github.com:amos-ws16/amos-ws16-aibot.git
    $ cd amos-ws16-aibot
    $ npm install
    $ npm test

## Coding standards

All code needs to conform to the
[standard.js](https://github.com/feross/standard) code guidelines and
additionally all classes, methods and functions must provide a `jsdoc`
documentation ([require-jsdoc](http://eslint.org/docs/rules/require-jsdoc)).
These rules will be checked with eslint on each `npm test` and push to the
github repository by Travis-CI.

## Tests

Tests are written with [buster.js](http://docs.busterjs.org/en/latest/). For
testing of [express.js](http://expressjs.com) based REST functionality use
[supertest](https://github.com/visionmedia/supertest).

### Asynchronous tests

There are two ways to write asynchronous tests: the traditional way with
callbacks and the ES7 way with `async` and `await`. First, consider the
callback way:

```javascript
buster.testCase('An async function with callback', {

  // The test case function takes special done function as argument.
  'should pass a return value to the callback': (done) => {

    // Call asynchronous function and pass done(callbackFunction).
    unitUnderTest.myAsyncFunction(done((callbackArgument) => {

      // Do assertions on the callback arguments
      buster.assert.same(callbackArgument, 42)
    }))
  }
})
```

When the function under test is awaitable, i.e. it returns a promise, then in
the test cases `async` and `await` can be used to simplify the code and
hopefully make the intention more clear:

```javascript
buster.testCase('An async function with async/await', {

  // The test case function is declared async.
  'should pass a return value to the callback': async () => {

    // Call asynchronous function as if it were synchronous with await.
    let result = await unitUnderTest.myAsyncFunction()

    // Do assertions on the result
    buster.assert.same(result, 42)
  }
})
```

For more information about `async` and `await` see for example
[here](https://ponyfoo.com/articles/understanding-javascript-async-await).

### Acceptance tests with supertest

Acceptance tests for a HTTP based RESTful API are inherently asynchronous, so
the testing methods in the previous section apply. Our API is implemented using
[express.js](http://expressjs.com) which can be tested using
[supertest](https://github.com/visionmedia/supertest) or
[supertest-as-promised](https://github.com/WhoopInc/supertest-as-promised) with
the traditional callback method or the `async`/`await` method respectively.
Here is a minimal example for both methods:

```javascript
// Get the express object.
const app = require('../lib/server.js')

// Callback method.
const request = require('supertest')
buster.testCase('GET /api/route', {
  'should return some information': done => {
    request(app)
      .get('/api/route')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done((err, res) => {
        // Do assertions on err and res.
        buster.assert.same(res.body.message, 'Hello World')
      }))
  }
})

// Async/await method.
const request = require('supertest-as-promised')
buster.testCase('GET /api/route', {
  'should return some information': async () => {
    let res = await request(app)
      .get('/api/route')
      .expect('Content-Type', /json/)
      .expect(200)

    // Do assertions on res. If an error is expected use buster.exception.
    buster.assert.same(res.body.message, 'Hello World')
  }
})
```

__TODO__: Make sure to reset / freshly provision `app` before each test, i.e.
in buster's `setUp`/`tearDown` hooks.

### Mocking/Stubbing dependencies in tests

Unit tests should be self contained. In particular, success or failure of a
unit test should only depend on the correct functionality of the unit under
test (UUT) and not on other libraries that are used internally by the UUT as
dependencies. When such a dependency is taking a long time to do it's task or
has an asynchronous API potentially using unpredictable data (date, time, HTTP
requests, etc.) testing will be slow and/or depend on the success or failure of
those operations. Therefore, such dependencies should be replaced in the tests
by stubs (or mocks), whose behaviour can be set inside the specific test. This
way the unit test will test the interaction with the external dependency and
the unit's behaviour assuming a specific behaviour of external dependency.

When working with buster.js, stubs can be used through
[buster-sinon](http://docs.busterjs.org/en/latest/modules/buster-sinon/). As an
example assume you have a function that depends on an external library in
`my-module.js` and the test in `my-module-test.js`.
```javascript
// lib/my-module.js
const fancyLib = require('fancy-lib')

function doSomethingUseful () {
  return fancyLib.getFancyWorkDone() + 1
}

module.exports = { doSomethingUseful }
```

Now, to test this function in isolation, we need to stub out
`fancyLib.getFancyWorkDone()`. We only expect our function to return one more
than whatever that function returned. This is the test:
```javascript
// test/my-module-test.js
const buster = require('buster')

const myModule = require('../lib/my-module')
const fancyLib = require('fancy-lib')

buster.testCase('My Module', {
  'should return one more than fancy-lib': function () {
    this.stub(fancyLib, 'getFancyWorkDone').returns(1)

    let result = myModule.doSomethingUseful()

    buster.assert.equals(result, 2)
  }
})
```

In this example buster.js replaces the `getFancyWorkDone` function of the
`fancyLib` library with a test double that can be configured to anything, i.e.
return 1. When the test case is done, it restores the function to it's original
definition so that every test case is independent from every other test case.
The stub has many methods to query how it was used in the test, for example how
many times and with which arguments the function was called. For more
information see the
[buster-sinon](http://docs.busterjs.org/en/latest/modules/buster-sinon/) and
[Sinon.js](http://sinonjs.org/docs/) documentations.

## Working with version control

 + [Keep commits clean](https://www.reviewboard.org/docs/codebase/dev/git/clean-commits/)
 + [Write good descriptions](https://www.reviewboard.org/docs/codebase/dev/writing-good-descriptions/)

## Development vs. Production

To make work easier and more comfortable there are two different modes for the code. These are `development`
mode and `production mode`. `development` mode can be used for e.g. avoiding to use a token to use the API.
To start the server in `development` mode enter

    $ npm run dev

To run in `production` mode simply type

    $ npm start

The development mode is stored in (and can be accessed by) `process.env.NODE_ENV`.

## Miscellaneous Commands

Automatically fix all files (ESLint):

    $ npm run eslintfix
