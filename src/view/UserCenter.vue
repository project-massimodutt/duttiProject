<template>
  <div>
    <my-head></my-head>
    <div class="userCenter">
      <div class="address-head">
        <div>
          <p>我的账户</p>
        </div>
      </div>
      <div class="userCenter-con">
        <div class="myIndent">
          <div class="myIndent-left">
            <i class="iconfont icon-iconcopy"></i>
          </div>
          <div class="myIndent-right">
            <router-link tag="span" to="/myIndent">我的订单</router-link>
            <p>查看您的购买明细 并跟踪配送状态</p>
            <i class="iconfont icon-combinedshapefuben"></i>
          </div>
        </div>
        <div class="myAddress">
          <div class="myIndent-left">
            <i class="iconfont icon-fangzi"></i>
          </div>
          <div class="myIndent-right">
            <router-link tag="span" to="/myAddress">我的地址簿</router-link>
            <p>保存您的配送和帐单地址，以便更快速结帐</p>
            <i class="iconfont icon-combinedshapefuben"></i>
          </div>
        </div>
        <div class="myProfile">
          <div class="myIndent-left">
            <i class="iconfont icon-mingpian"></i>
          </div>
          <div class="myIndent-right">
            <router-link tag="span" to="/myProfile">我的个人资料设置</router-link>
            <p>更新您的个人资料和密码</p>
            <i class="iconfont icon-combinedshapefuben"></i>
          </div>
        </div>
        <div class="newsletter">
          <div class="myIndent-left">
            <i class="iconfont icon-xinfeng"></i>
          </div>
          <div class="myIndent-right">
            <router-link tag="span" to="/newsletter">NEWSLETTER</router-link>
            <p>指出您的偏好以接收您感兴趣的内容</p>
            <i class="iconfont icon-combinedshapefuben"></i>
          </div>
        </div>
        <div class="download">
          <div class="myIndent-left">
            <i class="iconfont icon-xiazai"></i>
          </div>
          <div class="myIndent-right">
            <router-link tag="span" to="/download">下载应用</router-link>
            <p>在此下载</p>
            <i class="iconfont icon-combinedshapefuben"></i>
          </div>
        </div>
        <div class="myPwd">
          <div class="myIndent-left">
            <i class="iconfont icon-yonghu"></i>
          </div>
          <div class="myIndent-right">
            <router-link tag="span" to="/myPwd">我的密码</router-link>
            <p>更新您的密码和电子邮件地址</p>
            <i class="iconfont icon-combinedshapefuben"></i>
          </div>
        </div>
        <div class="userCenter-con-bottom">
          <div class="userCenter-con-bottom-txt">
            <p>需要帮助吗</p>
            <span>联系我们</span>
          </div>
          <div class="userCenter-con-bottom-btn">
            <i @click="btn" class="iconfont icon-kaiji"></i>
            <p>注销</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHead from "../components/MyHead/MyHead";
  
  export default {
    name: "UserCenter",
    components: {
      MyHead
    },
    methods: {
      btn() {
        this.$axios.get(`${this.$api}/user/loginout`).then(({data}) => {
          console.log(data);
          if (data.status == 1) {
            localStorage.removeItem('userid');
            localStorage.removeItem('username');
            this.$router.push({
              name: 'Index'
            });
          } else {
            alert(data.msg);
          }
        }).catch((err) => {
          console.error(err);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .userCenter {
    position: fixed;
    top: 104px;
    width: 100%;
    height: calc(100% - 104px);
    overflow: scroll;
    z-index: 110;
    .address-head {
      height: 76px;
      width: 100%;
      background: #f0f0f0;
      line-height: 76px;
      div {
        width: 100%;
        display: inline-block;
        p {
          text-align: center;
          font-size: 26px;
          line-height: 36px;
          color: #505252;
        }
      }
    }
    .userCenter-con {
      padding: 20px;
      .myIndent, .myAddress, .myProfile, .newsletter, .download, .myPwd {
        width: 100%;
        border-bottom: 1px solid black;
        padding: 30px 0;
        overflow: hidden;
      }
      .myIndent-left {
        float: left;
        margin-top: 15px;
        i {
          font-size: 50px;
          padding: 10px 40px;
        }
      }
      .myIndent-right {
        float: left;
        position: relative;
        left: 0;
        top: 0;
        width: 75%;
        span {
          display: block;
          font-size: 26px;
          font-weight: 700;
          color: #505252;
          margin-bottom: 10px;
          line-height: 36px;
          letter-spacing: 2px;
        }
        p {
          font-size: 20px;
          font-style: italic;
          letter-spacing: 2px;
          color: #505252;
          line-height: 28px;
        }
        i {
          font-size: 28px;
          position: absolute;
          top: 30px;
          right: 0;
        }
      }
      .newsletter {
        .myIndent-right {
          width: 72.5%;
        }
      }
      .userCenter-con-bottom {
        .userCenter-con-bottom-txt {
          padding: 44px 66px;
          text-align: center;
          background: #f8f8f8;
          color: #505252;
          letter-spacing: 2px;
          p {
            font-size: 26px;
            font-weight: 700;
            line-height: 36px;
          }
          span {
            display: block;
            font-size: 22px;
            line-height: 30px;
            margin-top: 10px;
          }
        }
        .userCenter-con-bottom-btn {
          padding: 44px 66px;
          text-align: center;
          color: #505252;
          i {
            font-size: 52px;
          }
          p {
            font-size: 22px;
            line-height: 30px;
            letter-spacing: 2px;
            margin-top: 50px;
          }
        }
      }
    }
  }
</style>
