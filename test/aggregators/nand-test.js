const buster = require('buster')
const nand = require('../../lib/aggregators/nand')

buster.testCase('and.create()', {
  'should behave like logical "nand" when given non-fractional scores': function () {
    let zero = { eval: this.stub().returns(0.0) }
    let one = { eval: this.stub().returns(1.0) }
    buster.assert.same(nand.create([zero, zero]).eval(), 1.0)
    buster.assert.same(nand.create([zero, one]).eval(), 0.0)
    buster.assert.same(nand.create([one, zero]).eval(), 0.0)
    buster.assert.same(nand.create([one, one]).eval(), 0.0)
  }
})
