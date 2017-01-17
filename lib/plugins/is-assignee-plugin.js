// const utils = require('../utils.js')

/**
 *
 * @param user - an username which indicates the user who uploaded the file
 * @param assignee - a list of assignees of the task
 * @return score - 1.0 or 0.0 which indicates whether the user is in the assignee list
 */
function isAssigneePlugin (user, assignees) {
  let found = false
  for (let x of assignees) {
    if (x === user) {
      found = true
      break
    } else {
      found = false
    }
  }

  return found ? 1.0 : 0.0
}

module.exports = isAssigneePlugin
