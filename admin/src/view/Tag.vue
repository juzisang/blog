<template>
  <div class="Tag"></div>
</template>

<script>
  import { GET_TAGS } from 'src/store/common'
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'Tag',
    mixins: [],
    props: {},
    components: {},
    data () {
      return {}
    },
    computed: {
      ...mapState({
        tags: state => state.common.tags
      })
    },
    async created () {
      await this[GET_TAGS]()
    },
    methods: {
      ...mapActions([
        GET_TAGS
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .Tag {
  }
</style>

