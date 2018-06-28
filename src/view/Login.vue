<template>
  <div>
    <div class="login">
      <div class="login-head">
        <i @click="back1" class="iconfont icon-fanhui"></i>
        <h2>注册</h2>
      </div>
      <div class="login-con">
        <h3>输入您的电子邮件和密码以便登录</h3>
        <div class="row">
          <div style="position: relative;top: 0; left: 0;">
            <input type="text" placeholder="电子邮件*" v-model="mail">
            <i v-if="isShow == true" class="iconfont icon-chuyidong"></i>
            <i v-if="isShow == false" class="iconfont icon-htmal5icon22"></i>
          </div>
          <span v-if="isShow" style="display:inline-block">请输入有效的电子邮箱</span>
          <br>
          <div style="position: relative;top: 0; left: 0;">
            <input type="password" placeholder="密码*" ref="pwd" v-model="pwd">
            <i class="iconfont icon-yanjing"></i>
          </div>
          <span v-if="isHied">必须填写</span>
        </div>
        <div class="forgetPwd">
          <a href="">忘记密码了吗?</a>
        </div>
        <div class="remember">
          <span></span>
          <i class="iconfont icon-htmal5icon22"></i>
          <p>保持会开启</p>
        </div>
        <div class="btn">
          <button @click="login">登入</button>
          <router-link tag="button" to="/Register">创建账户</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        mail: "",
        pwd: "",
        isShow: false,
        isHied: false,
      }
    },
    methods: {
      login() {
        /*验证用户名*/
        let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (reg.test(this.mail) == true) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
        /*验证 密码*/
        if (this.pwd != "") {
          this.isHied = false;
        } else {
          this.isHied = true;
        }
        
        if (reg.test(this.mail) == true && this.pwd != "") {
          this.$axios.post(`${this.$api}/user/login`, {
            username: this.mail,
            pwd: this.pwd,
          }).then(({data}) => {
            console.log(data);
            if (data.status == 1) {
              localStorage.removeItem("userid");
              localStorage.removeItem("username");
              localStorage.setItem("userid", data.data.userid);
              localStorage.setItem("username", data.data.username);
              this.$router.push("/index");
            } else {
              console.log(data.msg);
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      back1() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="less" scoped>
  .login {
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    width: 100%;
    height: 100%;
    .login-head {
      padding: 0 50px;
      border-bottom: 1px solid #eaeaea;
      i {
        font-size: 36px;
        color: #3b5998;
        line-height: 100px;
        vertical-align: middle;
      }
      h2 {
        display: inline-block;
        vertical-align: middle;
        width: 90%;
        height: 100%;
        font-size: 28px;
        font-weight: normal;
        margin: 0;
        line-height: 100px;
        padding: 0;
        letter-spacing: 1px;
        margin-top: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
      }
    }
    .login-con {
      padding: 50px 50px 0;
      h3 {
        display: block;
        font-size: 26px;
        margin-bottom: 50px;
        letter-spacing: 2px;
      }
      .row {
        width: 100%;
        height: 240px;
        
        input {
          font-style: italic;
          font-size: 26px;
          padding-right: 50px;
          border-right: 0;
          border-top: 0;
          border-radius: 0;
          border-left: 0;
          box-shadow: none;
          border-bottom: 1px solid #eaeaea;
          width: calc(100% - 50px);
          font-weight: 700;
          height: 72px;
          margin-bottom: 10px;
          outline: none;
        }
        input:hover {
          border-bottom: 1px solid black;
        }
        span {
          font-size: 24px;
          color: #a94442;
          letter-spacing: 3px;
          margin-bottom: 10px;
        }
        i {
          position: absolute;
          top: 20px;
          right: 10px;
          font-size: 30px;
        }
      }
      .forgetPwd {
        a {
          display: block;
          text-align: center;
          text-decoration: none;
          font-size: 24px;
          color: #505252;
          letter-spacing: 6px;
        }
      }
      .remember {
        position: relative;
        top: 0;
        left: 0;
        margin-top: 30px;
        span {
          display: inline-block;
          width: 52px;
          height: 50px;
          border-radius: 50%;
          background: #eaeaea;
          outline: 0;
          vertical-align: top;
          margin: 0 20px 0 0;
        }
        i {
          position: absolute;
          top: 13px;
          left: 12px;
          font-size: 30px;
        }
        p {
          margin: 10px 0 0;
          display: inline-block;
          width: calc(100% - 80px);
          vertical-align: top;
          line-height: 32px;
          letter-spacing: 3px;
        }
      }
      .btn {
        margin-top: 190px;
        button {
          display: block;
          width: 100%;
          border: 1px solid transparent;
          padding: 26px 30px;
          color: white;
          font-size: 26px;
        }
        button:nth-child(1) {
          background-color: #b99d6b;
          border-color: #b99d6b;
          margin-bottom: 20px;
        }
        button:nth-child(2) {
          background-color: #505252;
          border-color: #505252;
        }
      }
    }
  }
</style>
