module.exports = class DataModel {
  constructor (code, data, msg, status) {
    this.code = code
    if (data) {
      this.data = data
    }
    this.msg = msg
    this.status = status
  }
}

