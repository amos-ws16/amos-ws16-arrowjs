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
  }
})
