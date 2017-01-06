const buster = require('buster')
const pipe = require('../../lib/pipes/hour-of-day')

buster.testCase('Pipe: hourOfDay', {
  'should return hour of day, 9': function () {
    let input = 1483603200
    let result = pipe(input)
    buster.assert.equals(9, result)
  },
  'should return hour of day, 23': function () {
    let input = 1483743540
    let result = pipe(input)
    buster.assert.equals(23, result)
  },
  'should return hour of day, 0': function () {
    let input = 1483657200
    let result = pipe(input)
    buster.assert.equals(0, result)
  }
})
