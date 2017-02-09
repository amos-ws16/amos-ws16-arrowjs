const buster = require('buster')
const plugin = require('../../lib/plugins/chat-text-plugin.js')

const testChat = {
  chat: [
    {
      'type': 'message',
      'text': 'Hello world'
    },
    {
      'type': 'message',
      'text': 'Hello underworld'
    }
  ]
}

const testChatSimple = {
  chat: [
    {
      'type': 'message',
      'text': 'Hello world'
    }
  ]
}

const brokenChat = {
  chat: [
    {
      'type': 'message',
      'notext': 1234
    },
    {
      'type': 'message',
      'notext': 'Hello underworld'
    }
  ]
}

const halfChat = {
  chat: [
    {
      'type': 'message',
      'notext': 1234
    },
    {
      'type': 'message',
      'text': 'Hello'
    }
  ]
}

const wrongeTypeChat = {
  chat: [
    {
      'type': 'message',
      'notext': 1234
    },
    {
      'type': 'message',
      'text': 'Hello'
    }
  ]
}

const extractObjectBroken = {
  chat: 'chat value'
}

buster.testCase('Chat Scorer', {
  'should throw error if chat': function () {
    buster.assert.exception(() => plugin('', 'testphrase'))
  },
  'should throw error if no text to compare to': function () {
    buster.assert.exception(() => plugin(testChat.chat, ''))
  },
  'should throw error if no text in chat messages': function () {
    buster.assert.exception(() => plugin(brokenChat.chat, 'testphrase'))
  },
  'should throw error if chat messages cannot be extracted': function () {
    buster.assert.exception(() => plugin(extractObjectBroken.chat, 'Hello'))
  },
  'should ignore chat messages without text if others do have text': function () {
    let result = plugin(halfChat.chat, 'Hello')
    buster.assert.equals(result, 1.0)
  },
  'should ignore chat messages without text': function () {
    let result = plugin(wrongeTypeChat.chat, 'Hello')
    buster.assert.equals(result, 1.0)
  },
  'should throw error if second arg is not a valid string': function () {
    buster.assert.exception(() => plugin(testChat.chat, 1))
  },
  'should score 1 if chatmessage matches text': function () {
    let compareText = testChatSimple.chat[0].text
    let result = plugin(testChatSimple.chat, compareText)
    buster.assert.equals(result, 1.0)
  },
  'should score high if high similarity between messages and text': function () {
    let compareText = 'Hello world'
    let result = plugin(testChat.chat, compareText)
    buster.assert.near(result, 1.0, 0.3)
  },
  'should score medium if medium similarity between messages and text': function () {
    let compareText = 'Hello'
    let result = plugin(testChat.chat, compareText)
    buster.assert.near(result, 0.5, 0.3)
  },
  'should score low if low similarity between messages and text': function () {
    let compareText = 'water'
    let result = plugin(testChat.chat, compareText)
    buster.assert.near(result, 0.0, 0.2)
  }
})
