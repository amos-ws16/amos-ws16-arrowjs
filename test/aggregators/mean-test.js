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
    let stubAgtrA = { eval: this.stub() }
    let stubAgtrB = { eval: this.stub() }
    mean.create([ stubAgtrA, stubAgtrB ])

    buster.assert.calledWith(stubCreate, [[1.0, stubAgtrA], [1.0, stubAgtrB]])
  },

  'should return what weightedMean.create returns': function () {
    let stubAgtrA = { eval: this.stub() }
    let stubAgtrB = { eval: this.stub() }
    this.stub(weightedMean, 'create').returns('1234')
    let agtr = mean.create([ stubAgtrA, stubAgtrB ])

    buster.assert.same(agtr, '1234')
  },

  'should throw an error if no argument is provided': function () {
    buster.assert.exception(() => mean.create())
  },

  'shoud throw an error if argument is not an array': function () {
    buster.assert.exception(() => mean.create('something else'))
  },

  'should throw an error if any array element has no eval method': function () {
    let agtrs = [ 'one' ]
    buster.assert.exception(() => mean.create(agtrs))
  },

  'should be able to use *': function () {
    let agtr = mean.create('*')
    const result = agtr.eval({ 'plugin-a': 1.0, 'plugin-b': 0.0 })
    buster.assert.near(result, 0.5, 1.0e-3)
  }
})
