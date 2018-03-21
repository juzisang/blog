<template>
  <div class="CreateArticle">
    <header class="header">
      新建文章

      <div class="bt-submit">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="push">发布</el-button>
      </div>
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
              <el-date-picker
                :default-value="new Date()"
                value-format="yyyy-MM-dd HH-mm-ss"
                style="width: 100%"
                type="datetime"
                v-model="articleForm.ctime"
                :clearable="false">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布时间">
              <el-date-picker
                :default-value="new Date()"
                style="width: 100%"
                type="datetime"
                v-model="articleForm.utime"
                :clearable="false">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分类">
              <el-select style="width: 100%"
                         v-model="articleForm.category"
                         placeholder="请选择">
                <el-option
                  v-for="item in categorys"
                  :key="item.mid"
                  :label="item.name"
                  :value="item.mid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签">
              <el-select style="width: 100%"
                         v-model="articleForm.tags"
                         multiple
                         placeholder="请选择">
                <el-option
                  v-for="item in tags"
                  :key="item.mid"
                  :label="item.name"
                  :value="item.mid">
                </el-option>
              </el-select>
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
  import { mapState } from 'vuex'
  import Common from 'src/mixins/Common'

  export default {
    name: 'CreateArticle',
    mixins: [Common],
    props: {},
    components: {},
    data () {
      return {
        activeName: '编辑',
        articleForm: {
          title: '',
          slug: '',
          content: 'Hello Wrold',
          status: 'online',
          tags: '',
          category: '',
          ctime: '',
          utime: ''
        },
        rules: {
          title: [{required: true, message: '必须填写', trigger: 'blur'}],
          slug: [{required: true, message: '必须填写', trigger: 'blur'}],
          content: [{required: true, message: '必须填写', trigger: 'blur'}],
          tags: [{required: true, message: '必须填写', trigger: 'blur'}],
          category: [{required: true, message: '必须填写', trigger: 'blur'}],
          ctime: [{required: true, message: '必须填写', trigger: 'blur'}],
          utime: [{required: true, message: '必须填写', trigger: 'blur'}]
        }
      }
    },
    computed: {
      ...mapState({
        tags: state => state.common.tags,
        categorys: state => state.common.categorys
      })
    },
    mounted () {
    },
    methods: {
      rendered () {
        window.Prism.highlightAll()
      },
      save () {
        this.saveOrUpdate('draft')
      },
      push () {
        this.saveOrUpdate('online')
      },
      saveOrUpdate (status) {
        this.articleForm.status = status
        this.validate('form')
          .then(() => this.articleForm.cid ? this.$Http.updateArticle(this.articleForm) : this.$Http.createArticle(this.articleForm))
          .then((data) => {
            (this.articleForm.cid = data.data.data.cid)
          })
          .then(() => this.$refs['form'].resetFields())
          .then(() => this.$message.success(`${status === 'online' ? '发布' : '保存'}成功`))
          .catch(err => this.error(err))
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
      padding-bottom: 20px;
      border-bottom: 1px solid rgb(238, 238, 238);
      font-size: 20px;
      position: relative;
      .bt-submit {
        float: right;
      }
    }
    .text-content {
      input {
        border: none;
      }
    }
  }
</style>

