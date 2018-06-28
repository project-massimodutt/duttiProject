<template>
  <div>
    <transition name="showFil">
      <div class="filtrate-wrap" v-show="showFilter">
        <!--筛选器标题-->
        <div class="title">
          <h2>筛选器</h2>
          <i class="iconfont icon-guanbi" @click="showFilter=!showFilter"></i>
        </div>
        <!--主体-->
        <div class="content">
          <ul>
            <li v-for="item in 7" class="classify-sliderbar">
              <a href="javascript:void(0);">
                <span class="classify">顺序</span>
                <span class="unfold">+</span>
              </a>
            </li>
          </ul>
        </div>
        <!--底部-->
        <div class="footer-wrap">
          <div class="footer">
            <div class="left"><button>清除</button></div>
            <div class="right"><button>应用</button></div>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    export default {
      name: "Filtrate",
      data () {
        return {
          showFilter:false,
        }
      },
      methods: {
        show () {
          this.showFilter = true;
        }
      }
    }
</script>

<style lang="less" scoped>
  .showFil-enter,.showFil-leave-to {
    opacity: 0;
  }
  .showFil-enter-active,.showFil-leave-active {
    transition: opacity .5s;
  }
  .showFil-enter-to,.showFil-leave {
    opacity: 1;
  }
  a {
    text-decoration: none;

  }
  .filtrate-wrap {
    font-family: "lato","lato-int",Arial,sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 500000000;
    background: #fff;
    color: #505252;
    /*标题*/
    .title {
      width: 100%;
      text-align: center;
      height: 102px;
      border-bottom: 1px solid #eaeaea;
      h2 {
        display: inline-block;
        width: 550px;
        height: 100%;
        line-height: 102px;
        font-size: 28px;
        letter-spacing: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      .iconfont {
        position: absolute;
        top: 30px;
        right: 40px;
        cursor: pointer;
        width: 100px;
        font-size: 28px;
      }
    }
    /*主体*/
    .content {
      width: 100%;
      padding: 102px 0 136px;
      ul {
        .classify-sliderbar{
          width: 100%;
          a {
            display: block;
            padding: 0 30px 0 50px;
            color: #505252;
            height: 120px;
            font-size: 22px;
            border-bottom: 1px solid #eaeaea;
            .classify {
              line-height: 120px;
              vertical-align: middle;
            }
            .unfold{
              float: right;
              padding: 48px 0;
              width: 36px;
              font-size: 24px;
              text-align: center;

            }
          }

        }
      }
    }
    /*底部*/
    .footer-wrap {
      position: absolute;
      background: #eaeaea;
      width: 100%;
      bottom: 0;
      .footer {
        padding: 30px;
        overflow: hidden;
        .left,.right {
          float: left;
          width: 44%;
          padding: 0 20px;

          button {
            width: 100%;
            display: block;
            float: left;
            outline: none;
            border: none;
            disabled:disabled;
            text-align: center;
            border: 1px solid transparent;
            padding: 26px 30px;
            color: #fff;
          }
        }
        .left>button {
          background: rgb(80,82,82);
        }
        .right>button {
          background: rgb(187,157,111);
        }
      }
    }
  }
</style>
