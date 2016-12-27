/**
 * Representation of an Aggregator, that can calculate a generalization of the
 * logical 'or' operation on floating point numbers in [0.0, 1.0], where the
 * edge cases of 1.0 and 0.0 will reproduce the behaviour of logical and with
 * true and false respectively.
 */
class Or {
  /**
   * Construct a Or Aggregator using an array of aggregators.
   * @param aggregators - an array of aggregators
   */
  constructor (aggregators) {
    this.aggregators = aggregators
  }

  /**
   * Returns the score of this Or Aggregator.
   */
  eval () {
    // A or B = not ( A nand B )
    return 1.0 - this.aggregators.reduce(
      (or, element) => or * (1.0 - element.eval()),
      1.0)
  }
}

/**
 * Return an Or Aggregator from an aggregator array. The parameters
 * will be forwarded to Or.constructor().
 */
function create (...args) {
  return new Or(...args)
}

module.exports = { create }
