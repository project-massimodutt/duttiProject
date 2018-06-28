<template>
  <div>
    <my-head></my-head>
    <div class="newsletter">
      <div class="address-head">
        <i @click="back" class="iconfont icon-fanhui"></i>
        <div>
          <p>新闻通讯</p>
        </div>
      </div>
      <div class="newsletter-con">
        <p>请选择以下您希望关注的类别，我们将会向您推送相关的资讯</p>
        <div class="newsletter-con-btn">
          <div @click="btnnv">
            <span></span>
            <i v-if="isNv" class="iconfont icon-htmal5icon22"></i>
            <p>女装</p>
          </div>
          <div @click="btnnan">
            <span></span>
            <i v-if="isNan" class="iconfont icon-htmal5icon22"></i>
            <p>男装</p>
          </div>
          <div @click="btntong">
            <span></span>
            <i v-if="isTong" class="iconfont icon-htmal5icon22"></i>
            <p>男女童装</p>
          </div>
        </div>
        <div @click="btn" class="newsletter-con-btn-show">
          <span></span>
          <i v-if="isBtn" class="iconfont icon-htmal5icon22"></i>
          <p>我已阅读 <a href="">隐私政策</a> 并接受接收来自Massimo Dutti的新品、通讯和促销活动信息。</p>
        </div>
        <div class="newsletter-con-btn-save">
          <button @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHead from "../MyHead/MyHead";
  export default {
    name: "Newsletter",
    components: {
      MyHead
    },
    data() {
      return {
        isNv:false,
        isNan:false,
        isTong:false,
        isBtn:false,
        nv:0,
        nan:0,
        tong:0,
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      btnnv(){
        if(this.isNv == false){
          this.isNv = true;
          this.nv = 1;
          console.log(this.nv);
        }else{
          this.isNv = false;
          this.nv = 0;
          console.log(this.nv);
        }
      },
      btnnan(){
        if(this.isNan == false){
          this.isNan = true;
          this.nan = 1;
          console.log(this.nan);
        }else{
          this.isNan = false;
          this.nan = 0;
          console.log(this.nan);
        }
      },
      btntong(){
        if(this.isTong == false){
          this.isTong = true;
          this.tong = 1;
          console.log(this.tong);
        }else{
          this.isTong = false;
          this.tong = 0;
          console.log(this.tong);
        }
      },
      btn(){
        if(this.isBtn == false){
          this.isBtn = true;
        }else{
          this.isBtn = false;
        }
      },
      save(){
        if(this.isBtn == true){
          this.$axios.post(`${this.$api}/user/follow`,{
            userid:localStorage.getItem("userid"),
            follow:[this.nv,this.nan,this.tong],
          }).then(({data})=>{
            alert(data.msg);
          }).catch((err)=>{
            console.error(err);
          })
        }
      }
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

  .newsletter {
    position: fixed;
    top: 104px;
    width: 100%;
    height: calc(100% - 104px);
    overflow: scroll;
    z-index: 110;
    .newsletter-con {
      padding: 40px 70px;
      p:nth-child(1) {
        font-size: 26px;
        color: #505252;
        letter-spacing: 2px;
        line-height: 36px;
        margin-bottom: 30px;
      }
      .newsletter-con-btn {
        div {
          position: relative;
          left: 0;
          top: 0;
          width: 190px;
          display: inline-block;
          span {
            display: inline-block;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #eaeaea;
          }
          i {
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 30px;
          }
          p {
            display: inline-block;
            width: 30px;
            font-size: 26px;
            margin-left: 20px;
            color: #505252;

          }
        }
        div:nth-child(3) {
          p {
            width: 100px;
          }
        }
      }
      .newsletter-con-btn-show {
        position: relative;
        top: 0;
        left: 0;
        margin-top: 100px;
        span {
          display: inline-block;
          width: 50px;
          height: 50px;
          background: #eaeaea;
          border-radius: 50%;
        }
        i {
          position: absolute;
          top: 48px;
          left: 10px;
          font-size: 30px;
        }
        p {
          display: inline-block;
          width: 80%;
          font-size: 20px;
          color: #505252;
          letter-spacing: 2px;
          line-height: 32px;
          margin-left: 10px;
        }
        a {
          color: #505252;
          font-weight: 700;
        }
      }
      .newsletter-con-btn-save {
        width: 100%;
        margin-top: 100px;
        button {
          width: 100%;
          font-size: 26px;
          padding: 26px 30px;
          color: white;
          letter-spacing: 5px;
        }
      }
    }
  }
</style>
