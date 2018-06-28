<template>
  <div>
    <div class="register-head">
      <i @click="back" class="iconfont icon-fanhui"></i>
      <h2>创建帐户</h2>
    </div>
    <div class="register-box" ref="regBox">
      <div class="register">
        <div class="register-con">
          <div class="register-con-top">
            <i class="iconfont icon-yonghu"></i>
            <div>
              <!--切换类名是span-back-->
              <span @click="userSex" :class="{'span-back':isSpan == false}">男性</span>
              <span @click="userSexnv" :class="{'span-back':isSpan == true}">女性</span>
            </div>
          </div>
          <div class="register-con-form">
            <div class="register-con-row">
              <div class="ming">
                <input type="text" placeholder="名" v-model="secName">
                <i v-if="isMing == true" class="iconfont icon-chuyidong"></i>
                <i v-if="isMing == false" class="iconfont icon-htmal5icon22"></i>
                <span v-if="isMing">必须填写</span>
              </div>
              <div class="xing">
                <input type="text" placeholder="姓" v-model="firName">
                <i v-if="isXing == true" class="iconfont icon-chuyidong"></i>
                <i v-if="isXing == false" class="iconfont icon-htmal5icon22"></i>
                <span v-if="isXing">必须填写</span>
              </div>
              <div class="e-mail">
                <input type="text" placeholder="电子邮件" v-model="username">
                <i v-if="isEmail == true" class="iconfont icon-chuyidong"></i>
                <i v-if="isEmail == false" class="iconfont icon-htmal5icon22"></i>
                <span v-if="isEmail">必须填写</span>
              </div>
              <div class="pwd">
                <input type="password" placeholder="密码" v-model="pwd">
                <i class="iconfont icon-yanjing-bi"></i>
                <span v-if="isPwd">必须填写</span>
                <p v-if="isPwdT">您的密码是安全的</p>
              </div>
            </div>
            <div class="firm">
              <div class="firm-head">
                <h3>企业</h3>
                <i v-if="isCard1" @click="firm" class="iconfont icon-arrow-down"></i>
                <i v-if="isCard1 == false" @click="firm" class="iconfont icon-arrow-up"></i>
              </div>
              <div v-if="isCard" class="firm-con">
                <div class="card">
                  <input type="text" placeholder="身份证" v-model="idCard">
                  <i v-if="isCardc == true" class="iconfont icon-chuyidong"></i>
                  <i v-if="isCardc == false" class="iconfont icon-htmal5icon22"></i>
                  <span v-if="isCardc">必须填写</span>
                </div>
                <div class="firm-name">
                  <input type="text" placeholder="企业名称" v-model="comName">
                  <i v-if="isfirmName == true" class="iconfont icon-chuyidong"></i>
                  <i v-if="isfirmName == false" class="iconfont icon-htmal5icon22"></i>
                  <span v-if="isfirmName">必须填写</span>
                </div>
              </div>
            </div>
            <div @click="privacy" class="privacy">
              <span></span>
              <i v-if="isPrivacy" class="iconfont icon-htmal5icon22"></i>
              <p>我接受 <a href="">隐私政策</a></p>
              <div class="privacy-txt">
                <div class="triangle_border_up">
                </div>
                <p>您必须接受隐私政策</p>
              </div>
            </div>
            <div class="mail">
              <span></span>
              <i class="iconfont icon-htmal5icon22"></i>
              <p>我不想收到Massimo Dutti.com的电子邮件</p>
            </div>
            <div class="found">
              <button @click="found">创建账户</button>
            </div>
            <div class="login">
              <router-link tag="button" to="/login">登录</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  
  export default {
    name: "Register",
    data() {
      return {
        secName: "",
        firName: "",
        username: "",
        pwd: "",
        idCard: "",
        comName: "",
        sex: "男",
        follow: [1, 1, 1],
        isShow: false,
        isMing: false,
        isXing: false,
        isEmail: false,
        isPwd: false,
        isPwdT: false,
        isCard: false,
        isPrivacy: false,
        isCard1: false,
        isCardc: false,
        isfirmName: false,
        isSpan: false,
      }
    },
    mounted() {
      let regWrapper = this.$refs.regBox;
      this.regWrapper = new BScroll(regWrapper, {
        click: true,
      })
    },
    methods: {
      found() {
        if (this.isPrivacy == true) {
          if (this.secName && this.firName && this.username && this.pwd) {
            /*判断用户名*/
            let reg1 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (reg1.test(this.username) == true) {
              this.isEmail = false;
            } else {
              this.isEmail = true;
            }
            /*判断名*/
            let reg2 = /^[\u4e00-\u9fa5]+$/;
            if (reg2.test(this.secName) == true) {
              this.isMing = false;
            } else {
              this.isMing = true;
            }
            /*判断姓*/
            let reg3 = /^[\u4e00-\u9fa5]+$/;
            if (reg3.test(this.firName) == true) {
              this.isXing = false;
            } else {
              this.isXing = true;
            }
            /*企业判断*/
            if (this.isCard == true && this.idCard != "" && this.comName != "") {
              /*判断身份证*/
              let reg4 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
              if (reg4.test(this.idCard) == true) {
                this.isCardc = false;
              } else {
                this.isCardc = true;
              }
              this.isfirmName = false;
            } else {
              this.isfirmName = true;
            }
            if (this.isPwd == false) {
              this.isPwdT = true;
            } else {
              this.isPwdT = false;
            }
            this.$axios.post(`${this.$api}/user/register`, {
              sex: this.sex,
              secName: this.secName,
              firName: this.firName,
              username: this.username,
              pwd: this.pwd,
              idCard: this.idCard,
              comName: this.comName,
              follow: this.follow
            }).then(({data}) => {
              console.log(data)
              if (data.status == 1) {
                alert(data.msg);
                this.$router.push("/login");
              } else {
                alert(data.msg);
              }
            }).catch((err) => {
              console.log(err);
            })
          } else {
            this.isMing = true;
            this.isXing = true;
            this.isEmail = true;
            this.isPwd = true;
            this.isCardc = true;
            this.isfirmName = true;
            if (this.isPwd == true) {
              this.isPwdT = false;
            } else {
              this.isPwdT = true;
            }
          }
        } else {
          this.isMing = true;
          this.isXing = true;
          this.isEmail = true;
          this.isPwd = true;
          this.isCardc = true;
          this.isfirmName = true;
          if (this.isPwd == true) {
            this.isPwdT = false;
          } else {
            this.isPwdT = true;
          }
        }
      },
      firm() {
        if (this.isCard == true) {
          this.isCard = false;
          this.isCard1 = false;
        } else {
          this.isCard = true;
          this.isCard1 = true;
        }
      },
      back() {
        this.$router.go(-1);
      },
      privacy() {
        if (this.isPrivacy == true) {
          this.isPrivacy = false;
        } else {
          this.isPrivacy = true;
        }
        
      },
      userSex() {
        this.sex = "男";
        this.isSpan = false;
      },
      userSexnv() {
        this.sex = "女";
        this.isSpan = true;
      },
    }
  }
