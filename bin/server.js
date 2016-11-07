const express = require('express')
const app = express()
let PORT = process.env.PORT || 3000

app.get('/api/welcome', function (req, res) {
  res.send('Welcome to ARROW')
})

app.listen(PORT, function () {
  console.log(`Server started on Port: ${PORT}`)
})
