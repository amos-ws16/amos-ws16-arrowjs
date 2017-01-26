const handleStar = require('../handle-star').handleStar

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
   * Construct a WeightedMean Aggregator using an aggregators array. A valid
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
  eval (scores) {
    const agList = ((agList) => {
      if (agList === '*') {
        return handleStar(agList, scores).map((source) => [1, source])
      }
      return agList
    })(this.aggregators)

    let normalized = normalizeWeights(agList)
    let sum = normalized.reduce(
      (sum, element) => sum + element[0] * element[1].eval(scores), 0.0)
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
