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
  }
})
