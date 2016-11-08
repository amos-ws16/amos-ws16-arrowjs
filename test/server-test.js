let buster = require('buster')
let request = require('supertest-as-promised')
let app = require('../lib/server.js')

buster.testCase('GET /api/auth', {
  'should return a auth token': async () => {
    let res = await request(app)
      .get('/api/auth')
      .expect('Content-Type', /json/)
      .expect(200)

    let message = res.body
    buster.assert(message.success)
    // Any string is fine for now.
    buster.assert.isString(message.token)
  }
})
