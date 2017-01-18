const buster = require('buster')
const plugin = require('../../lib/plugins/is-assignee-plugin.js')

buster.testCase('isAssigneePlugin', {
  'Testcase 1: 2 tasks with 2 assignees each': function () {
    let user = 'a'
    let task = [{'assignees': ['b', 'c']}, {'assignees': ['a', 'c']}]
    let testResult = [{'assignees': 0.0}, {'assignees': 1.0}]
    let result = plugin(user, task)
    buster.assert.equals(result, testResult)
  },

  'Testcase 2: 2 tasks with 1 assignee each': function () {
    let user = 'a'
    let task = [{'assignees': ['b']}, {'assignees': ['a']}]
    let testResult = [{'assignees': 0.0}, {'assignees': 1.0}]
    let result = plugin(user, task)
    buster.assert.equals(result, testResult)
  },

  'Testcase 3: no tasks': function () {
    let user = 'a'
    let task = []
    let testResult = []
    let result = plugin(user, task)
    buster.assert.equals(result, testResult)
  },
  'Testcase 4: ': function () {
    let user = 'a'
    let task = [{'assignees': ['b', 'c']}, {'assignees': ['a']}]
    let testResult = [{'assignees': 0.0}, {'assignees': 1.0}]
    let result = plugin(user, task)
    buster.assert.equals(result, testResult)
  },
  'Testcase 5: ': function () {
    let user = 'a'
    let task = [{'assignees': ['b']}, {'assignees': ['a', 'c']}]
    let testResult = [{'assignees': 0.0}, {'assignees': 1.0}]
    let result = plugin(user, task)
    buster.assert.equals(result, testResult)
  }
})
