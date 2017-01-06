const buster = require('buster')
const pipe = require('../../lib/pipes/day-of-week')

buster.testCase('Pipe: dayOfWeek', {
  'should return day of week': function () {
    let input = 1483603200
    let result = pipe(input)
    buster.assert.equals('Thursday', result)
  }
})
