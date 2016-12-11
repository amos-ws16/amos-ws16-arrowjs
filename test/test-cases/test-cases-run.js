const buster = require('buster')
const request = require('supertest')
const app = require('../../lib/server')

let allTestCases = {}
// allTestCases get loaded
allTestCases.testCasesDuc = require('./duc-test-cases.js').testCases
allTestCases.testCasesFabian = require('./fabian-test-cases').testCases
allTestCases.testCasesJan = require('./jan-test-cases').testCases
allTestCases.testCasesSimon = require('./simon-test-cases').testCases
allTestCases.testCasesYves = require('./yves-test-cases').testCases

// throws error cause testCases are not valid
// allTestCases = getAllTestCases()

var hitCounter = 0
var length = 0
for (let key in allTestCases) {
  var testCases = allTestCases[key]
  length += testCases.length
  console.log('TestCase name: ' + key)
  for (let index in testCases) {
    let testCase = testCases[index]
    request(app)
      .post('/api/score')
      .send(testCase)
      .end(function (err, res) {
        buster.refute(err)

        let biggestAIndex = 0
        let biggestAScore = 0
        for (let j in res.body.result) {
          if (res.body.result[j].total > biggestAScore) {
            biggestAIndex = j
            biggestAScore = res.body.result[j].total
          }
        }
        if (biggestAIndex === '0') {
          hitCounter++
        }
        console.log('groessterIndex:' + biggestAIndex + ', groesster Score:' + biggestAScore)
      })
  }
}
// Timeout needed because supertest runs tests asynchronously and nesting callbacks for 60 tests wouldn't be feasible.
// No better workaround found than waiting 3 seconds until hopefully all asynchronous tests have run through.
setTimeout(function () {
  const hitRate = hitCounter / length
  console.log('Länge: ' + length)
  console.log('Hits: ' + hitCounter)
  console.log((hitRate * 100) + '% wurden korrekt bewertet.')
  console.log('______________________________________')
}, 3000)

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
