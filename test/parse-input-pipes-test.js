const buster = require('buster')
const PipeParser = require('../lib/parse-input-pipes')

buster.testCase('PipeParser', {
  'should take an input string with no pipe and return an empty array': function () {
    let input = 'file.title'
    let pipes = PipeParser.getPipes(input)

    buster.assert.equals(pipes, [])
  },

  'should take an input string with one pipe and return an array of pipes containing one pipe': function () {
    let input = 'file.title | pipe1'
    let pipes = PipeParser.getPipes(input)

    buster.assert.equals(pipes, ['pipe1'])
  },

  'should take an input string with two pipes and return an array of pipes containing two pipes': function () {
    let input = 'file.title | pipe1 | pipe2'
    let pipes = PipeParser.getPipes(input)

    buster.assert.equals(pipes, ['pipe1', 'pipe2'])
  },

  'should take an input string with one faulty pipe and return an empty array': function () {
    let input = 'file.title |'

    buster.assert.exception(() => PipeParser.getPipes(input))
  },

  'should take an input string with no pipe and return the same input': function () {
    let input = 'file.title'
    let pipes = PipeParser.removePipes(input)

    buster.assert.equals(pipes, input)
  },

  'should take an input string with one pipe and return the input wihtout the pipe': function () {
    let input = 'file.title | pip1'
    let pipes = PipeParser.removePipes(input)

    buster.assert.equals(pipes, 'file.title')
  },

  'should throw an exception if the pipe is unknown': function () {
    let pipe = 'unknown pipe'
    let value = 'some value'

    buster.assert.exception(() => PipeParser.applyPipe(pipe, value))
  },

  'should return an array of parsed values': function () {
    let pipe = 'to-upper-case'
    let value = ['some value', 'another value']

    let result = PipeParser.applyPipe(pipe, value)

    buster.assert.equals(result[0], 'SOME VALUE')
    buster.assert.equals(result[1], 'ANOTHER VALUE')
  },

  'should return the parsed values': function () {
    let pipe = 'to-upper-case'
    let value = 'some value'

    let result = PipeParser.applyPipe(pipe, value)

    buster.assert.equals(result, 'SOME VALUE')
  }
})
