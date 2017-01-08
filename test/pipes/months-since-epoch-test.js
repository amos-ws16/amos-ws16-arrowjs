const buster = require('buster')
const pipe = require('../../lib/pipes/months-since-epoch')

buster.testCase('Pipe: monthsSinceEpoch', {
  'should return months since epoch': function () {
    var testTime = new Date('January 05, 2017 9:00:00 UTC')
    let input = testTime.getTime() / 1000
    let result = pipe(input)
    buster.assert.equals(564, result)
  }
})
