/**
 * Represent an invalid score as an aggregator.
 */
class NullSource {
  /**
   * Returns the score value of this ScoreSource.
   */
  eval () { return null }
}

/**
 * Return a NullSource Aggregator that will always return null when evaluated.
 */
function create () {
  return new NullSource()
}

module.exports = { create }
