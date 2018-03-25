export default {
  methods: {
    validate (refName) {
      return new Promise((resolve, reject) => this.$refs[refName].validate(validate => validate ? resolve() : reject(new Error('validate error'))))
    },
    sleep (time) {
      return new Promise((resolve, reject) => setTimeout(() => resolve(), time))
    },
    error (err) {
      if (err instanceof Error) {
        this.$message.error(err.message || '未知错误')
      } else {
        this.$message.error(err.msg || '未知错误')
      }
    }
  }
}
