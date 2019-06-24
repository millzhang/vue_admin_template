import { Vue, Component, Emit } from 'vue-property-decorator';
import {
  Form,
  Tabs,
  Input,
  Button,
  Icon,
  Row,
  Col,
  Alert
} from 'ant-design-vue';
import '@/assets/styles/login.scss';
import { userLogin } from '@/assets/utils';

@Component({
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-button': Button,
    'a-input': Input,
    'a-tabs': Tabs,
    'a-tabs-pane': Tabs.TabPane,
    'a-icon': Icon,
    'a-row': Row,
    'a-col': Col,
    'a-alert': Alert
  },
  props: {
    Form
  }
})
class Login extends Vue {
  // DATA
  loginForm: {
    username: string;
    password: string;
  } = { username: '', password: '' };
  logging: boolean = false;
  error: string = '';

  fetchLogin(values: object) {
    // to fetch login TODO
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  @Emit()
  submitForm() {
    this.Form.validateFields((err: any, values: object) => {
      console.log(values);
      if (!err) {
        this.logging = true;
        this.fetchLogin({ ...values }).then(res => {
          if (res) {
            this.logging = false;
            userLogin();
            this.$store.dispatch('getUserInfo').then(() => {
              this.$router.push('/');
            });
          }
        });
      }
      console.log('submit');
    });
  }
  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <div class="login-container">
        <div class="content">
          <div class="top">
            <div class="header">
              {/* <img alt="logo" class="logo" src="../../assets/images/logo.png" /> */}
              <span class="title">Vue Admin</span>
            </div>
            <div class="desc">后台管理系统模板</div>
          </div>
          <div class="login">
            <a-form ref="loginForm" on-submit={this.submitForm}>
              <a-tabs
                size="large"
                style="padding: 0 2px;"
                tabBarStyle={{ 'text-align': 'center' }}
              >
                <a-tabs-pane tab="账户密码登录" key="1">
                  <a-alert
                    type="error"
                    v-show={this.error}
                    message={this.error}
                    showIcon
                    style="margin-bottom: 24px;"
                  />
                  <a-form-item>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入你的账号' }]
                    })(
                      <a-input size="large" placeholder="请输入账号">
                        <a-icon slot="prefix" type="user" />
                      </a-input>
                    )}
                  </a-form-item>
                  <a-form-item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码' }]
                    })(
                      <a-input
                        size="large"
                        placeholder="请输入密码"
                        on-pressEnter={this.submitForm}
                        type="password"
                      >
                        <a-icon slot="prefix" type="lock" />
                      </a-input>
                    )}
                  </a-form-item>
                </a-tabs-pane>
                <a-tabs-pane tab="手机号登录" key="2">
                  <a-form-item>
                    <a-input size="large" placeholder="请输入手机号码">
                      <a-icon slot="prefix" type="mobile" />
                    </a-input>
                  </a-form-item>
                  <a-form-item>
                    <a-row>
                      <a-col span="16">
                        <a-input size="large" placeholder="请输入验证码">
                          <a-icon slot="prefix" type="mail" />
                        </a-input>
                      </a-col>
                      <a-col span="8" style="padding-left: 4px">
                        <a-button
                          style="width: 100%"
                          class="captcha-button"
                          size="large"
                        >
                          获取验证码
                        </a-button>
                      </a-col>
                    </a-row>
                  </a-form-item>
                </a-tabs-pane>
              </a-tabs>
              {/* <div>
              <a-checkbox checked="true">自动登录</a-checkbox>
              <a style="float: right">忘记密码</a>
            </div> */}
              <a-form-item>
                <a-button
                  loading={this.logging}
                  style="width: 100%;margin-top: 24px"
                  size="large"
                  on-click={this.submitForm}
                  type="primary"
                >
                  登录
                </a-button>
              </a-form-item>
              {/* <div>
                <router-link style="float: right" to="/dashboard/workplace">
                  注册账户
                </router-link>
              </div> */}
            </a-form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create({})(Login);
