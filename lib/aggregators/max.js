/**
 * Representation of an Aggregator, that can calculate the maximum value of
 * several Aggregators that are passed as input.
 */
class Max {
  /**
   * Construct a Max Aggregator using an array of aggregators.
   * @param aggregators - an array of aggregators
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
 * Return a Max Aggregator from an aggregator array. The parameters
 * will be forwarded to Max.constructor().
 */
function create (...args) {
  return new Max(...args)
}

module.exports = { create }
