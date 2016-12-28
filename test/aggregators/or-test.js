const buster = require('buster')
const or = require('../../lib/aggregators/or')

buster.testCase('or.create()', {
  'should behave like logical "or" when given non-fractional scores': function () {
    let zero = { eval: this.stub().returns(0.0) }
    let one = { eval: this.stub().returns(1.0) }
    buster.assert.same(or.create([zero, zero]).eval(), 0.0)
    buster.assert.same(or.create([zero, one]).eval(), 1.0)
    buster.assert.same(or.create([one, zero]).eval(), 1.0)
    buster.assert.same(or.create([one, one]).eval(), 1.0)
  },

  'should return high score when both inputs have high score': function () {
    let a = { eval: this.stub().returns(0.9) }
    let b = { eval: this.stub().returns(0.95) }
    buster.assert.greater(or.create([a, b]).eval(), 0.8)
  },

  'should return high score when one of the inputs has a high score': function () {
    let a = { eval: this.stub().returns(0.1) }
    let b = { eval: this.stub().returns(0.95) }
    buster.assert.greater(or.create([a, b]).eval(), 0.8)
    buster.assert.greater(or.create([b, a]).eval(), 0.8)
  },

  'should return low score when both inputs have a low score': function () {
    let a = { eval: this.stub().returns(0.1) }
    let b = { eval: this.stub().returns(0.1) }
    buster.assert.less(or.create([a, b]).eval(), 0.2)
  }
})
