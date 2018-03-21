<template>
  <div class="CreateArticle pageBody">
    <header class="header">
      新建文章
    </header>
    <section class="content">
      <el-form ref="form" :model="articleForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="articleForm.slug"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-input v-model="articleForm.ctime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布时间">
              <el-input v-model="articleForm.utime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分类">
              <el-input v-model="articleForm.category"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签">
              <el-input v-model="articleForm.tags"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="内容">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="编辑" name="编辑">
              <el-input class="text-content" type="textarea" v-model="articleForm.content" :rows="10"></el-input>
            </el-tab-pane>
            <el-tab-pane label="预览" name="预览">
              <VueMarkdown v-if="activeName === '预览'"
                           :source="articleForm.content"
                           :show="true"
                           @rendered="rendered">
              </VueMarkdown>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
  import 'prismjs'

  export default {
    name: 'CreateArticle',
    mixins: [],
    props: {},
    components: {},
    data () {
      return {
        activeName: '编辑',
        articleForm: {
          title: '',
          slug: '',
          content: 'Hello Wrold',
          type: '',
          status: '',
          tags: '',
          category: '',
          ctime: '',
          utime: ''
        }
      }
    },
    computed: {},
    mounted () {
    },
    methods: {
      rendered () {
        window.Prism.highlightAll()
      }
    },
    watch: {},
    beforeDestroy () {
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../node_modules/prismjs/themes/prism.css';

  .CreateArticle {
    .header {
      margin: 0 0 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(238, 238, 238);
      font-size: 20px;
    }
    .text-content {
      input {
        border: none;
      }
    }
  }
</style>

