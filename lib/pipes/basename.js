
/**
  * Removes the extension from a string which is started with
  * a dot (i.e. something.ext => something)
  *
  * @param string - input basename
**/
function basename (input) {
  if (input == null) {
    return null
  }
  let dotPosition = input.lastIndexOf('.')
  if (dotPosition === 0) {
    return input
  } else {
    return dotPosition === -1 ? input : input.substring(0, dotPosition)
  }
}

module.exports = basename
