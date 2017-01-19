const buster = require('buster')
const pipe = require('../../lib/pipes/basename')

buster.testCase('Pipe: basename', {
  'should remove the basename from file': function () {
    let input = 'some-base.ext'
    let result = pipe(input)
    buster.assert.equals(result, 'some-base')
  },
  'should do nothing if the input has no extension with dot': function () {
    let input = 'some-base'
    let result = pipe(input)
    buster.assert.equals(result, 'some-base')
  },
  'should not throw an exception if there is no input (null) and return null': function () {
    let input = null
    let result = pipe(input)
    buster.assert.equals(result, null)
  },
  'if there are more extension then only the last should be removed': function () {
    let input = 'some-base.ext.another.ext'
    let result = pipe(input)
    buster.assert.equals(result, 'some-base.ext.another')
  },
  'an empty input should remain empty': function () {
    let input = ''
    let result = pipe(input)
    buster.assert.equals(result, '')
  }
})
