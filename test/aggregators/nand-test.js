const buster = require('buster')
const nand = require('../../lib/aggregators/nand')

buster.testCase('nand.create()', {
  'should behave like logical "nand" when given non-fractional scores': function () {
    let zero = { eval: this.stub().returns(0.0) }
    let one = { eval: this.stub().returns(1.0) }
    buster.assert.same(nand.create([zero, zero]).eval(), 1.0)
    buster.assert.same(nand.create([zero, one]).eval(), 0.0)
    buster.assert.same(nand.create([one, zero]).eval(), 0.0)
    buster.assert.same(nand.create([one, one]).eval(), 0.0)
  },

  'should return high score when both inputs have low score': function () {
    let a = { eval: this.stub().returns(0.1) }
    let b = { eval: this.stub().returns(0.05) }
    buster.assert.greater(nand.create([a, b]).eval(), 0.8)
  },

  'should return low score when one of the inputs has a high score': function () {
    let a = { eval: this.stub().returns(0.1) }
    let b = { eval: this.stub().returns(0.95) }
    buster.assert.less(nand.create([a, b]).eval(), 0.2)
  }
})
