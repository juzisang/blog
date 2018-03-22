module.exports = class DataModel {
  constructor (data, msg, status) {
    if (data) {
      this.data = data
    }
    this.msg = msg
    this.status = status
  }
}

