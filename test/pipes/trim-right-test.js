const buster = require('buster')
const pipe = require('../../lib/pipes/trim-right.js')

buster.testCase('Pipe: trimRight', {
  'should trim the input (right)': function () {
    let input = '  TestCase  '
    let result = pipe(input)
    buster.assert.equals(result, '  TestCase')
  }
})
