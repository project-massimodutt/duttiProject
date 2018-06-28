<template>
  <div class="header-wrapper">
    <div class="header">
      <div class="headerLeft" v-show="showHeaderBtn" @click="goToLast">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <transition name="iconRotate">
        <div class="header-left" v-show="!showHeaderBtn">
          <i :class="[rotate?'iconfont icon-menu2 go':'iconfont icon-guanbi back']" @click="sliderShow"></i>
        </div>
      </transition>
      <div class="header-center" @click="indexBack"></div>
      <div class="header-right">
        <div class="header-search" @click="goCart">
          <i class="iconfont icon-gouwuche"></i>
          <div class="cart-count" v-show="count>0">{{getCount()}}</div>
        </div>
        <div class="header-shopping-cart" @click="searchDetail">
          <i class="iconfont icon-suosou"></i>
        </div>
      </div>
    </div>
    <!-- 左侧边栏 -->
    <transition name="showSlidebar">
      <div class="header-left-wrapper" v-show="showSliderbar">
        <div class="account" @click="showAccount">
          <span>我的账户</span>
          <i class="iconfont icon-yonghu"></i>
        </div>
        <ul class="left-sliderbar">
          <li v-for="(item,index) in navs" class="classify-sliderbar" @click="navShow(index,item,navs)" :class="{
active:item.show,isClick:item.show}">
            <span>{{item.tag1}}</span>
            <span class="unfold" ref="mark">{{item.show ? '-' : '+'}}</span>
            <ul class="goods-classify" :class="{bgCor:item.show}" v-show="item.show">
              <li class="nav2" v-for="item1 in item.tags" @click.stop="">{{item1.tag2}}
                <ul class="nav3">
                  <li v-for="item2 in item1.tag3" @click.stop="showGoods(item1.tag2,item2,item)">{{item2}}
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <span>帮助</span>
            <i class="iconfont icon-yiwen"></i>
          </li>
          <li>
            <span>实体门店</span>
            <i class="iconfont icon-dibiaotianchong"></i>
          </li>
          <li>
            <span>新闻通讯</span>
            <i class="iconfont icon-shouji"></i>
          </li>
          <li>
            <span>改变市场/或语言</span>
            <i class="iconfont icon-diqiu"></i>
          </li>
          <li>
            <span>下载应用</span>
            <i class="iconfont icon-shouji"></i>
          </li>
          <li>
            <span>公司</span>
            <i class="iconfont icon-gongsi"></i>
          </li>
          <li>
            <span>联系我们</span>
            <i class="iconfont icon-dianhua"></i>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "MyHead",
    data() {
      return {
        showSliderbar: false,
        rotate: true,
        navs: [],
        tagArr:[],
        tags:{},
        navsNext: [],
        showHeaderBtn: false,
        count:0,
      }
    },
    created() {
      this.$axios.get("/api/index/tagList2")
        .then(({data}) => {
          if (data.status == 1) {
            this.navs = data.data;
          } else {
            alert(data.msg);
          }
        }).catch((err) => {
        console.error(err);
      })
      if (this.$route.path == "/goodDetail" || this.$route.path == "/good") {
        this.showHeaderBtn = true;
      } else {
        this.showHeaderBtn = false;
      }
    },
    methods: {
      showAccount() {
        if (!localStorage.getItem('userid')) {
          this.$router.push({
            name: 'Login'
          })
        } else {
          this.$router.push({
            name: 'UserCenter'
          })
        }
      },
      sliderShow() {
        this.showSliderbar = !this.showSliderbar;
        this.rotate = !this.rotate;
      },
      navShow(index,item,navs) {
        console.log(item);
        this.navs.forEach((item, i) => {
          // console.log(item);
          if (i == index) {
            if (item.show == undefined) {
              this.$set(item, 'show', true);
              let a = document.querySelector('.goods-classify');
            } else {
              item.show = !item.show;
            }
          } else {
            if (item.show == undefined) {
              this.$set(item, 'show', false);
            } else {
              item.show = false;
            }
          }
        })
        item.tags.forEach((every,n) => {
          console.log(every);
        })
        this.$set(this.tags,'tag1',item.tag1);
        this.tagArr[0] = item.tag1;
        console.log(this.tagArr);
      },
      // 标签详情商品
      showGoods(tag,item2,item) {
        console.log(item);
        item.tags.forEach((every) => {
          console.log(every);
          if(every.tag2 == tag) {
            console.log(every.tag3);
            this.$set(this.tags,'tag2',every.tag3);
          }
        })
        console.log(this.tags);
        localStorage.setItem('tagList', JSON.stringify(this.tags));

        this.tagArr[1] = item2;
        localStorage.setItem('tag', JSON.stringify(this.tagArr));
        this.$router.push({
          name: 'Good'
        })
      },
      searchDetail() {
        this.$router.push({
          name: 'GoodSearch'
        })
      },
      indexBack() {
        this.$router.push({
          name: 'Index'
        })
      },
      goToLast() {
        this.$router.go(-1);
      },
      goCart () {
        this.$router.push({
          name: 'ShoppingCart'
        })
      },
      getCount() {
        let userid = localStorage.getItem('userid');
        if (userid) {
          this.$axios.get(`${this.$api}/user/cart?userid=${userid}`).then(({data}) => {
            if (data.status==1) {
              this.count = data.data.length;
            } else {
              localStorage.removeItem('userid');
              localStorage.removeItem('username');
            }
          }).catch(err => {
            console.error(err);
          })
        }
        return this.count;
      }
    },
  }
