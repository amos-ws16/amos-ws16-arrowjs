const buster = require('buster')
const request = require('supertest')
const app = require('../lib/server.js')

buster.testCase('GET /api/auth', {
  'should return an auth token': (done) => {
    request(app)
      .get('/api/auth')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done((err, res) => {
        buster.refute(err)

        const message = res.body
        buster.assert(message.success)
        // Any string is fine for now.
        buster.assert.isString(message.token)
      }))
  }
})
