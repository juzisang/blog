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
                  :key="item.mid"
                  :label="item.name"
                  :value="item.mid">
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
  import 'prismjs'
  import { mapState } from 'vuex'
  import Common from 'src/mixins/Common'
  import { RESET_TAGS, RESET_CATEGORY } from 'src/store/common'

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
          content: '',
          status: 'online',
          tags: [],
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
      slugPath () {
        return `${location.host}/archives/${this.articleForm.cid || 'cid'}/`
      },
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
          .then(() => this.findCreateTag())
          .then(() => this.articleForm.cid ? this.$Http.updateArticle(this.articleForm) : this.$Http.createArticle(this.articleForm))
          .then((data) => {
            (this.articleForm.cid = data.data.data.cid)
          })
          .then(() => this.$refs['form'].resetFields())
          .then(() => this.$message.success(`${status === 'online' ? '发布' : '保存'}成功`))
          .then(() => {
            if (status === 'online') {
              this.$store.dispatch(RESET_TAGS)
              this.$store.dispatch(RESET_CATEGORY)
            }
          })
          .catch(err => this.error(err))
      },
      async findCreateTag () {
        const notTags = this.articleForm.tags.filter(name => this.tags.includes(tag => tag.name !== name))
        const findTags = await Promise.all(notTags.map(name => this.$Http.addTag({name: name, slug: name})))
        findTags.forEach((tag, index) => {
          const i = this.articleForm.tags.findIndex(name => name === tag.name)
          if (i !== -1) {
            this.articleForm.tags[i] = tag.mid
          }
        })
      }
    },
    watch: {
      'articleForm.tags' () {
        const notTags = this.articleForm.tags.filter(name => this.tags.find(tag => tag.name !== name))
        console.log(notTags)
      }
    },
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