</script>

<style lang="less" scoped>
  .register-head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
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
      width: 80%;
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
  
  .register-box {
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    height: calc(100% - 100px);
    overflow: hidden;
  }
  
  .register {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    overflow: scroll;
    .register-con {
      margin-top: 40px;
      padding: 40px 40px 0;
      div {
        margin-bottom: 20px;
      }
      .register-con-top {
        i {
          display: inline-block;
          font-size: 48px;
          width: 80px;
          padding: 16px 20px 0 0;
          vertical-align: middle;
        }
        div {
          width: 80%;
          display: inline-block;
          vertical-align: middle;
          span {
            display: inline-block;
            width: 49%;
            height: 76px;
            font-size: 22px;
            border: 1px solid #505252;
            float: left;
            text-align: center;
            line-height: 76px;
          }
          .span-back {
            border-right: none;
            background: #505252;
            color: white;
          }
        }
        
      }
      .register-con-form {
        margin-top: 20px;
        .register-con-row {
          .ming {
            position: relative;
            top: 0;
            left: 0;
            font-size: 26px;
            input {
              border: none;
              border-bottom: 1px solid #eaeaea;
              height: 72px;
              width: 100%;
              font-weight: 700;
              font-style: italic;
            }
            i {
              position: absolute;
              top: 30px;
              right: 30px;
              font-size: 30px;
            }
          }
          .xing {
            position: relative;
            top: 0;
            left: 0;
            font-size: 26px;
            input {
              border: none;
              border-bottom: 1px solid #eaeaea;
              height: 72px;
              width: 100%;
              font-weight: 700;
              font-style: italic;
            }
            i {
              position: absolute;
              top: 30px;
              right: 30px;
              font-size: 30px;
            }
          }
          .e-mail {
            position: relative;
            top: 0;
            left: 0;
            font-size: 26px;
            input {
              border: none;
              border-bottom: 1px solid #eaeaea;
              height: 72px;
              width: 100%;
              font-weight: 700;
              font-style: italic;
            }
            i {
              position: absolute;
              top: 30px;
              right: 30px;
              font-size: 30px;
            }
          }
          .pwd {
            position: relative;
            top: 0;
            left: 0;
            font-size: 26px;
            input {
              border: none;
              border-bottom: 1px solid #eaeaea;
              height: 72px;
              width: 100%;
              font-weight: 700;
              font-style: italic;
            }
            i {
              position: absolute;
              top: 30px;
              right: 30px;
              font-size: 30px;
            }
            p {
              font-size: 24px;
              margin-top: 10px;
              font-style: italic;
              letter-spacing: 2px;
            }
          }
          span {
            display: inline-block;
            font-size: 24px;
            color: #a94442;
            letter-spacing: 3px;
            margin: 10px 0;
          }
        }
        .firm {
          .firm-head {
            h3 {
              display: inline-block;
              font-size: 30px;
              margin-right: 10px;
            }
            i {
              font-size: 35px;
            }
          }
          .firm-con {
            display: block;
            .card {
              position: relative;
              top: 0;
              left: 0;
              font-size: 26px;
              input {
                border: none;
                border-bottom: 1px solid #eaeaea;
                height: 72px;
                width: 100%;
                font-weight: 700;
                font-style: italic;
              }
              i {
                position: absolute;
                top: 30px;
                right: 30px;
                font-size: 30px;
              }
              ul {
                li {
                  display: inline-block;
                  width: 49%;
                  span {
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background: #b99d6b;
                    vertical-align: middle;
                  }
                  p {
                    width: 80%;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 24px;
                    overflow: hidden;
                    letter-spacing: 1px;
                  }
                }
              }
            }
            .firm-name {
              position: relative;
              top: 0;
              left: 0;
              font-size: 26px;
              input {
                border: none;
                border-bottom: 1px solid #eaeaea;
                height: 72px;
                width: 100%;
                font-weight: 700;
                font-style: italic;
              }
              i {
                position: absolute;
                top: 30px;
                right: 30px;
                font-size: 30px;
              }
              ul {
                li {
                  display: inline-block;
                  width: 49%;
                  span {
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background: #b99d6b;
                    vertical-align: middle;
                  }
                  p {
                    width: 80%;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 24px;
                    overflow: hidden;
                    letter-spacing: 1px;
                  }
                }
              }
            }
            span {
              display: inline-block;
              font-size: 24px;
              color: #a94442;
              letter-spacing: 3px;
              margin: 10px 0;
            }
          }
        }
        .privacy {
          position: relative;
          top: 0;
          left: 0;
          margin-top: 30px;
          span {
            display: inline-block;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: #eaeaea;
            outline: 0;
            vertical-align: top;
            margin: 0 20px 0 0;
          }
          i {
            position: absolute;
            top: 9px;
            left: 9px;
            font-size: 30px;
          }
          p {
            margin: 10px 0 0;
            display: inline-block;
            width: calc(100% - 80px);
            vertical-align: top;
            line-height: 32px;
            letter-spacing: 1px;
            a {
              color: black;
              font-weight: 700;
            }
          }
          .privacy-txt {
            display: none;
            position: absolute;
            top: 40px;
            left: 0;
            z-index: 1000;
            .triangle_border_up {
              width: 0;
              height: 0;
              border-width: 0 20px 20px;
              border-style: solid;
              border-color: transparent transparent #505252;
              position: relative;
            }
            p {
              display: block;
              margin-top: -2px;
              background: #505252;
              color: white;
              width: 575px;
              padding: 20px 46px;
              font-size: 26px;
            }
          }
        }
        .mail {
          position: relative;
          top: 0;
          left: 0;
          margin-top: 10px;
          span {
            display: inline-block;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: #eaeaea;
            outline: 0;
            vertical-align: top;
            margin: 0 20px 0 0;
          }
          i {
            position: absolute;
            top: 9px;
            left: 9px;
            font-size: 30px;
          }
          p {
            margin: 10px 0 0;
            display: inline-block;
            width: calc(100% - 80px);
            vertical-align: top;
            line-height: 32px;
            letter-spacing: 1px;
          }
        }
        .found {
          margin-top: 20px;
          button {
            font-size: 26px;
            color: white;
            background: #b99d6b;
            font-weight: normal;
            text-align: center;
            padding: 26px 30px;
            width: 100%;
          }
        }
        .login {
          margin-top: 20px;
          button {
            font-size: 26px;
            color: white;
            background: #505252;
            font-weight: normal;
            text-align: center;
            padding: 26px 30px;
            width: 100%;
          }
        }
      }
    }
  }
  
  input {
    outline: none;
  }
  
  input:hover {
    border-bottom: 1px solid black !important;
  }
</style>
