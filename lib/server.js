'use strict'

let express = require('express')
let app = express()

const secretToken = '8cd96c8697d12daf4dfd135aec01fd63ee058ab4'

app.get('/api/auth', (req, res) => {
  let data = { success: true, token: secretToken }
  res.json(data)
})

module.exports = app
