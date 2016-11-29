/**
 * An InvalidInputError is thrown when the user supplied input caused an
 * operational error. It simply extends the build-in Error class.
 */
class InvalidInputError extends Error {
  /**
   * Construct a new InvalidInputError with the given message.
   */
  constructor (message) {
    super(message)
    this.name = this.constructor.name
  }
}

module.exports = InvalidInputError
