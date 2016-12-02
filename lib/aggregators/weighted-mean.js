/**
 * TODO
 */
function normalizeWeights (aggregators) {
  let wsum = aggregators.reduce((s, e) => s + e[0], 0.0)
  return aggregators.map(e => [e[0] / wsum, e[1]])
}

/**
 * TODO
 */
class WeightedMean {
  /**
   * TODO
   * @param score - the score value to initialize the ScoreSource with
   */
  constructor (aggregators) {
    this.aggregators = aggregators
  }

  /**
   * Returns the score value of this WeightedMean.
   */
  eval () {
    let normalized = normalizeWeights(this.aggregators)
    let sum = normalized.reduce((s, e) => s + e[0] * e[1].eval(), 0.0)
    return sum
  }
}

/**
 * Return a ScoreSource Aggregator that will always return the constant score
 * value when evaluated.
 * @param score - the score value to construct the ScoreSource with
 */
function create (...args) {
  return new WeightedMean(...args)
}

module.exports = { create }
