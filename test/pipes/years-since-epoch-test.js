const buster = require('buster')
const pipe = require('../../lib/pipes/years-since-epoch')

buster.testCase('Pipe: yearsSinceEpoch', {
  'should return years since epoch': function () {
    let input = 1483603200
    let result = pipe(input)
    buster.assert.equals(47, result)
  }
})
