const buster = require('buster')

const or = require('../../lib/aggregators/or')
const and = require('../../lib/aggregators/and')
const not = require('../../lib/aggregators/not')
const nand = require('../../lib/aggregators/nand')

buster.testCase('logic aggregators', {
  'should be able to represent or as and expression': function () {
    let zero = { eval: this.stub().returns(0.0) }
    let one = { eval: this.stub().returns(1.0) }

    let A = or.create([ zero, one ])
    let B = nand.create([ not.create(zero), not.create(one) ])

    buster.assert.near(A.eval(), B.eval(), 1e-3)
  },

  'should be able to represent and as or expression': function () {
    let zero = { eval: this.stub().returns(0.0) }
    let one = { eval: this.stub().returns(1.0) }

    let A = and.create([ zero, one ])
    let B = not.create(or.create([ not.create(zero), not.create(one) ]))

    buster.assert.near(A.eval(), B.eval(), 1e-3)
  }
})
