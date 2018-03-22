<template>
  <div class="CreateCategory">
    <header class="header">
      新建分类
    </header>
    <section class="content">
      <el-row>
        <el-col :span="12">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="分类名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="分类名称" prop="slug">
              <el-input v-model="form.slug"></el-input>
            </el-form-item>
            <el-form-item label="分类描述" prop="description">
              <el-input v-model="form.description"></el-input>
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
  import { RESET_CATEGORY } from 'src/store/common'

  export default {
    name: 'CreateCategory',
    mixins: [Common],
    props: ['mid', 'name', 'slug', 'description'],
    data () {
      return {
        form: {
          name: this.name,
          slug: this.slug,
          description: this.description
        },
        rules: {
          name: [
            {required: true, message: '必须填写', trigger: 'blur'}
          ],
          slug: [
            {required: true, message: '必须填写', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '必须填写', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      saveOrEdit () {
        this.validate('form')
          .then(() => this.mid ? this.$Http.editCategory(Object.assign({}, this.form, {mid: this.mid})) : this.$Http.addCategory(this.form))
          .then(() => this.$store.dispatch(RESET_CATEGORY))
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
  .CreateCategory {
    .header {
      margin: 0 0 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgb(238, 238, 238);
      font-size: 20px;
    }
  }
</style>

