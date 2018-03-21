<template>
  <div class="Tag pageBody">
    <el-table
      :data="tags"
      stripe
      header-row-style="font-size:14px;font-weight: normal;"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="slug"
        label="缩写"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="文章数">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
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

