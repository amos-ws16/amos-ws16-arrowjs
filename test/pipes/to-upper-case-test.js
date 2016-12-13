const buster = require('buster')
const pipe = require('../../lib/pipes/to-upper-case')

buster.testCase('Pipe: toUpperCase', {
  'should transform the input to upper case': function () {
    let input = 'TestCase'
    let result = pipe(input)
    buster.assert.equals(result, 'TESTCASE')
  }
})
