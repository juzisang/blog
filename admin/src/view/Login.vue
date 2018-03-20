<template>
  <div class="Login">
    <div class="login-box">
      <el-form class="form" ref="form" :model="form" :rules="rules">
        <el-form-item prop="mail">
          <el-input class="mt" v-model="form.mail" placeholder="邮箱" size="medium" autoComplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="mt" v-model="form.password" placeholder="密码" size="medium" type="password"
                    autoComplete="off"></el-input>
        </el-form-item>
        <div class="help">
          <div>
            <span>忘记密码</span>
            <span @click="$router.push('/register')">注册</span>
          </div>
        </div>
        <el-form-item>
          <el-button class="mt" type="primary" size="medium" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Common from '../mixins/Common'
  import Cookies from 'js-cookie'

  export default {
    name: 'Login',
    mixins: [Common],
    data () {
      return {
        form: {
          mail: '',
          password: ''
        },
        rules: {
          mail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      async login () {
        this.validate('form')
          .then(() => this.$Http.login(this.form))
          .then(data => {
            Cookies.set('authorization', data.data.data.token, {expires: 7})
            this.$message.success('登录成功')
            this.$router.replace('/home')
          })
          .catch(err => this.error(err))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/util";

  .Login {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    .login-box {
      width: 400px;
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
      .help {
        font-size: 14px;
        color: #8590a6;
        @include clearfix;
        > div {
          float: right;
        }
        span {
          cursor: pointer;
          display: inline-block;
          &:first-child {
            padding: 0 4px;
          }
        }

      }
    }
  }
</style>

