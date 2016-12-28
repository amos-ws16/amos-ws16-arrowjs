const buster = require('buster')
const and = require('../../lib/aggregators/and')

buster.testCase('and.create()', {
  'should behave like logical "and" when givne non-fractional scores': function () {
    let zero = { eval: this.stub().returns(0.0) }
    let one = { eval: this.stub().returns(1.0) }
    buster.assert.same(and.create([zero, zero]).eval(), 0.0)
    buster.assert.same(and.create([zero, one]).eval(), 0.0)
    buster.assert.same(and.create([one, zero]).eval(), 0.0)
    buster.assert.same(and.create([one, one]).eval(), 1.0)
  },

  'should return high score when both inputs have high score': function () {
    let a = { eval: this.stub().returns(0.9) }
    let b = { eval: this.stub().returns(0.95) }
    buster.assert.greater(and.create([a, b]).eval(), 0.8)
  },

  'should return low score when one of the inputs has a low score': function () {
    let a = { eval: this.stub().returns(0.1) }
    let b = { eval: this.stub().returns(0.95) }
    buster.assert.less(and.create([a, b]).eval(), 0.1)
    buster.assert.less(and.create([b, a]).eval(), 0.1)
  },

  'should return low score when both of the inputs have a low score': function () {
    let a = { eval: this.stub().returns(0.1) }
    let b = { eval: this.stub().returns(0.1) }
    buster.assert.less(and.create([a, b]).eval(), 0.1)
  }
})
