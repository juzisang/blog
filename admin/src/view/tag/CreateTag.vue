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
              <el-button type="primary" size="medium" @click="add" round>添加</el-button>
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
    data () {
      return {
        form: {
          name: '',
          slug: ''
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
      add () {
        this.validate('form')
          .then(() => this.$Http.addTag(this.form))
          .then(() => this.$store.dispatch(RESET_TAGS))
          .then(() => this.$refs['form'].resetFields())
          .then(() => this.$message.success('添加成功'))
          .catch(err => this.error(err))
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

