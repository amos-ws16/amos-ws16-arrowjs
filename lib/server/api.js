const express = require('express')
const config = require('../../config')
const postApiScore = require('./post-api-score')

const router = express.Router()

router.get('/welcome', (req, res) => {
  res.send('Welcome to ARROW')
})

router.get('/auth', (req, res) => {
  let data = { success: true, token: config.secretToken }
  res.json(data)
})

router.post('/score', postApiScore)

module.exports = router
