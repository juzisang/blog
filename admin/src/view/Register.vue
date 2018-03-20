<template>
  <div class="Register">
    <div class="login-box">
      <el-form class="form" ref="form" :model="form" :rules="rules">
        <el-form-item prop="mail">
          <el-input v-model="form.mail" placeholder="邮箱" size="medium" autoComplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="帐号" size="medium" autoComplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码" size="medium" type="password"
                    autoComplete="off"></el-input>
        </el-form-item>
        <div class="help">
          <div>
            <span @click="$router.push('/login')">登录</span>
          </div>
        </div>
        <el-form-item>
          <el-button class="mt" type="primary" size="medium" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Common from '../mixins/Common'

  export default {
    name: 'Register',
    mixins: [Common],
    data () {
      return {
        form: {
          mail: '',
          name: '',
          password: ''
        },
        rules: {
          mail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 16, message: '你输入的密码太短啦', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      async register () {
        this.validate('form')
          .then(() => this.$Http.register(this.form))
          .then(data => {
            this.$message.success('注册成功')
            this.$router.replace('/login')
          })
          .catch(err => this.error(err))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/util";

  .Register {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    .login-box {
      width: 400px;
      background: #ffffff;
      box-sizing: border-box;
      padding: 30px 20px 20px 20px;
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

