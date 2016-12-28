const buster = require('buster')
const not = require('../../lib/aggregators/not')

buster.testCase('not.create()', {
  'should behave like logical "not" when given non-fractional scores': function () {
    let zero = { eval: this.stub().returns(0.0) }
    let one = { eval: this.stub().returns(1.0) }
    buster.assert.same(not.create(zero).eval(), 1.0)
    buster.assert.same(not.create(one).eval(), 0.0)
  },

  'should return high score when input has low score': function () {
    let a = { eval: this.stub().returns(0.1) }
    buster.assert.greater(not.create(a).eval(), 0.8)
  },

  'should return low score when input has high score': function () {
    let a = { eval: this.stub().returns(0.9) }
    buster.assert.less(not.create(a).eval(), 0.2)
  }
})
