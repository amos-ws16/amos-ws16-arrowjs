const buster = require('buster')
const plugin = require('../../lib/plugins/is-assignee-plugin.js')

buster.testCase('isAssigneePlugin', {
  'should return 1.0 if  fileuploader is an assignee of a task': function () {
    buster.assert.same(plugin())
  },

  'should return 0.0 if  fileuploader is not an assignee of a task': function () {
    buster.assert.same(plugin())
  }
})
