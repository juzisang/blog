<template>
  <div class="CreateTag">
    <header class="header">
      新建标签
    </header>
    <section class="content">
      <el-row>
        <el-col :span="12">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="标签名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="缩略名称" prop="slug">
              <el-input v-model="form.slug"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="saveOrEdit" round>添加</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
  import Common from 'src/mixins/Common'
  import { RESET_TAGS } from 'src/store/common'

  export default {
    name: 'CreateTag',
    mixins: [Common],
    props: ['mid', 'name', 'slug'],
    data () {
      return {
        form: {
          name: this.name,
          slug: this.slug
        },
        rules: {
          name: [
            {required: true, message: '必须填写', trigger: 'blur'}
          ],
          slug: [
            {required: true, message: '必须填写', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      saveOrEdit () {
        this.validate('form')
          .then(() => this.mid ? this.$Http.editTag(Object.assign({}, this.form, {mid: this.mid})) : this.$Http.addTag(this.form))
          .then(() => this.$store.dispatch(RESET_TAGS))
          .then(() => this.$refs['form'].resetFields())
          .then(() => this.$message.success(`${this.mid ? '编辑' : '添加'}成功`))
          .then(() => this.$emit('success'))
          .catch(err => {
            this.error(err)
            this.$emit('error')
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .CreateTag {
    .header {
      margin: 0 0 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgb(238, 238, 238);
      font-size: 20px;
    }
  }
</style>

