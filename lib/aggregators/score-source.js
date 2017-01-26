const utils = require('../utils')

/**
 * Adapt a constant score value to the Aggregator concept.
 */
class ScoreSource {
  /**
   * Construct a ScoreSource initialized with the score value given.
   * @param score - the score value to initialize the ScoreSource with
   */
  constructor (pluginId) {
    this.pluginId = pluginId
  }

  /**
   * Returns the score value of this ScoreSource.
   */
  eval (scores) {
    const score = scores[this.pluginId]
    if (!utils.isInRange(score, 0.0, 1.0)) { return null }

    return score
  }
}

/**
 * Return a ScoreSource Aggregator that will always return the constant score
 * value when evaluated.
 * @param score - the score value to construct the ScoreSource with
 */
function create (pluginId) {
  return new ScoreSource(pluginId)
}

module.exports = { create }
