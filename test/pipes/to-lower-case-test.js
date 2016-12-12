const buster = require('buster')
const pipe = require('../../lib/pipes/to-lower-case.js')

buster.testCase('Pipe: toLowerCase', {
  'should transform the input to lower case': function () {
    let input = 'TestCase'
    let result = pipe(input)
    buster.assert.equals(result, 'testcase')
  }
})
