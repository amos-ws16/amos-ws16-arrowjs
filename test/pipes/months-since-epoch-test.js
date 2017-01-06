const buster = require('buster')
const pipe = require('../../lib/pipes/months-since-epoch')

buster.testCase('Pipe: monthsSinceEpoch', {
  'should return months since epoch': function () {
    let input = 1483603200
    let result = pipe(input)
    buster.assert.equals(564, result)
  }
})
