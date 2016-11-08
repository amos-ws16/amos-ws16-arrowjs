# Guidelines for development

## Directory structure

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

There two ways to write asynchronous tests: the traditional way with callbacks
and the ES7 way with `async` and `await`. First, consider the callback way:

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
let app = require('../lib/server.js')

// Callback method.
let request = require('supertest')
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
let request = require('supertest-as-promised')
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

## Working with version control

 + [Keep commits clean](https://www.reviewboard.org/docs/codebase/dev/git/clean-commits/)
 + [Write good discriptions](https://www.reviewboard.org/docs/codebase/dev/writing-good-descriptions/)
