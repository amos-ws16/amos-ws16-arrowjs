/**
 * Return [ head, tail ] of path. A path is a dot '.' separated list of names,
 * for example: path.to.mydata. In this case the head is 'path' and the tail is
 * to.mydata.
 *
 * @param path - a dot separated list of names
 */
function splitPath (path) {
  let p = path.indexOf('.')
  return p < 0 ? [path, ''] : [path.substring(0, p), path.substring(p + 1)]
}

/**
 * Return an Error object with name property set to 'MultipleArrays' that
 * represents an invalid path that has multiple array specifier in it, for
 * example 'x[].y[]'.
 * @param path - the path string that caused the error
 */
function makeMultipleArraysError (path) {
  let err = new Error(`more than one array specifier found '${path}'`)
  err.name = 'MultipleArrays'
  return err
}

/**
 * Return an Error object with name property set to 'NoSuchProperty' that
 * represents an invalid request where a property with the specified path was
 * not found in the object given to extractObject.
 * @param key - the property key name that was not found
 */
function makePropertyError (key) {
  let err = new Error(`no such property '${key}'`)
  err.name = 'NoSuchProperty'
  err.property = key
  return err
}

/**
 * Return an Error object with name property set to 'UnexpectedArray' that
 * represents an invalid request where an array was found in the object given
 * to extractObject but not specified in the path to be extracted.
 * @param key - the property key name that unexpectedly was an array
 */
function makeUnexpectedArrayError (key) {
  let err = new Error(`unexpected array found: '${key}'`)
  err.name = 'UnexpectedArray'
  err.property = key
  return err
}

/**
 * Return an Error object with name property set to 'ArrayExpected' that
 * represents an invalid request where an array was specified in the path but
 * no array was found in the object given to extractObject.
 * @param key - the property key name that was expected to be an object
 */
function makeArrayExpectedError (key) {
  let err = new Error(`array expected but not found: '${key}'`)
  err.name = 'ArrayExpected'
  err.property = key
  return err
}

/**
 * Throws an error if the path specification contains more than one pair of
 * square brackets '[]' which indicate multiple arrays.
 *
 * @param path - the path to be checked, a dot separated list of names
 */
function hasMoreThanOneArray (path) {
  return (path.match(/\[]/g) || []).length > 1
}

/**
 * Return an array of the same dimensions as obj and replace each element e
 * of obj with e[key]. If e[key] does not exist for an element return undefined
 * for that element and set errorlist[index] with an Error object where index
 * is the index of e in obj.
 * @param obj - the array to traverse
 * @param key - find property key of obj's elements
 * @param errorlist - update errorlist if key was not found for some elements
 */
function traverseArray (obj, key, errorlist) {
  // Traverse the path along all array elements.
  obj = obj.map((element, index) => {
    if (typeof element === 'undefined') {
      return undefined
    }
    if (!element.hasOwnProperty(key)) {
      errorlist[index] = makePropertyError(key)
      return undefined
    }
    return element[key]
  })
  return [obj, errorlist]
}

/**
 * Extract part of the object obj defined by path.
 *
 * A valid path is a string where each property name is separated by the
 * containing object by a dot '.', for example 'foo.bar.baz' will refer to the
 * property value of 'baz' contained inside the object 'bar' which is in turn
 * saved as a property in 'foo'. Thus, the result of the call
 *   extractObject({ foo: { bar: { baz: 'Hello' } } }, 'foo.bar.baz')
 * will be the string 'Hello'.
 *
 * Additionally, one property name in path may be suffixed by literal open and
 * closing square brackets '[]'. That property will be interpreted as an array
 * and each it's elements must conform to the rest of the path, that follow the
 * square brackets, for example:
 *   let obj = { a: [{ b: 'x' }, { b: 'y' }, { b: 'z' }] }
 *   let path = 'a[].b'
 *   // This assertion will pass.
 *   assert(extractObject(obj, path) === [['x', 'y', 'z'], []])
 *
 * The return value will be a two element array [result, error]. There are two
 * cases:
 *   1) the path contains an array specifier '[]',
 *   2) the path contains no array specifier or the error occured before
 *      parsing the array part of the object.
 *
 * In the first case, error is a list of errors that occured where the index is
 * the index of the array element that could not be extracted and the value is
 * an Error object describing the error condition. If no error occured the
 * second elment of extractObject's return value will be an empty array.
 * In the second case, error is either an Error object or null if no error
 * occured.
 *
 * @param obj - the object whose subobject will be extracted
 * @param path - the path of the subobject to be extracted
 */
function extractObject (obj, path) {
  if (hasMoreThanOneArray(path)) {
    return [undefined, makeMultipleArraysError(path)]
  }

  let errorlist = []
  while (path !== '') {
    let [ key, rest ] = splitPath(path)
    let expectArray = key.endsWith('[]')
    if (expectArray) {
      key = key.substring(0, key.length - 2)
    }

    if (Array.isArray(obj)) {
      [obj, errorlist] = traverseArray(obj, key, errorlist)
    } else {
      // ensureArrayIfExpected(obj, key, expectArray)
      if (!obj.hasOwnProperty(key)) {
        return [undefined, makePropertyError(key)]
      }

      if (expectArray && !Array.isArray(obj[key])) {
        return [undefined, makeArrayExpectedError(key)]
      }
      // if there are more path segments to be parsed
      if (!expectArray && Array.isArray(obj[key]) && rest.length > 0) {
        return [undefined, makeUnexpectedArrayError(key)]
      }

      obj = obj[key]
    }

    path = rest
  }
  return [obj, errorlist.length === 0 ? null : errorlist]
}

module.exports = extractObject
