// const utils = require('../utils.js')

/**
 *
 * @param user - an username which indicates the user who uploaded the file
 * @param assignee - a list of assignees of the tasks
 * @return score - 1.0 or 0.0 which indicates whether the assin
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

/*
Bei der Konfiguration:
let plugin =
{ 'assignees':
  { use: 'is-in-set',
    inputs: ['file.user', 'tasks[].assignees']
  }
}
, und dem Input:
let file =
{
  user: 'a'
},
let tasks =
[
  {
    assignees: ['b', 'c']
  },
  {
    assignees: ['a', 'c']
  }
]
}
, soll das Ergebnis wie folgt aussehen:
let result =
[
  {
    'assignees': 0.0
  },
  {
    'assignees': 1.0
  }
]
*/
