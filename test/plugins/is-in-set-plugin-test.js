const buster = require('buster')
const plugin = require('../../lib/plugins/is-in-set-plugin.js')

buster.testCase('isInSetPlugin', {
  'Testcase 1: user is not included in assignees': function () {
    let user = 'a'
    let assignees = ['b', 'c']
    buster.assert.equals(plugin(user, assignees), 0.0)
  },

  'Testcase 2: user is included in assignees': function () {
    let user = 'a'
    let assignees = ['a', 'c']
    buster.assert.equals(plugin(user, assignees), 1.0)
  },

  'Testcase 3: no users in assignee': function () {
    let user = 'a'
    let assignees = []
    buster.assert.equals(plugin(user, assignees), 0.0)
  },

  'Testcase 4: no user and no assignees': function () {
    let user = ''
    let assignees = []
    buster.assert.equals(plugin(user, assignees), 0.0)
  },
  'Testcase 5: should throw an error if first input is undefined': function () {
    let user
    buster.assert.exception(() => plugin(user))
  },
  'Testcase 6 - should throw an error if second input is undefined': function () {
    let user = 111
    buster.assert.exception(() => plugin(user))
  },
  'Testcase 7 - should throw an error if second input is undefined': function () {
    let user = 111
    let assignees
    buster.assert.exception(() => plugin(user, assignees))
  },
  'Testcase 8 - should throw an error if second input is not an array': function () {
    let user = 'a'
    let assignees = 111
    buster.assert.exception(() => plugin(user, assignees))
  },
  'Testcase 9 - should throw an error if first input is not type of array input type': function () {
    let user = 111
    let assignees = ['a', 'c']
    buster.assert.exception(() => plugin(user, assignees))
  }
})
