import { Component, Vue } from "vue-property-decorator";
import {
  MuPaper,
  MuFlex,
  MuForm,
  MuFormItem,
  MuTextField,
  MuButton
} from "@/muse";
import * as style from "./Login.module.scss";
import { Action } from "vuex-class";

@Component({
  name: "Login",
  components: {
    Vue
  }
})
export default class Login extends Vue {
  @Action("Login")
  private readonly userLogin!: (payload: any) => Promise<any>;

  readonly $refs!: {
    form: any;
  };

  form = {
    name: "",
    password: ""
  };

  async handleLogin() {
    const result = await this.$refs.form.validate();
    if (result) {
      await this.userLogin(this.form);
    }
  }

  render() {
    return (
      <MuFlex
        justifyContent={"center"}
        alignItems={"center"}
        class={style.login}
      >
        <MuPaper class={style.loginBox} zDepth={2}>
          <h5>登录后台</h5>
          <MuForm ref="form" model={this.form}>
            <MuFormItem
              labelFloat={true}
              label="请输入用户名"
              prop="name"
              rules={[
                {
                  validate: val => val,
                  message: "用户名不能为空"
                }
              ]}
            >
              <MuTextField v-model={this.form.name} />
            </MuFormItem>
            <MuFormItem
              labelFloat={true}
              label="请输入密码"
              prop="password"
              rules={[
                {
                  validate: val => val,
                  message: "密码不能为空"
                },
                {
                  validate: val => val.length >= 6,
                  message: "最小长度为6"
                }
              ]}
            >
              <MuTextField v-model={this.form.password} />
            </MuFormItem>
            <MuButton
              onClick={this.handleLogin}
              class={style.loginBt}
              color="primary"
              large
              fullWidth
            >
              登录
            </MuButton>
          </MuForm>
        </MuPaper>
      </MuFlex>
    );
  }
}
