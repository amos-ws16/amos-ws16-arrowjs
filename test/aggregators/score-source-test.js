const buster = require('buster')
const scoreSource = require('../../lib/aggregators/score-source.js')

buster.testCase('scoreSource.create()', {
  'should return an aggregator that can be evaluated': function () {
    let source = scoreSource.create('plugin-a')
    buster.assert.same(source.eval({ 'plugin-a': 0.5 }), 0.5)
  },

  'should return an aggregator that will return the value with which it was created': function () {
    let source = scoreSource.create('plugin-b')
    buster.assert.same(source.eval({ 'plugin-a': 0.5, 'plugin-b': 0.1 }), 0.1)
  },

  'should return null when plugin was not found during evaluation': function () {
    const source = scoreSource.create('not-available')
    buster.assert.same(null, source.eval({}))
  }
})
