const buster = require('buster')
const pipe = require('../../lib/pipes/hour-of-day')

buster.testCase('Pipe: hourOfDay', {
  'should return hour of day, 9': function () {
    var testTime = new Date('January 05, 2017 9:00:00 UTC')
    let input = testTime.getTime() / 1000
    let result = pipe(input)
    buster.assert.equals(9, result)
  },
  'should return hour of day, 23': function () {
    var testTime = new Date('January 05, 2017 23:00:00 UTC')
    let input = testTime.getTime() / 1000
    let result = pipe(input)
    buster.assert.equals(23, result)
  },
  'should return hour of day, 0': function () {
    var testTime = new Date('January 05, 2017 0:00:00 UTC')
    let input = testTime.getTime() / 1000
    let result = pipe(input)
    buster.assert.equals(0, result)
  }
})
