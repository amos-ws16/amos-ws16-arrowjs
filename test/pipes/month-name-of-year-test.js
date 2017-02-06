const buster = require('buster')
const pipe = require('../../lib/pipes/month-name-of-year')

buster.testCase('Pipe: monthNumberOfYear', {
  'should return month name of year': function () {
    var testTime = new Date('March 19, 2017 9:00:00 UTC')
    let input = testTime.getTime() / 1000
    let result = pipe(input)
    buster.assert.equals('March', result)
  }
})
