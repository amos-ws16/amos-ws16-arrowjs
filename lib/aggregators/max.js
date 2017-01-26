const utils = require('../utils')
const handleStar = require('../handle-star').handleStar

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
    utils.ensureValidAggregators(aggregators)
    this.aggregators = aggregators
  }

  /**
   * Returns the score of this Max Aggregator.
   */
  eval (scores) {
    const agList = handleStar(this.aggregators, scores)
    return agList.reduce(
      (max, element) => Math.max(max, element.eval(scores)),
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
