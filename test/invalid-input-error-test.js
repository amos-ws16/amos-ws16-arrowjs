const buster = require('buster')
const InvalidInputError = require('../lib/invalid-input-error')

buster.testCase('InvalidInputError', {
  'should have name and description': function () {
    let error = new InvalidInputError('Something went wrong')
    buster.assert.equals(error.name, 'InvalidInputError')
    buster.assert.equals(error.message, 'Something went wrong')
  }
})
