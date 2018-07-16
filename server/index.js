const express = require('express')

const config = require('./config')

const app = express()

app.listen(config.app.port, function () {
  console.log('Example app listening on port 3000!')
})