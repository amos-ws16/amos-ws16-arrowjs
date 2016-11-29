const buster = require('buster')
const request = require('supertest')
const app = require('../../lib/server')

const testCasesDuc = require('./duc-test-cases.js').testCases
const testCasesFabian = require('./fabian-test-cases').testCases
const testCasesJan = require('./jan-test-cases').testCases
const testCasesSimon = require('./simon-test-cases').testCases
const testCasesYves = require('./yves-test-cases').testCases

buster.testCase('Automated Test Cases', {
  'Ducs test cases should not throw an error': (done) => {
    for (let index in testCasesDuc) {
      let testCase = testCasesDuc[index]

      request(app)
        .post('/api/score')
        .send(testCase)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done((err, res) => {
          buster.refute(err)
        }))
    }
  },

  'Fabians test cases should not throw an error': (done) => {
    for (let index in testCasesFabian) {
      let testCase = testCasesFabian[index]

      request(app)
        .post('/api/score')
        .send(testCase)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done((err, res) => {
          buster.refute(err)
        }))
    }
  },

  'Jans test cases should not throw an error': (done) => {
    for (let index in testCasesJan) {
      let testCase = testCasesJan[index]

      request(app)
        .post('/api/score')
        .send(testCase)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done((err, res) => {
          buster.refute(err)
        }))
    }
  },

  'Simons test cases should not throw an error': (done) => {
    for (let index in testCasesSimon) {
      let testCase = testCasesSimon[index]

      request(app)
        .post('/api/score')
        .send(testCase)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done((err, res) => {
          buster.refute(err)
        }))
    }
  },

  'Yves test cases should not throw an error': (done) => {
    for (let index in testCasesYves) {
      let testCase = testCasesYves[index]

      request(app)
        .post('/api/score')
        .send(testCase)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done((err, res) => {
          buster.refute(err)
        }))
    }
  }
})
