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
          <el-input v-model="slugPath" :disabled="true"></el-input>
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
                         allow-create
                         filterable
                         default-first-option
                         placeholder="请选择">
                <el-option
                  v-for="item in tags"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="内容">
          <markdown-editor v-model="articleForm.content" ref="markdownEditor" :highlight="true"></markdown-editor>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Common from 'src/mixins/Common'
  import { RESET_TAGS, RESET_CATEGORY } from 'src/store/common'
  import { SAVE_ARTICLE } from 'src/store/article'

  export default {
    name: 'CreateArticle',
    mixins: [Common],
    props: {},
    components: {},
    data () {
      return {
        activeName: '编辑',
        articleForm: Object.assign({}, this.$store.state.article.article),
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
      formData () {
        const data = Object.assign({}, this.articleForm)
        data.tags = this.tags.filter(tag => data.tags.find(item => tag.name === item)).map(item => item.mid)
        return data
      },
      slugPath () {
        return `${location.host}/archives/${this.$store.state.article.cid || '{cid}'}/`
      },
      ...mapState({
        tags: state => state.common.tags,
        categorys: state => state.common.categorys
      })
    },
    mounted () {
    },
    methods: {
      save () {
        this.saveOrUpdate('draft')
      },
      push () {
        this.saveOrUpdate('online')
      },
      saveOrUpdate (status) {
        this.articleForm.status = status
        this.validate('form')
          .then(() => this.findCreateTag())
          .then(() => this.$store.dispatch(SAVE_ARTICLE, this.formData))
          .then(() => this.$refs['form'].resetFields())
          .then(() => this.$message.success(`${status === 'online' ? '发布' : '保存'}成功`))
          .then(async () => {
            if (status === 'online') {
              this.$store.dispatch(RESET_TAGS)
              this.$store.dispatch(RESET_CATEGORY)
            }
          })
          .catch(err => this.error(err))
      },
      async findCreateTag () {
        await Promise.all(this.articleForm.tags.map(name => this.$Http.findOrCreateTag({
          name: name,
          slug: name
        })))
        await this.$store.dispatch(RESET_TAGS)
      }
    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
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
  }
}
</style>

