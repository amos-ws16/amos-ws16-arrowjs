/**
 * Given an aggregator array of the form [ [weight0, ag0], ... ] return a
 * normalized aggregator array [ [w0, ag0], ... ], where w0..wN sum up to 1.0
 * preserving their relative importance (see convex combination).
 *
 * @param aggregators - the aggregators array
 */
function normalizeWeights (aggregators) {
  let wsum = aggregators.reduce((s, e) => s + e[0], 0.0)
  return aggregators.map(e => [e[0] / wsum, e[1]])
}

/**
 * Throw an error if aggregators is not a valid aggregator array. A valid
 * aggregator array is of the form [ [w_0, ag_0], ..., [w_N, ag_N] ] where w_i
 * are numeric weights and ag_i are objects conforming to the Aggregator
 * concept, namely having a eval() method that returns a numeric score between
 * 0.0 and 1.0.
 *
 * @param aggregators - the array to be checked
 */
function ensureValidAggregators (aggregators) {
  if (typeof aggregators === 'undefined') {
    throw new Error('Aggregator specification must be provided')
  }
}

/**
 * Representation of an Aggregator, that can calculate the weighted mean of
 * several Aggregators that are passed as input.
 */
class WeightedMean {
  /**
   * Construct a WeightedMean Aggregator using a aggregators array. A valid
   * aggregator array is of the form [ [w_0, ag_0], ..., [w_N, ag_N] ] where
   * w_i are numeric weights and ag_i are objects conforming to the Aggregator
   * concept, namely having a eval() method that returns a numeric score
   * between 0.0 and 1.0.
   *
   * @param aggregators - the aggregator array that specifies the inputs
   *                      aggregators and their weights
   */
  constructor (aggregators) {
    ensureValidAggregators(aggregators)
    this.aggregators = aggregators
  }

  /**
   * Returns the score value of this WeightedMean Aggregator.
   */
  eval () {
    let normalized = normalizeWeights(this.aggregators)
    let sum = normalized.reduce((s, e) => s + e[0] * e[1].eval(), 0.0)
    return sum
  }
}

/**
 * Return a WeightedMean Aggregator from an aggregator array. The parameters
 * will be forwarded to WeightedMean.constructor().
 */
function create (...args) {
  return new WeightedMean(...args)
}

module.exports = { create }
