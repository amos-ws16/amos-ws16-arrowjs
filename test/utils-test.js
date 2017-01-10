const utils = require('../lib/utils')
const buster = require('buster')

buster.testCase('utils', {
  'toDebugString': {
    'should return a human readable string of a javascript object': function () {
      let obj = { x: '134', y: 123, 'this-is-z': null }
      let str = utils.toDebugString(obj)
      buster.assert.equals(str, '{ x: \'134\', y: 123, \'this-is-z\': null }')
    }
  }
})
