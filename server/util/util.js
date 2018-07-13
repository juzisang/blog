const schema = require('async-validator')

function validate (rules, params) {
  return new Promise((resolve, reject) => new schema(rules).validate(params, (error, data) => error ? reject(error[0]) : resolve(params)))
}
