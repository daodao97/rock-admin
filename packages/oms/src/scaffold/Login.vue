<template>
  <div class="login-container">
    <div class="login-form">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <div class="login-body">
        <el-form
          v-show="loginType === 'local'"
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <span class="svg-container">
              <v-icon name="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <v-icon name="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <v-icon :name="passwordType === 'password' ? 'not-visible' : 'visible'" />
            </span>
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.prevent="handleLogin"
          >Login
          </el-button>
          <div class="tips">
            <span v-html="$store.state.settings.loginTips" />
          </div>
        </el-form>
        <div v-show="['dingTalk', 'wechat'].indexOf(loginType) !== -1">
          <div id="sso-qrcode" class="qrcode" />
        </div>
      </div>
      <div class="sso">
        <div
          v-if="loginType !== 'local'"
          class="sso-item"
          @click="loginType = 'local'"
        >
          <span>账号</span>
          <v-icon name="zhongjianren" />
        </div>
        <div
          v-for="(item, index) in sso"
          :key="index"
          class="sso-item"
          @click="changLoginChannel(item)"
        >
          <span>{{ item.title }}</span>
          <v-icon :name="item.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DingTalk from '../utils/sso/dingtalk'
import WeChat from '../utils/sso/wechat'

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      loginType: 'local'
    }
  },
  computed: {
    sso() {
      return (this.$store.state.settings.sso || []).filter(item => {
        return item.disable === undefined || !item.disable
      })
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.$message.error('表单错误')
          return false
        }
      })
    },
    changLoginChannel(sso) {
      if (sso.name === this.loginType) {
        return
      }
      this.loginType = sso.name
      const redirect_url =
          location.origin + location.pathname + '#' + (this.$route.params.redirect || '')
      const params = Object.assign(
        {},
        {
          elId: 'sso-qrcode',
          redirect_uri: redirect_url,
          iframe: {
            width: '280px',
            height: '320px'
          }
        },
        sso
      )

      if (this.loginType === 'dingTalk') {
        new DingTalk(params).run()
      }

      if (this.loginType === 'wechat') {
        new WeChat(params).run()
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .login-body {
    height: 320px;
  }

  .qrcode {
    display: flex;
    justify-content: center;
  }

  .sso {
    display: flex;
    justify-content: center;

    .account {
      line-height: 50px;
      text-align: center;
      background: #909399;
      padding: 3px;
      border-radius: 50%;
      background-clip: content-box;
    }

    .sso-item {
      width: 50px;
      height: 50px;

      ::v-deep(.svg-icon) {
        width: 2.5em;
        height: 2.5em;
      }
    }
  }
}
</style>
