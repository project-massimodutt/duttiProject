<template>
    <div class="container" >
      <my-head></my-head>
      <!--商品列表-->
      <section class="category-page">

        <!--筛选器区域-->
        <div class="filtrate-wrap">
          <!--筛选器-->
          <div class="filtrate">
            <a href="javascript:void(0);" @click="Filtrate"><span>筛选器</span></a>
          </div>
        </div>

        <!--商品列表区域-->
        <div class="product-list-wrap" ref="goodWrap">

          <!--商品列表-->
          <good-list ref="goodList" :goods="good"></good-list>

          <!--分类-->
          <div class="classify-nav">
            <div class="nav-prev nav" @click="getTagPrev" v-show="tagIndex>0">
              <a href="javascript:void(0);">
                <div class="prev">
                  <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="mess">
                  <p class="title">{{tags.tag1}}</p>
                  <p class="name">{{tags.tag2[tagIndex-1]}}</p>
                </div>
              </a>
            </div>
            <div class="nav-next nav" @click="getTagNext" v-show="tagIndex<tags.tag2.length-1">
              <a href="javascript:void(0);">
                <div class="mess">
                  <p class="title">{{tags.tag1}}</p>
                  <p class="name">{{tags.tag2[tagIndex+1]}}</p>
                </div>
                <div class="next">
                  <i class="iconfont icon-combinedshapefuben"></i>
                </div>
              </a>
            </div>
          </div>
          <!--介绍-->
          <!--<div class="intro-wrap">-->
            <!--<div class="intro">-->
              <!--<div class="intro-main">-->
                <!--<h1 class="intro-title">{{tags.tag1}} - {{tags.tag2[getTagIndex]}}</h1>-->
                <!--<p class="intro-con">折扣 - 女士荷叶边、天鹅绒布、不对称、条纹、高腰、格子、铅笔裙、OL半身裙、皮短裙、牛仔长裙、碎花长裙、百褶短裙、半身裙、牛仔A字裙或黑色百褶裙。</p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </section>
      <transition name="scrollY">
        <div class="goUp" @click="goUp" v-show="scrollTop>=500">
          <i class="iconfont icon-arrow-up"></i>
        </div>
      </transition>
      <filtrate ref="filtrate"></filtrate>
      <my-foot></my-foot>
    </div>
</template>

<script>
  import MyHead from "../components/MyHead/MyHead";
  import MyFoot from "../components/MyFoot/MyFoot";
  import GoodList from "../components/Goods/GoodList";
  import Filtrate from "../components/Goods/Filtrate";
  export default {
    ame: "Good",
    data() {
      return{
        //商品列表
        good:this.$store.state.goodsList,
        //当前标签所在标签的集合
        tags:{},
        //当前的标签
        tag:[],
        //当前标签的下标
        tagIndex:0,
        //点击标签
        tagArr:[],
        //过滤器文本显示
        showFilter:false,
        //滚动距离
        scrollTop:0,
      }
    },

    components:{
      MyHead,
      MyFoot,
      GoodList,
      Filtrate,
    },

    created () {
      this.tags = this.$store.state.tagList;
      this.tag = this.$store.state.tag;
      this.getTagIndex();
      console.log(this.tagIndex)
      console.log(this.tags.tag2.length);
    },

    methods:{
      //过滤器的显示
      Filtrate () {
        this.$refs.filtrate.show();
      },

      //滚动
      Scroll () {
         this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      },

      //返回顶部
      goUp () {
        var timer = setInterval(() => {
          var top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          var speed = Math.floor(-top / 6);
          document.documentElement.scrollTop = document.body.scrollTop = top + speed;
          if(top == 0) {
            clearInterval(timer);
          }
        },20)
      },
      //遍历当前标签所处标签集合，获得当前标签的下标
      getTagIndex () {
        this.tags.tag2.forEach((item,index) => {
          if(this.tag[1] == item) {
            this.tagIndex = index;
            // return index;
          }
        })
      },
      changeTag(Arr) {
        this.$axios.get("/api/goods/tag",{params:{tag:Arr}})
          .then(({data}) => {
            if (data.status==1) {
              console.log(data);
              this.good = data.data;
            } else {
              alert(data.msg);
            }
          })
      },
      //上一个标签
      getTagPrev() {
        this.tagIndex -= 1;
        this.tagArr[0] = this.tags.tag1;
        this.tagArr[1] = this.tags.tag2[this.tagIndex];
        console.log(this.tagArr);
        this.changeTag(this.tagArr);
      },
      //下一个标签
      getTagNext() {
        this.tagIndex += 1;
        this.tagArr[0] = this.tags.tag1;
        this.tagArr[1] = this.tags.tag2[this.tagIndex];
        console.log(this.tagArr);
        this.changeTag(this.tagArr);
      },
    },
    //此阶段可获取真实节点
    mounted() {
      window.addEventListener('scroll',this.Scroll);
    }
  }
</script>

<style lang="less" scoped>
  a {
    text-decoration: none;
    color: #505252;
  }
  .category-page {
    width: 100%;
    margin-top: 104px;
    /*筛选区域*/
    .filtrate-wrap {
      position: fixed;
      width: 100%;
      height: 80px;
      background: #fff;
      font-size: 22px;
      overflow: hidden;
      z-index: 200;

      /*筛选*/
      .filtrate {
        text-align: right;
        padding-right: 20px;
        a {
          display: inline-block;
          padding: 30px 0;
          letter-spacing: 2px;
        }
      }
    }

    /*商品列表区域*/
    .product-list-wrap {
      width: 100%;
      padding-top: 80px;
      /*分类按钮*/
      .classify-nav {
        margin-right: -20px;
        width: 100%;
        overflow: hidden;
        .nav {
          float: left;
          overflow: hidden;
          width: 50%;
          height: 100px;
          background: #eaeaea;
          box-sizing: border-box;
          a {
            display: block;
            padding: 16px 20px;
            div {
              display: inline-block;
            }
            .prev,.next {
              width: 46px;
              height: 52px;
              text-align: center;
              line-height: 52px;
              vertical-align: middle;
            }
            .mess {
              padding: 0 20px;
              vertical-align: middle;
              p {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                line-height: 36px;
              }
            }
          }
        }
        .nav-prev {

          border-right: 4px solid #fff;

        }
        .nav-next {
          float: right;

          border-left: 4px solid #fff;
          text-align: right;
        }
      }
      /*介绍*/
      .intro-wrap {
        width: 100%;
        .intro {
          overflow: hidden;
          padding: 0 30px;
          .intro-main {
            padding: 0 20px;
            font-size: 22px;
            letter-spacing: 2px;
            color: #505252;
            .intro-title {
              line-height: 50px;
              font-weight: bold;
              margin-top: 22px;
            }
            .intro-con {
              line-height: 1.42857143;
            }
          }
        }
      }
    }
  }
  /*返回顶部按钮*/
  .scrollY-enter,.scrollY-leave-to {
    transform: translateY(52px);
  }
  .scrollY-enter-active,.scrollY-leave-active {
    transition: transform .5s;
  }
  .scrollY-enter-to,.scrollY-leave {
    transform: translateY(0);
  }
  .goUp {
    position: fixed;
    width: 96px;
    height: 52px;
    right: 0;
    bottom: 0;
    text-align: center;
    background: rgba(220,220,220,0.5);
    i {
      font-size: 22px;
      line-height: 52px;
    }
  }
</style>
