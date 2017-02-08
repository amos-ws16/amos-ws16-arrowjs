const utils = require('../lib/utils')
const buster = require('buster')

const inputChatUnfiltered = {
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
      'user': 'abc',
      'ts': 500
    },
    {
      'type': 'message',
      'text': 'Hello hello',
      'channel': 'C2147483705',
      'user': 'ghi',
      'ts': 1200
    },
    {
      'type': 'message',
      'text': 'Hello amos',
      'channel': 'C2147483705',
      'user': 'jkl'
    }
  ]
}

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
  'isNumber': {
    'throw an exception if not a valid number': function () {
      buster.assert.exception(() => utils.isNumber('asd'))
      buster.assert.exception(() => utils.isNumber())
      buster.assert.exception(() => utils.isNumber({}))
      buster.assert.exception(() => utils.isNumber(null))
      buster.assert.exception(() => utils.isNumber())
    },
    'dont throw exception is valid number': function () {
      buster.refute.exception(() => utils.isNumber(321))
      buster.refute.exception(() => utils.isNumber(-123))
      buster.refute.exception(() => utils.isNumber(1.0001))
      buster.refute.exception(() => utils.isNumber(-1.23))
    }
  },
  filterChatByTimeTests: {
    'should return an chat array with objects in time interval and without timestamps': function () {
      const res = {
        chat: [
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
            'user': 'abc',
            'ts': 500
          },
          {
            'type': 'message',
            'text': 'Hello amos',
            'channel': 'C2147483705',
            'user': 'jkl'
          }
        ]
      }
      buster.assert.equals(utils.filterChatByTime(inputChatUnfiltered.chat, 300, 1000), res.chat)
    }
  },
  getChatMessagesFromUsersTests: {
    'should return an chat array only with objects from specific user': function () {
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
      buster.assert.equals(utils.getChatMessagesFromUsers(inputChatUnfiltered.chat, 'def'), res.chat)
    },
    'should return an chat array only with objects from multiple users using an array as input': function () {
      const res = {
        chat: [
          {
            'type': 'message',
            'text': 'Hello world',
            'channel': 'C2147483705',
            'user': 'def',
            'ts': 400
          },
          {
            'type': 'message',
            'text': 'Hello hello',
            'channel': 'C2147483705',
            'user': 'ghi',
            'ts': 1200
          }
        ]
      }
      buster.assert.equals(utils.getChatMessagesFromUsers(inputChatUnfiltered.chat, ['def', 'ghi']), res.chat)
    }
  }
})
