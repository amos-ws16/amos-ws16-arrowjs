const buster = require('buster')
const plugin = require('../../lib/plugins/in-timespan-plugin')

buster.testCase('inTimespanPlugin', {
  'should return 0.0 if time is not between start and end': function () {
    let time = 0
    let start = 10
    let end = 20
    buster.assert.same(plugin(time, start, end), 0.0)
  },

  'should return 1.0 if time is between start and end': function () {
    let time = 15
    let start = 10
    let end = 20
    buster.assert.same(plugin(time, start, end), 1.0)
  },

  'should return 1.0 if time is between start and end and end is less than start': function () {
    let time = 15
    let start = 20
    let end = 10
    buster.assert.same(plugin(time, start, end), 1.0)
  }
})
