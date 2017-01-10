const buster = require('buster')
const pipe = require('../../lib/pipes/hours-since-epoch')

buster.testCase('Pipe: hoursSinceEpoch', {
  'should return hours since epoch': function () {
    var testTime = new Date('January 05, 2017 9:00:00 UTC')
    let input = testTime.getTime() / 1000
    let result = pipe(input)
    buster.assert.equals(412113, result)
  }
})
