const loadModule = require('./utils').loadModule

/**
 * Return an array of pipes that should be applied to the input.
 * For example: path.to.mydata | toUpperCase. In this case the only wanted
 * transformation is 'toUpperCase'.
 *
 * @param input - an input configuration (string)
 */
function getPipes (input) {
  // Check if there are pipes
  if (input.includes('|')) {
    // Extract all pipes
    let pipes = input.replace(/ /g, '').split('|')
    pipes.shift()
    return pipes
  }
  return []
}

/**
 * Return an array of pipes that should be applied to the input.
 * For example: path.to.mydata | toUpperCase. In this case the only wanted
 * transformation is 'toUpperCase'.
 *
 * @param pipe - the name of the pipe that should be applied
 * @param value - the value that should be transformed using the pipe
 */
function applyPipe (pipe, value) {
  let pipeModule = loadModule('pipes', pipe)
  // Apply pipe to each value, if there is an array
  if (Array.isArray(value)) {
    let transformedValue = []
    for (let temp of value) {
      transformedValue.push(pipeModule(temp))
    }
    return transformedValue
  }
  // ... otherwise apply the pipe directly to the value
  return pipeModule(value)
}

/**
 * Removes the pipes from the input configuration string
 *
 * @param input - an input configuration (string)
 */
function removePipes (input) {
  if (input.includes('|')) {
    // Get position of first '|'
    let pos = input.indexOf('|')
    return input.substring(0, pos - 1)
  }
  return input
}

module.exports = { getPipes, applyPipe, removePipes }
