<template>
    <div>
      <my-header></my-header>
      <div class="header-container">
        <!-- 头部 -->
        <div class="header-top">
          <span @click="helpBack"><i class="iconfont icon-fanhui"></i></span>
          <p>帮助</p>
        </div>
        <!-- 内容区 -->
        <section class="header-content">
          <article class="article-wrapper">
              <div class="inline">
                <span>常见问题</span>
                <span><i class="iconfont icon-tubiao_gengduo"></i></span>
              </div>
            <div class="inline">
              <span>一般信息</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>
            <div class="inline">
              <span>如何购买</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>
            <div class="inline">
              <span>无注册购买</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>
            <div class="inline">
              <span>注册</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>
            <div class="inline">
              <span>运输和退货</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>
            <div class="inline">
              <span>退货</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>
            <div class="inline">
              <span>付款</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>
            <div class="inline">
              <span>量身定制</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>
            <div class="inline">
              <span>腕表类</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>
            <div class="inline">
              <span>鞋类</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>
            <div class="inline">
              <span>政策</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>
            <div class="inline">
              <span>关于COOKIES的信息</span>
              <span><i class="iconfont icon-tubiao_gengduo"></i></span>
            </div>

          </article>
        </section>

      </div>
      <my-footer></my-footer>
    </div>
</template>

<script>
    import myHeader from "../components/MyHead/MyHead"
    import myFooter from "../components/MyFoot/MyFoot"
    export default {
      name: "help",
      components:{
        myHeader,
        myFooter,
      },
      methods: {
        helpBack() {
          this.$router.push({
            name: 'Index'
          })
        }
      }
    }
</script>

<style lang="less" scoped>
  .header-container{
    font-family: "lato","lato-int",Arial,sans-serif;
    color: #505252;
    .header-top{
      position: relative;
      margin-top: 104px;
      text-align: center;
      background: #f0f0f0;
      padding: 10px;
      span{
        display: inline-block;
        .iconfont{
          display: inline-block;
          margin-left: -600px;
          padding: 10px;
          font-size: 40px;
        }
      }
      p{
        display: inline-block;
        font-size: 26px;
      }
    }
    .header-content{
      height: auto;
      .article-wrapper{
        width: 650px;
        margin: 0 auto;
        margin-top: 38px;
        height: auto;
        .inline{
          width: 100%;
          padding:42px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          vertical-align: middle;
          font-style: italic;
          font-weight: bold;
          text-transform: uppercase;
          color: #848686;
          border-bottom: 1px solid #eaeaea;
          span{
            display: inline-block;
            vertical-align: middle;
            .iconfont{
              font-size: 36px;
            }
          }
          &:last-child{
            margin-bottom: -59px;
          }
        }
      }
    }
  }

</style>
