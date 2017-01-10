const buster = require('buster')
const extractObject = require('../lib/extract-object')

buster.testCase('extractObject', {
  'should return the whole object when path is empty': () => {
    let obj = 'content'
    let [res, err] = extractObject(obj, '')
    buster.assert.equals(res, obj)
    buster.refute(err)
  },

  'should return the subobject when path is single name': () => {
    let obj = { x: 'content' }
    let [res, err] = extractObject(obj, 'x')
    buster.assert.equals(res, 'content')
    buster.refute(err)
  },

  'should return the subobject specified by path with names separated by dot': () => {
    let obj = { x: 'content', y: { z: 'foo' } }
    let [res, err] = extractObject(obj, 'y.z')
    buster.assert.equals(res, 'foo')
    buster.refute(err)
  },

  'should return an array with each subobject when path has []': () => {
    let obj = { x: [ 'y', 'z' ] }
    let [res, err] = extractObject(obj, 'x[]')
    buster.assert.equals(res, [ 'y', 'z' ])
    buster.refute(err)
  },

  'should return an array with each element\'s subobject when path has [].sub': () => {
    let obj = { x: [
      { y: 'foo' },
      { y: 'bar' }
    ] }
    let [res, err] = extractObject(obj, 'x[].y')
    buster.assert.equals(res, [ 'foo', 'bar' ])
    buster.refute(err)
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
    let [chats, e1] = extractObject(obj, 'tasks[].meta.chat')
    let [fileName, e2] = extractObject(obj, 'file.name')
    buster.assert.equals(chats, [ 'hello', 'world' ])
    buster.assert.equals(fileName, 'foo.txt')
    buster.refute(e1)
    buster.refute(e2)
  },

  'error cases': {
    // extractObject(blob, path) -> [result, error] if path is non-array
    // extractObject(blob, path) -> [result, errorlist] if path is array
    'should return single error message if path is non-array path and key does not exist': function () {
      let blob = {}
      let path = 'x'
      let [result, error] = extractObject(blob, path)
      buster.assert.same(result, undefined)
      buster.assert.equals(error.name, 'NoSuchProperty')
      buster.assert.equals(error.property, 'x')
    },

    'should return error list if path is array path and key does not exist in one of the elements': function () {
      let blob = { x: [{ y: '1' }, { noty: '2' }, { y: '3' }] }
      let path = 'x[].y'
      let [result, error] = extractObject(blob, path)
      buster.assert.equals(result, ['1', undefined, '3'])
      buster.assert.equals(error[1].name, 'NoSuchProperty')
      buster.assert.equals(error[1].property, 'y')
    },

    'should return error list if path is array path and key does not exist in one of the elements (2)': function () {
      let blob = { x: [{ y: { z: '1' } }, { noty: '2' }, { y: { z: '3' } }] }
      let path = 'x[].y.z'
      let [result, error] = extractObject(blob, path)
      buster.assert.equals(result, ['1', undefined, '3'])
      buster.assert.equals(error[1].name, 'NoSuchProperty')
      buster.assert.equals(error[1].property, 'y')
    },

    'should return error if array is expected but not found': function () {
      let blob = { x: 'x-value' }
      let path = 'x[]'
      let [result, error] = extractObject(blob, path)
      buster.assert.same(result, undefined)
      buster.assert.equals(error.name, 'ArrayExpected')
      buster.assert.equals(error.property, 'x')
    },

    'should return error if array is found but not expected': function () {
      let blob = { x: [{ y: 'x1' }, { y: 'x2' }] }
      let path = 'x.y'
      let [result, error] = extractObject(blob, path)
      buster.assert.same(result, undefined)
      buster.assert.equals(error.name, 'UnexpectedArray')
      buster.assert.equals(error.property, 'x')
    },

    'should return error if more than one array is specified in path': function () {
      let blob = {}
      let path = 'x[].y[].z'
      let [result, error] = extractObject(blob, path)
      buster.assert.same(result, undefined)
      buster.assert.equals(error.name, 'MultipleArrays')
    }
  },

  'should return array if it is the last thing in the path without [] specifier': function () {
    let blob = { x: [ 'x1', 'x2' ] }
    let path = 'x'
    let [result, error] = extractObject(blob, path)
    buster.assert.equals(result, [ 'x1', 'x2' ])
    buster.refute(error)
  }
})
