const buster = require('buster')
const plugin = require('../../lib/plugins/compare-numbers-plugin.js')

buster.testCase('compare-numbers-plugin', {
  'should throw an error if input is not a number': function () {
    buster.assert.exception(() => plugin('asd', 123, { operator: '=' }))
    buster.assert.exception(() => plugin(1, 'asd', { operator: '=' }))
  },
  'throw an exception if not known operator': function () {
    buster.assert.exception(() => plugin(123, 123, {}))
    buster.assert.exception(() => plugin(123, 123, { operator: 'abc' }))
  },
  '= works as expected': function () {
    buster.assert.equals(1.0, plugin(10, 10, { operator: '=' }))
    buster.assert.equals(0.0, plugin(10, 1, { operator: '=' }))
  },
  '<= works as expected': function () {
    buster.assert.equals(1.0, plugin(10, 10, { operator: '<=' }))
    buster.assert.equals(1.0, plugin(9, 10, { operator: '<=' }))
    buster.assert.equals(0.0, plugin(10, 9, { operator: '<=' }))
  },
  '< works as expected': function () {
    buster.assert.equals(0.0, plugin(10, 10, { operator: '<' }))
    buster.assert.equals(1.0, plugin(9, 10, { operator: '<' }))
    buster.assert.equals(0.0, plugin(10, 9, { operator: '<' }))
  },
  '>= works as expected': function () {
    buster.assert.equals(1.0, plugin(10, 10, { operator: '>=' }))
    buster.assert.equals(0.0, plugin(9, 10, { operator: '>=' }))
    buster.assert.equals(1.0, plugin(10, 9, { operator: '>=' }))
  },
  '> works as expected': function () {
    buster.assert.equals(0.0, plugin(10, 10, { operator: '>' }))
    buster.assert.equals(0.0, plugin(9, 10, { operator: '>' }))
    buster.assert.equals(1.0, plugin(10, 9, { operator: '>' }))
  },
  'does not accept number formated in strings': function () {
    buster.assert.exception(() => plugin('10', 10, { operator: '=' }))
  },
  'works on floating point': function () {
    buster.assert.equals(1.0, plugin(10.001, 10.02, { operator: '<' }))
  }
})
