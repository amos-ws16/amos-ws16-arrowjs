const buster = require('buster')
const mean = require('../../lib/aggregators/mean')

const weightedMean = require('../../lib/aggregators/weighted-mean')

buster.testCase('mean.create()', {
  'should return an aggregator that can be evaluated': function () {
    let stubAgtr = { eval: this.stub().returns(1.0) }
    let agtr = mean.create([stubAgtr])

    buster.assert.same(agtr.eval(), 1.0)
  },

  'should forward aggregation to a weighted mean aggregator with weights set to 1': function () {
    let stubCreate = this.stub(weightedMean, 'create')
    mean.create(['agtrA', 'agtrB'])

    buster.assert.calledWith(stubCreate, [[1.0, 'agtrA'], [1.0, 'agtrB']])
  },

  'should return what weightedMean.create returns': function () {
    this.stub(weightedMean, 'create').returns('1234')
    let agtr = mean.create(['agtrA', 'agtrB'])

    buster.assert.same(agtr, '1234')
  }
})
