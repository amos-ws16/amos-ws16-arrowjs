const buster = require('buster')
const pipe = require('../../lib/pipes/weeks-since-epoch')

buster.testCase('Pipe: weeksSinceEpoch', {
  'should return weeks since epoch': function () {
    let input = 1483603200
    let result = pipe(input)
    buster.assert.equals(2453, result)
  }
})
