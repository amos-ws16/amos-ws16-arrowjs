/** TODO */
class Max {
  /** TODO */
  constructor (aggregators) {
    this.aggregators = aggregators
  }

  /** TODO */
  eval () {
    return this.aggregators.reduce((max, element) => Math.max(max, element.eval()), Number.NEGATIVE_INFINITY)
  }
}

/** TODO */
function create (aggregators) {
  return new Max(aggregators)
}

module.exports = { create }
