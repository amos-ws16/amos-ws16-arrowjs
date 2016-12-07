
// const fs = require('fs')
const scoreManager = require('../../lib/score-manager')
const config = require('../../config/index.js')
const manager = scoreManager.create(config.scoreManager)

let allTestCases = {}
// other testcases don't work yet, some errors occur because some fields are missing
// allTestCases.testCasesDuc = require('./duc-test-cases.js').testCases
// allTestCases.testCasesFabian = require('./fabian-test-cases').testCases
// allTestCases.testCasesJan = require('./jan-test-cases').testCases
allTestCases.testCasesSimon = require('./simon-test-cases').testCases
// allTestCases.testCasesYves = require('./yves-test-cases').testCases

// throws error cause testCases are not valid
// allTestCases = getAllTestCases()

for (let key in allTestCases) {
  var testCases = allTestCases[key]
  var hitCounter = 0
  console.log('TestCase name: ' + key)
  for (let index in testCases) {
    let testCase = testCases[index]
    const a = manager.score(testCase)
    let biggestAIndex = 0
    let biggestAScore = 0
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
  const hitRate = hitCounter / testCases.length

  console.log('Länge: ' + testCases.length)
  console.log('Hits: ' + hitCounter)
  console.log((hitRate * 100) + '% wurden korrekt bewertet.')
  console.log('______________________________________')
}

/**
*dynamic loads of all testcases in the folder ('./test/test-cases') with the format of <NAME>-test-cases.js
*@param
*/
/* function getAllTestCases () {
  let testCasesSet = {}
  let files = fs.readdirSync('./test/test-cases')
  for (let file of files) {
    if (file.substring(file.length - 13, file.length) === 'test-cases.js') {
      testCasesSet[file] = require('./' + file.substring(0, file.length - 3)).testCases
    }
  }
  return testCasesSet
}
*/
