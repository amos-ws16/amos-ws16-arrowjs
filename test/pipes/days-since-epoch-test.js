const buster = require('buster')
const pipe = require('../../lib/pipes/days-since-epoch')

buster.testCase('Pipe: daysSinceEpoch', {
  'should return days since epoch': function () {
    let input = 1483603200
    let result = pipe(input)
    buster.assert.equals(17171, result)
  },
  'should return days since epoch, 0': function () {
    let input = 0
    let result = pipe(input)
    buster.assert.equals(0, result)
  }
})
