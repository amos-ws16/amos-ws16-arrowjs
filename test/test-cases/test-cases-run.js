
const scoreManager = require('../../lib/score-manager')

// const testCasesDuc = require('./duc-test-cases.js').testCases
// const testCasesFabian = require('./fabian-test-cases').testCases
// const testCasesJan = require('./jan-test-cases').testCases
const testCasesSimon = require('./simon-test-cases').testCases
// const testCasesYves = require('./yves-test-cases').testCases

const config = require('../../config/index.js')

const manager = scoreManager.create(config.scoreManager)

var testCases = testCasesSimon
var hitCounter = 0

for (let index in testCases) {
  let testCase = testCases[index]
  const a = manager.score(testCase)
  var biggestAIndex = 0
  var biggestAScore = 0
  for (let j in a) {
    if (a[j].total > biggestAScore) {
      biggestAIndex = j
      biggestAScore = a[j].total
    }
  }
  console.log('groessterIndex:' + biggestAIndex + ', groesster Score:' + biggestAScore)
  if (biggestAIndex === '0') {
    hitCounter++
  }
}
console.log('Länge: ' + testCases.length)
console.log('Hits: ' + hitCounter)
const hitRate = hitCounter / testCases.length

console.log((hitRate * 100) + '% wurden korrekt bewertet.')
