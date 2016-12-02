const buster = require('buster')
const weightedMean = require('../../lib/aggregators/weighted-mean.js')

buster.testCase('weightedMean.create()', {
  'should return an aggregator that can be evaluated': function () {
    let stubAgtr = { eval: this.stub().returns(1.0) }
    let agtr = weightedMean.create([[1.0, stubAgtr]])

    buster.assert.same(agtr.eval(), 1.0)
  },

  'should return an aggregator that returns the mean when all weights are 1': function () {
    let stubAgtrA = { eval: this.stub().returns(0.0) }
    let stubAgtrB = { eval: this.stub().returns(1.0) }
    let agtr = weightedMean.create([[1.0, stubAgtrA], [1.0, stubAgtrB]])

    buster.assert.near(agtr.eval(), 0.5, 1e-3)
  },

  'should return an aggregator that returns the weighted mean using the convex combination': function () {
    let stubAgtrA = { eval: this.stub().returns(0.8) }
    let stubAgtrB = { eval: this.stub().returns(0.9) }
    let agtr = weightedMean.create([[20, stubAgtrA], [30, stubAgtrB]])

    buster.assert.near(agtr.eval(), 0.86, 1e-3)
  }
})
