const utils = require('../utils.js')

/**
 * Compares two numbers and therefore uses the given 'operator' field
 * from params { operator: '<' }.
 *
 * @param num1 first number that is compared
 * @param num2 second number that is compared
 * @param params specifies the operator param ('=', '<=', ...)
 *
 * @return 1.0 or 0.0
 */
function compareNumbers (num1, num2, params) {
  let operator = (params && params['operator'])

  utils.isNumber(num1)
  utils.isNumber(num2)

  var answer
  switch (operator) {
    case '=':
      answer = (num1 === num2)
      break
    case '<=':
      answer = (num1 <= num2)
      break
    case '<':
      answer = (num1 < num2)
      break
    case '>=':
      answer = (num1 >= num2)
      break
    case '>':
      answer = (num1 > num2)
      break
    default:
      throw new Error(`Unknown operator: ` + operator)
  }

  if (answer) {
    return 1.0
  } else {
    return 0.0
  }
}

module.exports = compareNumbers