</script>

<style lang="less" scoped>
  .iconfont {
    font-size: 36px;
    color: #505252;
  }
  .header-wrapper {
    letter-spacing: 2px;
    .header {
      position: fixed;
      top: 0;
      width: 100%;
      height: 104px;
      background: rgb(255, 255, 255);
      z-index: 500;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      .headerLeft {
        display: inline-block;
        padding: 33px;
      }
      .header-left {
        float: left;
        font-size: 24px;
        padding: 34px 28px;
        i {
          display: inline-block;
        }
        .go {
          opacity: 1;
          transform: rotate(0deg);
          transition: all .3s linear;
        }
        .back {
          opacity: 1;
          transform: rotate(90deg);
          transition: all .3s linear;
        }
      }
      .header-center {
        width: 300px;
        height: 42px;
        position: absolute;
        left: 50%;
        top: 38px;
        margin-left: -150px;
        background: url("logo.png") no-repeat;
        background-size: 100% 100%;
      }
      .header-right {
        float: right;
        width: auto;
        .header-search, .header-shopping-cart {
          position: relative;
          float: right;
          padding: 34px 28px;
        }
        .cart-count {
          display: inline-block;
          position: absolute;
          top: 46px;
          left: 6px;
          background: #ba9e68;
          width: 36px;
          height: 36px;
          color: #fff;
          font-size: 20px;
          text-align: center;
          line-height: 36px;
          border-radius: 50%;

        }
      }
    }
    .header-left-wrapper {
      position: fixed;
      top: 104px;
      width: 100%;
      height: 100%;
      background: rgb(255, 255, 255);
      z-index: 500;
      color: #505252;
      font-size: 24px;
      overflow: auto;
      &.showSlidebar-enter-active {
        animation: pull-in .3s;
      }
      &.showSlidebar-leave-active {
        animation: pull-out .3s;
      }
      @keyframes pull-in {
        0% {
          left: -100%;
        }
        100% {
          left: 0%;
        }
      }
      @keyframes pull-out {
        0% {
          left: 0;
        }
        100% {
          left: -100%;
        }
      }
      .account {
        width: 92%;
        background: #eaeaea;
        float: left;
        padding: 47px 20px 47px 40px;
        position: relative;
        /*text-transform: uppercase;*/
        .iconfont {
          position: absolute;
          right: 74px;
          top: 40px;
        }
      }
      .left-sliderbar {
        .classify-sliderbar {
          &:nth-child(1) {
            margin-top: 118px;
            color: red;
          }
          span {
            font-size: 24px;
          }
          .unfold {
            float: right;
            font-size: 24px;
            margin-right: 52px;
          }
          .goods-classify {
            position: relative;
            left: -40px;
            width: 108%;
            padding: 0;
            li {
              font-size: 24px;
              margin-top: 50px;
              padding: 0 20px 68px;
              margin-bottom: -80px;
              border: none;
              .nav3 {
                margin-left: -20px;
                font-weight: normal;
              }
            }
            .nav2 {
              padding-top: 46px;
              padding-left: 60px;
              font-weight: bold;
              &:nth-child(1) {
                color: red;
              }
            }
          }
          .bgCor {
            background: rgb(255, 255, 255);
          }
        }
        .isClick {
          background: rgb(246, 246, 246);
          font-weight: bold;
        }

        li {
          position: relative;
          padding: 46px 20px 46px 40px;
          border-bottom: 1px solid #eaeaea;
          &:last-child {
            margin-bottom: 300px;
          }
          .iconfont {
            position: absolute;
            right: 80px;
            top: 40px;
          }
        }
      }
    }
  }
</style>
