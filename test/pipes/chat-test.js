const buster = require('buster')
const pipe = require('../../lib/pipes/chat')

buster.testCase('Pipe: chat', {
  'should get all keywords from chat': function () {
    let context = {
      chat: [
        {
          'text': 'Hello world'
        }, {
          'text': 'Hello underworld'
        }
      ]
    }

    let result = pipe(context)
    buster.assert.equals(result, 'world underworld')
  },

  'should get all keywords from chat, even if the messages are empty': function () {
    let context = {
      chat: [
        {
          'text': ''
        }, {
          'text': ''
        }
      ]
    }

    let result = pipe(context)
    buster.assert.equals(result, '')
  },

  'should get all keywords from chat, even if the chat array is empty': function () {
    let context = {
      chat: []
    }

    let result = pipe(context)
    buster.assert.equals(result, '')
  },

  'should throw an error if there is no chat': function () {
    let context = {}

    buster.assert.exception(() => pipe(context))
  }
})
