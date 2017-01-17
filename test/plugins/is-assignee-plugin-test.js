const buster = require('buster')
const plugin = require('../../lib/plugins/is-assignee-plugin.js')

buster.testCase('isAssigneePlugin', {
  'should return 1.0 if  fileuploader is an assignee of a task': function () {
    let user = 'abc'
    let assignee = 'abc'
    let result = plugin(user, assignee)
    buster.assert.equals(result, 1.0)
  },

  'should return 0.0 if  fileuploader is not an assignee of a task': function () {
    let user = 'abc'
    let assignee = 'cde'
    let result = plugin(user, assignee)
    buster.assert.equals(result, 0.0)
  }
})
