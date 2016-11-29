/**
 * Returns the basename without extension of filename. If the filename does not
 * contain any dots it will be returned as is, otherwise the extension is
 * stripped and the basename is returned.
 *
 * @param filename - name of a file basename.ext
 */
function basename (filename) {
  let dotPosition = filename.lastIndexOf('.')
  return dotPosition === -1 ? filename : filename.substring(0, dotPosition)
}

/**
 * Returns a copy of the given object. The object must be serializable to
 * JSON, thus cloning will only work on primitive objects.
 */
function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Check if a given string is a valid string
 *
 * @param sString - the string that needs to be checked
 */
function isString (sString) {
  if (typeof (sString) !== 'string' || sString === '') {
    throw new Error(`${sString} is not a valid string`)
  }
}

module.exports = { basename, cloneObject, isString }
