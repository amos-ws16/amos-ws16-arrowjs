const buster = require('buster')
const extractObject = require('../lib/extract-object')

buster.testCase('extractObject', {
  'should return the whole object when path is empty': () => {
    let obj = 'content'
    let res = extractObject(obj, '')
    buster.assert.equals(res, obj)
  },

  'should return the subobject when path is single name': () => {
    let obj = { x: 'content' }
    let res = extractObject(obj, 'x')
    buster.assert.equals(res, 'content')
  },

  'should return the subobject specified by path with names separated by dot': () => {
    let obj = { x: 'content', y: { z: 'foo' } }
    let res = extractObject(obj, 'y.z')
    buster.assert.equals(res, 'foo')
  },

  'should return an array with each subobject when path has []': () => {
    let obj = { x: [ 'y', 'z' ] }
    let res = extractObject(obj, 'x[]')
    buster.assert.equals(res, [ 'y', 'z' ])
  },

  'should return an array with each element\'s subobject when path has [].sub': () => {
    let obj = { x: [
      { y: 'foo' },
      { y: 'bar' }
    ] }
    let res = extractObject(obj, 'x[].y')
    buster.assert.equals(res, [ 'foo', 'bar' ])
  },

  'should work with a random realistic object': () => {
    let obj = {
      config: {},
      file: {
        name: 'foo.txt',
        description: 'For all us foo lovers out there'
      },
      tasks: [
        { name: 'foo', meta: { chat: 'hello' } },
        { name: 'bar', meta: { chat: 'world' } }
      ]
    }
    let chats = extractObject(obj, 'tasks[].meta.chat')
    let fileName = extractObject(obj, 'file.name')
    buster.assert.equals(chats, [ 'hello', 'world' ])
    buster.assert.equals(fileName, 'foo.txt')
  },

  'should throw an exception when property does not exist': () => {
    buster.assert.exception(() => extractObject({}, 'foo'))
  },

  'should throw an exception when array is excepted but not found': () => {
    buster.assert.exception(() => extractObject({ foo: 'Hello' }, 'foo[]'))
  },

  'should throw an exception when no array is excepted but was found': () => {
    buster.assert.exception(() => extractObject({ foo: ['Hello', 'World'] }, 'foo'))
  },

  'should throw an exception when array property is expected but not found': () => {
    buster.assert.exception(() => extractObject({ foo: ['Hello'] }, 'foo[].bar'))
  },

  'should throw an exception when more than one array is defined in path': () => {
    let obj = {
      foo: [
        { bar: [{ baz: 1 }, { baz: 2 }] },
        { bar: [{ baz: 3 }, { baz: 4 }] }
      ]
    }
    buster.assert.exception(() => extractObject(obj, 'foo[].bar[].baz'))
  }
})
