<template>
  <div>
    <my-head></my-head>
    <div class="myPwd">
      <div class="address-head">
        <i @click="back" class="iconfont icon-fanhui"></i>
        <div>
          <p>安全中心</p>
        </div>
      </div>
      <div class="myPwd-con">
        <h2>CAMBIO DE CONTRASENA</h2>
        <div class="pwd">
          <div class="atPwd">
            <input type="password" placeholder="当前密码*" v-model="oldPwd">
            <i v-if="isOldPwd == true" class="iconfont icon-chuyidong"></i>
            <i v-if="isOldPwd == false" class="iconfont icon-htmal5icon22"></i>
            <span v-if="isOldPwd == true">必须填写</span>
          </div>
          <div class="newPwd">
            <input type="password" placeholder="新密码*" v-model="newPwd">
            <i class="iconfont icon-yanjing-bi"></i>
            <span v-if="isNewPwd == true">必须填写</span>
          </div>
          <div class="affPwd">
            <input type="password" placeholder="再次确认新密码*" v-model="newPwd2">
            <i v-if="isNewPwd == true" class="iconfont icon-chuyidong"></i>
            <i v-if="isNewPwd == false" class="iconfont icon-htmal5icon22"></i>
            <span v-if="isNewPwd == true">必须填写</span>
          </div>
          <div class="code">
            <div class="code-img">
              <img src="../../assets/img/pwd.1.png" alt="">
            </div>
            <div class="code-input">
              <input type="text" placeholder="输入图片中显示的字母" v-model="code">
              <i v-if="isNewPwd == true" class="iconfont icon-chuyidong"></i>
              <i v-if="isNewPwd == false" class="iconfont icon-htmal5icon22"></i>
              <span v-if="isNewPwd == true">必须填写</span>
            </div>
          </div>
          <div class="pwdBtn">
            <button @click="upPwd">确认更新密码</button>
          </div>
        </div>
        <div class="con-mail">
          <div class="con-mail-head">
            <h2>确认更新电子邮箱</h2>
            <p>您当前的电子邮箱是 <span>{{username}}</span></p>
          </div>
          <div class="con-mail-mid">
            <div class="con-mail-con-pwd">
              <input type="text" placeholder="当前邮箱*" v-model="oldUsername">
              <i v-if="isOldUsername == true" class="iconfont icon-chuyidong"></i>
              <i v-if="isOldUsername == false" class="iconfont icon-htmal5icon22"></i>
              <span v-if="isOldUsername == true">必须填写</span>
            </div>
            <div class="con-mail-con-e">
              <input type="text" placeholder="新邮箱*" v-model="newUsername">
              <i v-if="isNewUsername == true" class="iconfont icon-chuyidong"></i>
              <i v-if="isNewUsername == false" class="iconfont icon-htmal5icon22"></i>
              <span v-if="isNewUsername == true">必须填写</span>
            </div>
            <div class="con-mail-con-e-aff">
              <input type="text" placeholder="再次确认新电子邮箱*" v-model="newUsername2">
              <i v-if="isNewUsername == true" class="iconfont icon-chuyidong"></i>
              <i v-if="isNewUsername == false" class="iconfont icon-htmal5icon22"></i>
              <span v-if="isNewUsername == true">必须填写</span>
            </div>
            <div class="e-btn-aff">
              <button @click="upUsername">确认更新电子邮箱</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHead from "../MyHead/MyHead";
  export default {
    name: "MyPwd",
    components: {
      MyHead
    },
    data(){
      return{
        oldPwd:"",
        newPwd:"",
        newPwd2:"",
        oldUsername:"",
        newUsername:"",
        newUsername2:"",
        code:"",
        isOldPwd:false,
        isNewPwd:false,
        isOldUsername:false,
        isNewUsername:false,
        username:"",
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      upPwd(){
        if(this.oldPwd && this.newPwd && this.newPwd2){
          this.isOldPwd = false;
          if(this.newPwd == this.newPwd2){
            this.isNewPwd = false;
            if(this.code == "wcuhnp"){
              this.isNewPwd = false;
              this.$axios.post(`${this.$api}/pwd/update`,{
                userid:localStorage.getItem("userid"),
                oldPwd:this.oldPwd,
                newPwd:this.newPwd,
              }).then(({data})=>{
                console.log(data);
                if(data.status == 1){
                  alert("修改成功")
                }
              }).catch((err)=>{
                console.error(err);
              })
            }else{
              this.isNewPwd = true;
            }
          }else{
            this.isNewPwd = true;
          }
        }else{
          this.isOldPwd = true;
          this.isNewPwd = true;
        }
      },
      upUsername(){
        if(this.oldUsername && this.newUsername && this.newUsername2){
          let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(reg.test(this.oldUsername) == true){
            this.isOldUsername = false;
          }else{
            this.isOldUsername = true;
          }
          if(reg.test(this.newUsername)== true && reg.test(this.newUsername2)==true){
            if(this.newUsername == this.newUsername2){
              this.isNewUsername = false;
              this.$axios.post(`${this.$api}/username/update`,{
                userid:localStorage.getItem("userid"),
                oldUsername:this.oldUsername,
                newUsername:this.newUsername,
              }).then(({data})=>{
                console.log(data);
                alert(data.msg);
              }).catch((err)=>{
                console.error(err)
              })
            }else{
              this.isNewUsername = true;
            }
          }else {
            this.isOldUsername = true;
          }
        }else{
          this.isOldUsername = true;
          this.isNewUsername = true;
        }
      }
    },
    created(){
      this.username = localStorage.getItem("username");
    }
  }
</script>

<style lang="less" scoped>
  .address-head {
    height: 76px;
    width: 100%;
    background: #f0f0f0;
    line-height: 76px;
    i {
      font-size: 36px;
      padding-left: 10px;
      padding-left: 20px;
    }
    div {
      width: 80%;
      display: inline-block;
      p {
        text-align: center;
        font-size: 26px;
        line-height: 36px;
        color: #505252;
      }
    }
  }

  .myPwd {
    position: fixed;
    top: 104px;
    width: 100%;
    height: calc(100% - 104px);
    overflow: scroll;
    z-index: 110;
    .myPwd-con {
      padding: 100px 70px 0;
      h2{
        font-size: 22px;
        font-weight: 700;
        color: #505252;
        letter-spacing: 2px;
        line-height: 32px;
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
          outline: none;
        }
        input:hover {
          border-bottom: 1px solid black;
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
        span {
          display: inline-block;
          font-size: 24px;
          color: #a94442;
          letter-spacing: 3px;
          margin: 10px 0;
        }
        .atPwd, .newPwd, .affPwd, .code-input {
          position: relative;
          top: 0;
          left: 0;
          margin: 30px 0;
          i {
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 30px;
          }
        }
        .pwdBtn {
          width: 100%;
          margin-top: 30px;
          button {
            width: 100%;
            font-size: 26px;
            padding: 26px 30px;
            color: white;
            letter-spacing: 5px;
            background-color: #848686;
          }
        }
      }
      .con-mail{
        margin-top: 90px;
        .con-mail-head{
          h2{
            margin-bottom: 20px;
          }
          p{
            font-size: 22px;
            color: #505252;
            letter-spacing: 2px;
            line-height: 30px;
            span{
              font-weight: 600;
            }
          }
        }
        .con-mail-mid{
          .con-mail-con-pwd, .con-mail-con-e, .con-mail-con-e-aff{
            position: relative;
            top: 0;
            left: 0;
            margin: 30px 0;
            i {
              position: absolute;
              top: 30px;
              right: 30px;
              font-size: 30px;
            }
            span {
              display: inline-block;
              font-size: 24px;
              color: #a94442;
              letter-spacing: 3px;
              margin: 10px 0;
            }
            input {
              border: none;
              border-bottom: 1px solid #eaeaea;
              height: 72px;
              width: 100%;
              font-weight: 700;
              font-style: italic;
              outline: none;
            }
            input:hover {
              border-bottom: 1px solid black;
            }
          }
          .e-btn-aff{
            width: 100%;
            margin-top: 30px;
            button {
              width: 100%;
              font-size: 26px;
              padding: 26px 30px;
              color: white;
              letter-spacing: 5px;
              background-color: #848686;
            }
          }
        }
      }
    }

  }
</style>
