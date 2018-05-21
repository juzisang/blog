<template>
  <div class="BaseSetting">
    <header class="header">
      基本设置
      <div class="bt-submit">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="push">发布</el-button>
      </div>
    </header>
    <section class="content">
      <el-form ref="form" :model="form" label-width="80px">
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BaseSetting',
  mixins: [],
  props: {},
  components: {},
  data () {
    return {
      form: {
      }
    }
  },
  computed: {},
  mounted () {
  },
  methods: {},
  watch: {},
  beforeDestroy () {
  }
}
</script>

<style lang="scss" scoped>
.BaseSetting {
}
</style>

