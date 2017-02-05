const utils = require('../lib/utils')
const buster = require('buster')

buster.testCase('utils', {
  'toDebugString': {
    'should return a human readable string of a javascript object': function () {
      let obj = { x: '134', y: 123, 'this-is-z': null }
      let str = utils.toDebugString(obj)
      buster.assert.equals(str, '{ x: \'134\', y: 123, \'this-is-z\': null }')
    }
  },
  'insertByPath': {
    'valid insert - path exists in object': function () {
      let object = { a: { b: { } } }
      utils.insertByPath(object, 'a.b.id', 'something')
      buster.assert.equals(object.a.b.id, 'something')
    },
    'valid insert - path does not exist in object': function () {
      let object = { a: {} }
      utils.insertByPath(object, 'a.b.id', 'something')
      buster.assert.equals(object.a.b.id, 'something')
    },
    'object must be defined': function () {
      buster.assert.exception(() => utils.insertByPath(null, 'a.b.id', 'something'))
      buster.assert.exception(() => utils.insertByPath(undefined, 'a.b.id', 'something'))
    },
    'path must be defined': function () {
      buster.assert.exception(() => utils.insertByPath({ }, null, 'something'))
      buster.assert.exception(() => utils.insertByPath({ }, undefined, 'something'))
    },
    'path must be a string': function () {
      buster.assert.exception(() => utils.insertByPath({ }, 123, 'something'))
    },
    'path cannot include array': function () {
      buster.assert.exception(() => utils.insertByPath({ }, 'string[].a', 'something'))
    },
    'content must be defined': function () {
      buster.assert.exception(() => utils.insertByPath({ }, 'a.b.c', undefined))
      buster.assert.exception(() => utils.insertByPath({ }, 'a.b.c', null))
    }
  },
  'chatFilters': {
    'should return an chat array only with objects in time interval': function () {
      const inputChat = {
        chat: [
          {
            'type': 'message',
            'text': 'test test',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 200
          },
          {
            'type': 'message',
            'text': 'Hello world',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 400
          },
          {
            'type': 'message',
            'text': 'Hello underworld',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 500
          },
          {
            'type': 'message',
            'text': 'Hello hello',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 1200
          }
        ]
      }
      const res = {
        chat: [
          {
            'type': 'message',
            'text': 'Hello world',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 400
          },
          {
            'type': 'message',
            'text': 'Hello underworld',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 500
          }
        ]
      }
      buster.assert.equals(utils.deleteChatMessagesNotInTimeIntervall(inputChat, 300, 1000), res)
    },
    'should return an chat array with objects in time interval and without timestamps': function () {
      const inputChat = {
        chat: [
          {
            'type': 'message',
            'text': 'test test',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 200
          },
          {
            'type': 'message',
            'text': 'Hello world',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 400
          },
          {
            'type': 'message',
            'text': 'Hello underworld',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 500
          },
          {
            'type': 'message',
            'text': 'Hello hello',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 1200
          },
          {
            'type': 'message',
            'text': 'Hello amos',
            'channel': 'C2147483705',
            'user': 'U2147483697'
          }
        ]
      }
      const res = {
        chat: [
          {
            'type': 'message',
            'text': 'Hello world',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 400
          },
          {
            'type': 'message',
            'text': 'Hello underworld',
            'channel': 'C2147483705',
            'user': 'U2147483697',
            'ts': 500
          },
          {
            'type': 'message',
            'text': 'Hello amos',
            'channel': 'C2147483705',
            'user': 'U2147483697'
          }
        ]
      }
      buster.assert.equals(utils.deleteChatMessagesNotInTimeIntervall(inputChat, 300, 1000), res)
    },
    'should return an chat array only with objects from specific user': function () {
      const inputChat = {
        chat: [
          {
            'type': 'message',
            'text': 'test test',
            'channel': 'C2147483705',
            'user': 'abc',
            'ts': 200
          },
          {
            'type': 'message',
            'text': 'Hello world',
            'channel': 'C2147483705',
            'user': 'def',
            'ts': 400
          },
          {
            'type': 'message',
            'text': 'Hello underworld',
            'channel': 'C2147483705',
            'user': 'ghi',
            'ts': 500
          }
        ]
      }
      const res = {
        chat: [
          {
            'type': 'message',
            'text': 'Hello world',
            'channel': 'C2147483705',
            'user': 'def',
            'ts': 400
          }
        ]
      }
      buster.assert.equals(utils.deleteChatMessagesNotFromUser(inputChat, 'def'), res)
    },
    'should return an chat array only with objects from multiple users using an array as input': function () {
      const inputChat = {
        chat: [
          {
            'type': 'message',
            'text': 'test test',
            'channel': 'C2147483705',
            'user': 'abc',
            'ts': 200
          },
          {
            'type': 'message',
            'text': 'Hello world',
            'channel': 'C2147483705',
            'user': 'def',
            'ts': 400
          },
          {
            'type': 'message',
            'text': 'Hello underworld',
            'channel': 'C2147483705',
            'user': 'ghi',
            'ts': 500
          }
        ]
      }
      const res = {
        chat: [
          {
            'type': 'message',
            'text': 'Hello world',
            'channel': 'C2147483705',
            'user': 'def',
            'ts': 400
          }
        ]
      }
      buster.assert.equals(utils.deleteChatMessagesNotFromUser(inputChat, 'def'), res)
    }
  }
})
