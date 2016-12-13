const buster = require('buster')
const pipe = require('../../lib/pipes/trim')

buster.testCase('Pipe: trim', {
  'should trim the input (left and right)': function () {
    let input = '  TestCase  '
    let result = pipe(input)
    buster.assert.equals(result, 'TestCase')
  }
})
