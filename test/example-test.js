var buster = require('buster')
var myLib = require('../lib/mylib')

buster.testCase('A module', {
  'states the obvious': function () {
    buster.assert(myLib.wisdom)
  }
})

// Showcase an asynchronous test with callback.
buster.testCase('traditionalAsyncTask', {
  'should return 42': done => {
    myLib.traditionalAsyncTask(done((error, result) => {
      buster.refute(error)
      buster.assert.same(result, 42)
    }))
  }
})

// Showcase an asynchronous test with async/await.
buster.testCase('awaitableAsyncTask', {
  'should return 42': async () => {
    buster.assert.same(await myLib.awaitableAsyncTask(), 42)
  }
})

