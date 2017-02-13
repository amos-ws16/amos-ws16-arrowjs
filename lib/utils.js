const InvalidInputError = require('./invalid-input-error')

/**
 * Returns a copy of the given object. The object must be serializable to
 * JSON, thus cloning will only work on primitive objects.
 */
function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Returns a human readable string representation of a JSON serializable
 * javascript object.
 * @param obj - a JSON serializable object.
 */
function toDebugString (obj) {
  return JSON.stringify(obj)
    .replace(/"/g, '\'')
    .replace(/'([^ '-]*)':/g, '$1:')
    .replace(/{/g, '{ ')
    .replace(/}/g, ' }')
    .replace(/[:,]/g, '$& ')
}

/**
 * Check if a given string is a valid string
 *
 * @param sString - the string that needs to be checked
 */
function isValidString (sString) {
  if (typeof (sString) !== 'string') {
    throw new Error(`String expected, found ${sString}`)
  }
  if (sString === '') {
    throw new Error(`Non-empty string expected.`)
  }
}

/**
 * Check if a given input is an array
 *
 * @param iArray - the string that needs to be checked
 */
function isArray (iArray) {
  if (iArray.constructor !== Array) {
    throw new Error(`Array expected, found ${iArray}`)
  }
}

/**
 * Checks if the input is a real number and not i.e. a
 * number formated as a string or null. Throws an Error
 * if not a number.
 *
 * @param nNumber variable that is checked
 */
function isNumber (nNumber) {
  if (nNumber === undefined || nNumber === null || typeof (nNumber) === 'string' || isNaN(nNumber)) {
    throw new Error(`Is not a number: ` + nNumber)
  }
}

/**
 * Check if given argument is a number n with min <= n <= max.
 *
 * @param n - the thing to be checked
 */
function isInRange (n, min, max) {
  return typeof n === 'number' && n >= min && n <= max
}

/**
  * Check if a given variable is a valid Integer
  *
  * @param int - variable/Integer that needs to be checked
**/
function isInteger (int) {
  if (typeof int !== 'number' || int % 1 !== 0) {
    throw new Error(`${int} is not a valid Integer.`)
  }
}

/**
  * Check if a given variable is a valid Timestamp
  *
  * @param timest - variable/Integer that needs to be checked
**/
function isTimestamp (timest) {
  if (typeof timest !== 'number') {
    throw new Error(`${timest} is not a valid Integer.`)
  }
}

/**
 * Throw an error if module directory is not valid.
 */
function ensureValidModuleDirectory (moduleDir) {
  if (moduleDir.indexOf('../') !== -1) {
    throw new Error(`Module directory must not contain any '..' references: '${moduleDir}'`)
  }
}

/**
 * Throw an error if moduleId is not valid.
 */
function ensureValidModuleId (moduleId) {
  if (moduleId === '') {
    throw new Error(`Module name missing`)
  }
  if (moduleId.indexOf('/') !== -1) {
    throw new Error(`Module name must not contain any '/': '${moduleId}'`)
  }
}

/**
 * Load and return the module stored in  /lib/moduleDir/moduleId.js.
 */
function loadModule (moduleDir, moduleId) {
  ensureValidModuleDirectory(moduleDir)
  ensureValidModuleId(moduleId)
  try {
    return require(`./${moduleDir}/${moduleId}.js`)
  } catch (err) {
    throw new Error(`Cannot find module '${moduleDir}/${moduleId}'`)
  }
}

/**
 * Load and return the plugin stored in  /lib/plugins/pluginId.js.
 */
function loadPlugin (pluginId) {
  return loadModule('plugins', pluginId)
}

/**
 * Inserts content into an object by using its path in string format.
 * Arrays are not allowed in the path. The method modifies the object
 * parameter and will not return any value. All subjects of the path that
 * are not defined in object will be created.
 *
 * @param object object in that the content will be included
 * @param path path to the content {i.e. 'a.b.c'}
 * @param content inserted into object
 */
function insertByPath (object, path, content) {
  if (object === undefined) {
    throw new Error('Cannot insert into null: ' + object)
  }
  isValidString(path)
  if (path.includes('[]')) {
    throw new Error('No arrays allowed in path')
  }
  if (content === undefined || content === null) {
    throw new Error('content cannot be undefined')
  }

  var temp = object
  var pathArray = path.split('.')
  pathArray.forEach((elem, i) => {
    if (temp[elem] === undefined) {
      temp[elem] = {}
    }
    if (i === pathArray.length - 1) {
      temp[elem] = content
    } else {
      temp = temp[elem]
    }
  })
}

/**
 * Throw an error if aggregators is not a valid array of aggregators.
 * @param aggregators - the array to be checked
 */
function ensureValidAggregators (aggregators) {
  if (typeof aggregators === 'undefined') {
    throw new InvalidInputError('Aggregator specification must be provided')
  }

  // The star aggregator is an exception
  if (aggregators === '*') { return }

  if (!Array.isArray(aggregators)) {
    throw new InvalidInputError(`Aggregator specification must be an array of aggregators. Found: '${JSON.stringify(aggregators)}'`)
  }
  aggregators.forEach(aggregator => {
    if (typeof aggregator.eval === 'undefined') {
      throw new InvalidInputError(`Aggregator must provide eval() method: '${aggregator}'`)
    }
  })
}

/**
 * Throw an error if array is empty.
 * @param array - the array to be checked
 */
function arrayNotEmpty (array) {
  let count = 0
  for (let a of array) {
    if (a === undefined) {
      count++
    }
  }
  if (count === array.length) {
    throw new Error('Array empty.')
  }
}

/**
 * returns all chat messages in specified time interval
 * @param chatObject - an Object with a property chat which is an array of messages
 * @param startTime - inclusive begin of interval as a number
 * @param endTime - inclusive end of interval as a number
 */
function filterChatByTime (chatObject, startTime, endTime) {
  isArray(chatObject)
  arrayNotEmpty(chatObject)

  return chatObject.filter(entry => (entry.ts === undefined || isInRange(entry.ts, startTime, endTime)))
}

/**
 * returns all chat messages of specified users
 * @param chatObject - an Object with a property chat which is an array of messages
 * @param users - a user as text or an array of users as text array
 *
 */
function filterByUser
 (chatObject, users) {
  isArray(chatObject)
  arrayNotEmpty(chatObject)
  if (!Array.isArray(users)) {
    users = [users]
  }

  return chatObject.filter(entry => users.includes(entry.user))
}

module.exports = { cloneObject, toDebugString, isValidString, isNumber, isArray, isInRange, isInteger, isTimestamp, loadPlugin, loadModule, insertByPath, ensureValidAggregators, arrayNotEmpty, filterChatByTime, filterByUser }
