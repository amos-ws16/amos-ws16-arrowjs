const buster = require('buster')
const pipe = require('../../lib/pipes/chat')

buster.testCase('Pipe: chat', {
  'should get all keywords from chat': function () {
    let chat = [
      {
        'text': 'Hello world'
      }, {
        'text': 'Hello underworld'
      }
    ]

    let result = pipe(chat)
    buster.assert.equals(result, 'world underworld')
  },

  'should get all keywords from chat, even if the messages are empty': function () {
    let chat = [
      {
        'text': ''
      }, {
        'text': ''
      }
    ]

    let result = pipe(chat)
    buster.assert.equals(result, '')
  },

  'should get all keywords from chat, even if the chat array is empty': function () {
    let chat = []

    let result = pipe(chat)
    buster.assert.equals(result, '')
  }
})
