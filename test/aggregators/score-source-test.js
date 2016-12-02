const buster = require('buster')
const scoreSource = require('../../lib/aggregators/score-source.js')

buster.testCase('scoreSource.create()', {
  'should return an aggregator that can be evaluated': function () {
    let source = scoreSource.create(0.5)
    buster.assert.same(source.eval(), 0.5)
  },

  'should return an aggregator that will return the value with which it was created': function () {
    let source = scoreSource.create(0.1)
    buster.assert.same(source.eval(), 0.1)
  },

  'should throw an error when no argument was given': function () {
    buster.assert.exception(() => scoreSource.create())
  }

})
