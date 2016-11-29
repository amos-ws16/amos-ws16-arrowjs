const InvalidInputError = require('./invalid-input-error')

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
 * Throw an error if the object obj has no property named key.
 *
 * @param obj - the object to be tested
 * @param key - the key to be tested for
 */
function ensurePropertyExists (obj, key) {
  if (!obj.hasOwnProperty(key)) {
    throw new InvalidInputError(`No such property: ${key}`)
  }
}

/**
 * Throw an error if property obj.key is an array but was not expected or if
 * the property obj.key is not an array but was expected.
 *
 * @param obj - the object to be tested
 * @param key - the key to be tested on obj
 * @param expected - true if an array is expected, false if array is unexpected
 */
function ensureArrayIfExpected (obj, key, expected) {
  let property = obj[key]
  if (expected && !Array.isArray(property)) {
    throw new InvalidInputError(`Array expected: ${key}`)
  }

  if (!expected && Array.isArray(property)) {
    throw new InvalidInputError(`Unexpected array: ${key}`)
  }
}

/**
 * Throws an error if the path specification contains more than one pair of
 * square brackets '[]' which indicate multiple arrays.
 *
 * @param path - the path to be checked, a dot separated list of names
 */
function ensureZeroOrOneArray (path) {
  let count = (path.match(/\[]/g) || []).length

  if (count > 1) {
    throw new InvalidInputError(`Multiple arrays in path found: ${path}`)
  }
}

/**
 * Extract part of the object obj defined by path.
 *
 * A valid path is a string where each property name is separated by the
 * containing object by a dot '.', for example 'foo.bar.baz' will refer to the
 * property value of 'baz' contained inside the object 'bar' which is in turn
 * saved as a property in 'foo'. Thus, the return value of the call
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
 *   assert(extractObject(obj, path) === ['x', 'y', 'z'])
 *
 * @param obj - the object whose subobject will be extracted
 * @param path - the path of the subobject to be extracted
 */
function extractObject (obj, path) {
  ensureZeroOrOneArray(path)
  while (path !== '') {
    let [ key, rest ] = splitPath(path)
    let expectArray = key.endsWith('[]')
    if (expectArray) {
      key = key.substring(0, key.length - 2)
    }

    if (Array.isArray(obj)) {
      obj = obj.map(element => {
        ensurePropertyExists(element, key)
        return element[key]
      })
    } else {
      ensurePropertyExists(obj, key)
      ensureArrayIfExpected(obj, key, expectArray)

      obj = obj[key]
    }

    path = rest
  }
  return obj
}

module.exports = extractObject
