const buster = require('buster')
const plugin = require('../../lib/plugins/chat-text-plugin.js')

const testChat = {
  chat: [
    {
      'type': 'message',
      'channel': 'C2147483705',
      'user': 'U2147483697',
      'text': 'Hello world',
      'ts': 1355517523.000005
    },
    {
      'type': 'message',
      'channel': 'C2147483705',
      'user': 'U2147483698',
      'text': 'Hello underworld',
      'ts': 1355517545.000005
    }
  ]
}

const testChatSimple = {
  chat: [
    {
      'type': 'message',
      'channel': 'C2147483705',
      'user': 'U2147483697',
      'text': 'Hello world',
      'ts': 1355517523.000005
    }
  ]
}

buster.testCase('Chat Scorer', {
  'should throw error if no text in chat': function () {
    buster.assert.exception(() => plugin('', 'testphrase'))
  },
  'should throw error if no text to compare to': function () {
    buster.assert.exception(() => plugin(testChat, ''))
  },
  'should score 1 if chatmessage matches text': function () {
    let compareText = testChatSimple.chat[0].text
    let result = plugin(testChatSimple, compareText)
    buster.assert.equals(result, 1.0)
  },
  'should score high if high similarity between messages and text': function () {
    let compareText = 'Hello world'
    let result = plugin(testChat, compareText)
    buster.assert.near(result, 1.0, 0.3)
  },
  'should score medium if medium similarity between messages and text': function () {
    let compareText = 'Hello'
    let result = plugin(testChat, compareText)
    buster.assert.near(result, 0.5, 0.3)
  },
  'should score low if low similarity between messages and text': function () {
    let compareText = 'water'
    let result = plugin(testChat, compareText)
    buster.assert.near(result, 0.0, 0.2)
  }
})
