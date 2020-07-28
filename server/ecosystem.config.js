const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

module.exports = {
  apps: [{
    name: path.basename(__dirname),
    cwd: __dirname,
    script: './dist/main.js',
    max_memory_restart: '300M',
    autorestart: false,
    watch: false,
    env: dotenv.parse(fs.readFileSync(path.join(__dirname, '.env')))
  }]
};
