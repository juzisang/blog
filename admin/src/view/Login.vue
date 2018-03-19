<template>
  <div class="Login">
    <div class="login-box">
      <el-form class="form" ref="form" :model="form" :rules="rules">
        <el-form-item prop="name">
          <el-input class="mt" v-model="form.name" placeholder="帐号" size="medium"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="mt" v-model="form.password" placeholder="密码" size="medium" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="mt" type="primary" size="medium" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Common from '../mixins/Common'

  export default {
    name: 'Login',
    mixins: [Common],
    props: {},
    components: {},
    data () {
      return {
        form: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {},
    mounted () {
    },
    methods: {
      async login () {
        await this.validate('form').catch(err => this.$message.error(err))
      }
    },
    watch: {},
    beforeDestroy () {
    }
  }
</script>

<style lang="scss" scoped>
  .Login {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    .login-box {
      width: 420px;
      height: 260px;
      background: #ffffff;
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      align-items: center;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
      .form {
        width: 100%;
      }
      .mt {
        width: 100%;
        margin-top: 12px;
      }
    }
  }
</style>

