const buster = require('buster')
const pipe = require('../../lib/pipes/day-of-month')

buster.testCase('Pipe: dayOfMonth', {
  'should return day of month': function () {
    var testTime = new Date('January 05, 2017 9:00:00 UTC')
    let input = testTime.getTime() / 1000
    let result = pipe(input)
    buster.assert.equals(5, result)
  }
})
