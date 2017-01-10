const buster = require('buster')
const nullSource = require('../../lib/aggregators/null-source.js')

buster.testCase('nullSource.create()', {
  'should return an aggregator that can be evaluated': function () {
    let source = nullSource.create()
    buster.assert.same(source.eval(), null)
  }
})
