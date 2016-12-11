
const buster = require('buster')
const max = require('../../lib/aggregators/max')

buster.testCase('max.create()', {
  'should return an aggregator that can be evaluated': function () {
    let stubAgtr = { eval: this.stub().returns(1.0) }
    let agtr = max.create([stubAgtr])

    buster.assert.same(agtr.eval(), 1.0)
  },

  'should return the maximum value when evaluated': function () {
    let stubAgtrA = { eval: this.stub().returns(0.5) }
    let stubAgtrB = { eval: this.stub().returns(0.0) }
    let agtr = max.create([stubAgtrA, stubAgtrB])

    buster.assert.same(agtr.eval(), 0.5)
  }
})
