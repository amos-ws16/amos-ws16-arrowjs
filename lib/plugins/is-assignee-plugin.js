const utils = require('../utils.js')

/**
 * Takes as an input an object of the form:
 *
 * @param t1 - an object that is a timestamp
 * @param t2 - an object that is a timestamp
 * @param params - optional, params['time-limit'] defines the maximum
 *                 correlation time
 * @return score - between 1.0 and 0.0 and decreases
 * linear with increasing difference between timestamps. Time differences
 * greater than timeLimit will result in a score of 0.0.
 */
function isAssigneePlugin () {

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
