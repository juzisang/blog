<template>
  <div class="Tag">
    <el-table
      :data="tags"
      stripe
      :header-row-style="{fontSize:'14px',fontWeight: 'normal'}"
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
        prop="total"
        label="文章数">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            size="mini">编辑
          </el-button>
          <el-button
            @click="handleDel(scope.row.mid)"
            size="mini"
            type="danger">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%">
      <CreateTag
        @success="dialogVisible = false"
        @error="dialogVisible = false"
        v-if="dialogVisible"
        :slug="tag.slug"
        :name="tag.name"
        :mid="tag.mid">
      </CreateTag>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { RESET_TAGS } from 'src/store/common'
  import CreateTag from './CreateTag.vue'

  export default {
    name: 'Tag',
    mixins: [],
    props: {},
    components: {
      CreateTag
    },
    data () {
      return {
        dialogVisible: false,
        tag: {}
      }
    },
    computed: {
      ...mapState({
        tags: state => state.common.tags
      })
    },
    async created () {
    },
    methods: {
      handleEdit (tag) {
        this.tag = tag
        this.dialogVisible = true
      },
      handleDel (mid) {
        this.$confirm('此操作将永久该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => this.$Http.delMeta(mid))
          .then(() => this.$store.dispatch(RESET_TAGS))
          .catch((err) => console.error(err))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Tag {
  }
</style>

