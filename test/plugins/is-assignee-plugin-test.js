const buster = require('buster')
const plugin = require('../../lib/plugins/is-assignee-plugin.js')

buster.testCase('isAssigneePlugin', {
  'should return ': function () {
    buster.assert.same(plugin())
  }
})
