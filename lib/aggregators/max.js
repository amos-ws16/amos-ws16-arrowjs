/**
 * Representation of an Aggregator, that can calculate the maximum value of
 * several Aggregators that are passed as input.
 */
class Max {
  /**
   * Construct a Max Aggregator using an array of aggregatiors.
   */
  constructor (aggregators) {
    this.aggregators = aggregators
  }

  /**
   * Returns the score of this Max Aggregator.
   */
  eval () {
    return this.aggregators.reduce(
      (max, element) => Math.max(max, element.eval()),
      Number.NEGATIVE_INFINITY
    )
  }
}

/**
 * Return a WeightedMean Aggregator from an aggregator array. The parameters
 * will be forwarded to WeightedMean.constructor().
 */
function create (...args) {
  return new Max(...args)
}

module.exports = { create }
