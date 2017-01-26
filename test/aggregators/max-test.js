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
  },

  'should ignore null value and return max of rest': function () {
    let stubAgtrA = { eval: this.stub().returns(0.5) }
    let stubAgtrB = { eval: this.stub().returns(0.0) }
    let stubAgtrC = { eval: this.stub().returns(null) }
    let agtr = max.create([stubAgtrA, stubAgtrB, stubAgtrC])

    buster.assert.same(agtr.eval(), 0.5)
  },

  'should return 0.0 if only null value is present': function () {
    let stubAgtrA = { eval: this.stub().returns(null) }
    let stubAgtrB = { eval: this.stub().returns(null) }
    let stubAgtrC = { eval: this.stub().returns(null) }
    let agtr = max.create([stubAgtrA, stubAgtrB, stubAgtrC])

    buster.assert.same(agtr.eval(), 0.0)
  },

  'should pass arguments to eval to the inner aggregators': function () {
    let stubAgtr = { eval: this.stub().returns(null) }
    let agtr = max.create([stubAgtr])
    agtr.eval({ 'plugin-a': 1.0 })

    buster.assert.calledWith(stubAgtr.eval, { 'plugin-a': 1.0 })
  },

  'should throw an InvalidInputError when argument is not an array': function () {
    let stubAgtrA = { eval: this.stub().returns(null) }
    buster.assert.exception(() => max.create(stubAgtrA), 'InvalidInputError')
  },

  'should be able to use *': function () {
    let agtr = max.create('*')
    const result = agtr.eval({ 'plugin-a': 0.0, 'plugin-b': 0.5 })
    buster.assert.near(result, 0.5, 1.0e-3)
  }
})
