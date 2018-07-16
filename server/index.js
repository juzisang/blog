const express = require('express')

const config = require('./config')

const app = express()

app.listen(config.app.port, config.app.host, function () {
  console.log(`Example app ${config.app.host} on port ${config.app.port}!`)
})