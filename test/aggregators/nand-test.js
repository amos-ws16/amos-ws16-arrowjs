const buster = require('buster')
const nand = require('../../lib/aggregators/nand')

buster.testCase('nand.create()', {
  'should behave like logical "nand" when given non-fractional scores': function () {
    let zero = { eval: this.stub().returns(0.0) }
    let one = { eval: this.stub().returns(1.0) }
    buster.assert.same(nand.create([zero, zero]).eval(), 1.0)
    buster.assert.same(nand.create([zero, one]).eval(), 1.0)
    buster.assert.same(nand.create([one, zero]).eval(), 1.0)
    buster.assert.same(nand.create([one, one]).eval(), 0.0)
  },

  'should return high score when both inputs have low score': function () {
    let a = { eval: this.stub().returns(0.1) }
    let b = { eval: this.stub().returns(0.05) }
    buster.assert.greater(nand.create([a, b]).eval(), 0.8)
  },

  'should return low score when both of the inputs has a high score': function () {
    let a = { eval: this.stub().returns(0.95) }
    let b = { eval: this.stub().returns(0.95) }
    buster.assert.less(nand.create([a, b]).eval(), 0.2)
  },

  'should pass arguments to eval to the inner aggregators': function () {
    let stubAgtr = { eval: this.stub().returns(null) }
    let agtr = nand.create([stubAgtr])
    agtr.eval({ 'plugin-a': 1.0 })

    buster.assert.calledWith(stubAgtr.eval, { 'plugin-a': 1.0 })
  },

  'should be able to use *': function () {
    let agtr = nand.create('*')
    const result = agtr.eval({ 'plugin-a': 1.0, 'plugin-b': 0.0 })
    buster.assert.same(result, 1.0)
  }
})
