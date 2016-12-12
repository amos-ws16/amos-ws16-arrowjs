const buster = require('buster')
const pipe = require('../../lib/pipes/trim-left.js')

buster.testCase('Pipe: trimLeft', {
  'should trim the input (left)': function () {
    let input = '  TestCase  '
    let result = pipe(input)
    buster.assert.equals(result, 'TestCase  ')
  }
})
