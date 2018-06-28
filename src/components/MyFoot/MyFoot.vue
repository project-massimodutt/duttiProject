<template>
  <div class="footer">
    <div class="footer-email">
      <div class="email">
        <i class="iconfont icon-jiedianyoujian"></i>
        <span>NEWSLETTER</span>
      </div>
      <div class="apply">
        <i class="iconfont icon-shouji"></i>
        <span>下载应用</span>
      </div>
    </div>
    <div class="btn-container">
      <div class="entity-shop">
        <i class="iconfont icon-dibiaotianchong"></i>
        <span>实体门店</span>
      </div>
      <div class="help">
        <i class="iconfont icon-bangzhuwenhao2"></i>
        <span>帮助</span>
      </div>
    </div>
    <div class="weibo-wechat-wrapper">
      <div class="weibo">
        <p>微博扫一扫</p>
        <img src="http://static.massimodutti.cn/3/static2/itxstandard/images/footer/weibo.png?20161011035824" alt="">
      </div>
      <div class="wechat">
        <p>微信扫一扫</p>
        <img src="http://static.massimodutti.cn/3/static2/itxstandard/images/footer/weibo.png?20161011035824" alt="">
      </div>
    </div>
    <div class="footer-legal">
      <ul>
        <li>
          <i class="icon"></i>
          <span>上海工商</span>
        </li>
        <li>
          <i class="icon2"></i>
          <span>沪公网安备 31010502001467号</span>
        </li>
        <li>
          <span>沪ICP备12030822号-3</span>
        </li>
      </ul>
    </div>
    <div class="privacy">
      <p>隐私政策</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyFoot"
  }
</script>

<style  lang="less" scoped>
  .iconfont{
    color: rgb(63,65,65);
  }
  .footer{
    font-family: "lato","lato-int",Arial,sans-serif;
    /*position: fixed;*/
    font-size: 26px;
    letter-spacing: 2px;
    /*bottom: 0;*/
    margin-top: 60px;
    height: 952px;
    width: 100%;
    color: #505252;
    background-color: #f7f7f7;
    .footer-email{
      text-align: center;
      padding:90px 0;
      .email{
        color: #505252;
        .iconfont{
          font-size: 36px;
          margin-right: 24px;
          vertical-align: middle;
        }
        span{
          vertical-align: middle;
        }
      }
      .apply{
        margin-top: 78px;
        .iconfont{
          font-size: 28px;
          margin-right: 8px;
          vertical-align: middle;
        }
        span{
          vertical-align: middle;
        }
      }
    }
    .btn-container{
      border-top: 1px solid #eaeaea;
      padding: 90px 0 64px 0;
      display: inline-block;
      width: 100%;
      .entity-shop, .help{
        float: left;
        width: 50%;
        text-align: center;
        .iconfont{
          font-size: 24px;
          margin-right: 16px;
        }
      }
    }
    .weibo-wechat-wrapper{
      background: #505252;
      color: #fff;
      width: 100%;
      overflow-x: hidden;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .weibo,.wechat{
        padding-top: 40px;
        text-align: center;
        width: 220px;
        height: 160px;
        p{
          margin-bottom: 30px;
        }
        img{
          width: 58px;
        }
      }
      .weibo{
        margin:0 36px 0 28px;
      }
    }
    .footer-legal{
      padding:0 50px;
      font-size: 24px;
      li{
        width: auto;
        margin: 24px 40px 10px 0;
        .icon, .icon2{
          width: 16px;
          height: 16px;
          display: inline-block;
          vertical-align: middle;
          background-repeat: no-repeat;
          transform: scale(2);
          margin-right: 16px;
        }
        .icon{
          background-image: url("iconos_china4.png");
          background-position: 0 -16px;
        }
        .icon2{
          background-image: url("iconos_china4.png");
          background-position: 0 -32px;
        }
        span{
          vertical-align: middle;
        }
      }
    }
    .privacy {
      width: 100%;
      border-top: 1px solid #eaeaea;
      box-sizing: border-box;
      background: white;
      margin-top: 32px;
      padding: 20px 38px;
    }
  }
</style>
