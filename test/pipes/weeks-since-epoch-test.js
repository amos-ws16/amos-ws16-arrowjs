const buster = require('buster')
const pipe = require('../../lib/pipes/weeks-since-epoch')

buster.testCase('Pipe: weeksSinceEpoch', {
  'should return weeks since epoch': function () {
    var testTime = new Date('January 05, 2017 9:00:00 UTC')
    let input = testTime.getTime() / 1000
    let result = pipe(input)
    buster.assert.equals(2453, result)
  }
})
