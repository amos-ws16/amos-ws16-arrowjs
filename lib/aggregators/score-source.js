const utils = require('../utils')

/**
 * Throw an error if score is not a number between 0.0 and 1.0.
 * @param score - the score to be checked
 */
function ensureValidScore (score) {
  if (!utils.isInRange(score, 0.0, 1.0)) {
    throw new Error(`Valid score between 0.0 and 1.0 expected. Found: ${score}`)
  }
}

/**
 * Adapt a constant score value to the Aggregator concept.
 */
class ScoreSource {
  /**
   * Construct a ScoreSource initialized with the score value given.
   * @param score - the score value to initialize the ScoreSource with
   */
  constructor (score) {
    ensureValidScore(score)
    this.score = score
  }

  /**
   * Returns the score value of this ScoreSource.
   */
  eval () { return this.score }
}

/**
 * Return a ScoreSource Aggregator that will always return the constant score
 * value when evaluated.
 * @param score - the score value to construct the ScoreSource with
 */
function create (score) {
  return new ScoreSource(score)
}

module.exports = { create }
