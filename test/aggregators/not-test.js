const buster = require('buster')
const not = require('../../lib/aggregators/not')

buster.testCase('and.create()', {
  'should behave like logical "not" when given non-fractional scores': function () {
    let zero = { eval: this.stub().returns(0.0) }
    let one = { eval: this.stub().returns(1.0) }
    buster.assert.same(not.create(zero).eval(), 1.0)
    buster.assert.same(not.create(one).eval(), 0.0)
  }
})
