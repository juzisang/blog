export default {
  methods: {
    validate (refName) {
      return new Promise((resolve, reject) => this.$refs[refName].validate(validate => validate ? resolve() : reject(new Error('validate error'))))
    },
    sleep (time) {
      return new Promise((resolve, reject) => setTimeout(() => resolve(), time))
    }
  }
}
