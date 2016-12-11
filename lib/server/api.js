const express = require('express')
const config = require('../../config')
const postApiScore = require('./post-api-score')
const packageInfo = require('../../package.json')

const router = express.Router()

router.get('/welcome', (req, res) => {
  let changelogURL = 'https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/CHANGELOG.md'
  let userGuideURL = 'https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/user-guide.md'
  let message = '<!DOCTYPE html>\r\n' +
                '<html>\r\n<body>\r\n' +
                '<h1>Welcome to Arrow!</h1>\r\n' +
                '<p>Version: ' + packageInfo.version + '</p>\r\n' +
                '<p>visit <a href="' + changelogURL + '">Changelog</a></p>\r\n' +
                '<p>visit <a href="' + userGuideURL + '">User Guide</a></p>\r\n' +
                '</body>\r\n</html>'
  res.send(message)
})

router.get('/auth', (req, res) => {
  let data = { success: true, token: config.secretToken }
  res.json(data)
})

router.post('/score', postApiScore)

module.exports = router
