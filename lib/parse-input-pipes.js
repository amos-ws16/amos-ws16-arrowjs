/**
 * Return an array of pipes that should be applied to the input.
 * For example: path.to.mydata | toUpperCase. In this case the only wanted
 * transformation is 'toUpperCase'.
 *
 * @param input - an input configuration (string)
 */
function parseInputPipes (input) {
  // Check if there are pipes
  if (input.includes('|')) {
    // Extract all pipes
    let pipes = input.replace(/ /g, '').split('|')
    pipes.shift()
    return pipes
  }
  return []
}

module.exports = parseInputPipes
