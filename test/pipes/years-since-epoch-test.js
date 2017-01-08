const buster = require('buster')
const pipe = require('../../lib/pipes/years-since-epoch')

buster.testCase('Pipe: yearsSinceEpoch', {
  'should return years since epoch': function () {
    var testTime = new Date('January 05, 2017 9:00:00 UTC')
    let input = testTime.getTime() / 1000
    let result = pipe(input)
    buster.assert.equals(47, result)
  }
})
