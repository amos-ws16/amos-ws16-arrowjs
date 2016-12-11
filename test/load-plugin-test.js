const buster = require('buster')
const loadPlugin = require('../lib/load-plugin')

buster.testCase('loadPlugin', {
  'should load and return a plugin module': function () {
    let plugin = loadPlugin('similar-text-plugin')
    buster.assert(plugin)
    let result = plugin('Hello', 'Gello')
    buster.assert.equals(result, 0.75)
  },

  'should throw an exception if plugin does not exist': function () {
    buster.assert.exception(() => loadPlugin('non-existent-plugin'))
  },

  'should throw an exception if there are slashes in the pluginId': function () {
    buster.assert.exception(() => loadPlugin('bad/plugin'))
  },

  'should throw an exception if pluginId is empty': function () {
    buster.assert.exception(() => loadPlugin(''))
  }
})
