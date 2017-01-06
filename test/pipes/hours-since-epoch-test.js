const buster = require('buster')
const pipe = require('../../lib/pipes/hours-since-epoch')

buster.testCase('Pipe: hoursSinceEpoch', {
  'should return hours since epoch': function () {
    let input = 1483603200
    let result = pipe(input)
    buster.assert.equals(412112, result)
  }
})
