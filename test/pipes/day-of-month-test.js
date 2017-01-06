const buster = require('buster')
const pipe = require('../../lib/pipes/day-of-month')

buster.testCase('Pipe: dayOfMonth', {
  'should return day of month': function () {
    let input = 1483603200
    let result = pipe(input)
    buster.assert.equals(5, result)
  }
})
