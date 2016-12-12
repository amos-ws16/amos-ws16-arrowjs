const buster = require('buster')
const loadModule = require('../lib/utils').loadModule

buster.testCase('loadModule', {
  'should load and return a module within the given directory': function () {
    let module = loadModule('plugins', 'close-time-plugin')
    buster.assert(module)
    let result = module(123, 123)
    buster.assert.near(result, 1.0, 1e-3)
  },

  'should load and return a module from /lib with path .': function () {
    let module = loadModule('.', 'invalid-input-error')
    buster.assert(module)
  },

  'should throw an error when path is contains ..': function () {
    buster.assert.exception(() => loadModule('../test', 'load-module-test'))
  },

  'should throw an error when module name contains slash': function () {
    buster.assert.exception(() => loadModule('.', '../test/load-module-test'))
  }
})
