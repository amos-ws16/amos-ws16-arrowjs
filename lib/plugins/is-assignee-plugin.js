/**
 *
 * @param user - an username which indicates the user who uploaded the file
 * @param assignee - a list of names of the assignees of the tasks
 * @return array with objects with the key ´assignees´ and the score of 1.0 if the user is found in the specific task or 0.0 if not found
 */
function isAssigneePlugin (user, task) {
  let found = false
  let result = []
  for (let x of task) {
    for (let y of x.assignees) {
      if (y === user) {
        found = true
        break
      }
    }
    if (found) {
      result.push({'assignees': 1.0})
    } else {
      result.push({'assignees': 0.0})
    }
  }
  return result
}

module.exports = isAssigneePlugin
