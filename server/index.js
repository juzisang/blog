const express = require('express')

const config = require('./config')
const Db = require('./model')

var app = express()

app.listen(config.app.port, function () {
  console.log('Example app listening on port 3000!')
})