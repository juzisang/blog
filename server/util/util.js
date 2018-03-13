const schema = require('async-validator')

function validate (rules, params) {
  return new Promise((resolve, reject) => new schema(rules).validate(params, (error, data) => error ? reject(error[0]) : resolve(params)))
}

function getContentImgs (str) {
  const pattern = /!\[(.*?)\]\((.*?)\)/mg
  const result = []
  let matcher
  while ((matcher = pattern.exec(str)) !== null) {
    result.push({
      name: matcher[1],
      url: matcher[2]
    })
  }
  return result
}

module.exports = {
  validate,
  getContentImgs
}