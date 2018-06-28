<template>
  <div class="container">
    <my-header :key="activeDate"></my-header>
    <!--商品切换-->
    <div v-if="goodsId" class="change" v-show="goodsId.length>1">
      <div class="prev" v-show="IdIndex>0" @click="prev">
        <a href="javascript:void(0);">
          <i class="iconfont icon-fanhui"></i>
          <span>Previous</span>
        </a>
      </div>
      <div class="next" v-show="IdIndex<goodsId.length-1" @click="next">
        <a href="javascript:void(0);">
          <span>Next</span>
          <i class="iconfont icon-tubiao_gengduo"></i>
        </a>
      </div>
    </div>
    <!--主体-->
    <div class="content" :class="{'content-one':goodsId.length<=1}">
      <!--轮播图区域-->
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(apic,index) in pic"><img @click="showImage(pic,index)" :src="apic" alt="" :key="index">
        </swiper-slide>
        <!--<swiper-slide>I'm Slide 3</swiper-slide>-->
        <!--<swiper-slide>I'm Slide 4</swiper-slide>-->
        <!--<swiper-slide>I'm Slide 5</swiper-slide>-->
        <!--<swiper-slide>I'm Slide 6</swiper-slide>-->
        <!--<swiper-slide>I'm Slide 7</swiper-slide>-->
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
        <!--<div class="swiper-button-next" slot="button-next"></div>-->
        <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
      </swiper>
      
      <!--图片详情-->
      <transition name="show">
        <div v-show="showImg" class="showImg-wrap">
          <div class="showimg" :style="showBgPic|bg">
            <div class="close" @click="showImg=!showImg">
              <span class="iconfont icon-guanbi"></span>
            </div>
            <div class="choose-wrap">
              <div class="choose-img">
                <div class="choose">
                  <ul class="img-item">
                    <li :class="{active:imgIndex==index}" @click="showBgPic=item,imgIndex=index"
                        v-for="(item,index) in showPic">
                      <img :src="item" alt="">
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      
      <!--详情-->
      <div class="detail-wrap">
        <div class="detail">
          <!--商品名-->
          <div class="product-name"><span>{{good.goodName}}</span></div>
          <!--价格-->
          <div class="product-price">
            <span class="old-price">￥{{good.oldPrice}}</span>
            <span class="new-price">￥{{good.price}}</span>
          </div>
          <!--颜色选择-->
          <div class="color-wrap">
            <p class="color">{{colors}}</p>
            <div class="color-content" v-for="(color,index) in good.attr">
              <a :class="{active:presentIndex==index}" @click="presentIndex=index" href="javascript:void(0);">
                <img :src="color.colPic" @click="changeColor(color.color,color.pics,color.colPic)" alt="color.color">
              </a>
            </div>
          </div>
          
          <div class="product-size">
            <!--尺寸选择-->
            <ul class="size">
              <li class="product-size-item" v-for="(item,index) in good.attr[0].size">
                <a :class="{select:currentIndex==index}" @click="chooseSize(item,index)"
                   href="javascript:void(0);"><span>{{item}}</span></a>
              </li>
            </ul>
            <!--尺码指南-->
            <div class="product-size-guide">
              <div class="guide">
                <a href="javascript:void(0);">尺码指南</a>
              </div>
            </div>
            <!--添加购物车-->
            <div class="addcart" :class="{hasCart:showSettle}" @click="addcart">
              <div class="cart">
                <span>添加购物车</span>
              </div>
            </div>
            <!--结算-->
            <div class="settle" v-show="showSettle">
              <div class="settlement">
                <span>去结算</span>
              </div>
            </div>
            <!--可选商品-->
            <div class="product-info">
              <div class="optional">
                <a href="javascript:void(0);"><span>店铺内可选商品</span></a>
              </div>
              <ul class="info-item">
                <!--details-->
                <li class="item">
                  <a href="javascript:void(0);">
                    <span class="mess" @click="showlist(0)">DETAILS</span>
                    <span class="more" v-if="showIndex != 0">+</span>
                    <span class="less" v-if="showIndex == 0">-</span>
                  </a>
                  <div class="info show" v-if="showIndex == 0">
                    <div class="reference same">Ref.<span>6412/520</span></div>
                    <div class="mess-detail same">{{good.details}}</div>
                    <div class="same">考虑到个人卫生安全等因素，内裤、袜类及首饰类等商品非质量问题，一律不接受退换货。</div>
                    <div class="same">&nbsp;</div>
                    <div class="same">页面显示的价<s>￥XXX</s>可能是商品的吊牌价零售价或曾展示过的销售价等，仅供参考。</div>
                    <div class="consult same"><img src="../../assets/img/Chat_Ficha.png" alt="">在线客服咨询</div>
                  </div>
                </li>
                <!--货品详情-->
                <li class="item">
                  <a href="javascript:void(0);">
                    <span class="mess" @click="showlist(1)">货品详情</span>
                    <span class="more" v-if="showIndex != 1">+</span>
                    <span class="less" v-if="showIndex == 1">-</span>
                  </a>
                  <div class="info" v-if="showIndex == 1">
                    <div class="compo">
                      <h4>外部</h4>
                      <div class="lining">
                        <span>棉 100%</span>
                      </div>
                    </div>
                    <div class="compo">
                      <h4>衬里</h4>
                      <div class="lining">
                        <span>粘纤 100%</span>
                      </div>
                    </div>
                    <div class="notice" v-for="(more,index) in good.more">
                      <img src="../../assets/img/compo1.png" alt="">
                      <span>{{more}}</span>
                    </div>
                    <!--<div class="notice">-->
                    <!--<img src="../../assets/img/compo2.png" alt="">-->
                    <!--<span>不可漂白</span>-->
                    <!--</div>-->
                    <!--<div class="notice">-->
                    <!--<img src="../../assets/img/compo3.png" alt="">-->
                    <!--<span>100℃以下熨烫</span>-->
                    <!--</div>-->
                    <!--<div class="notice">-->
                    <!--<img src="../../assets/img/compo4.png" alt="">-->
                    <!--<span>四氯乙烯干洗</span>-->
                    <!--</div>-->
                    <!--<div class="notice">-->
                    <!--<img src="../../assets/img/compo5.png" alt="">-->
                    <!--<span>不可使用烘干机</span>-->
                    <!--</div>-->
                  </div>
                </li>
                <!--确认发货信息-->
                <li class="item">
                  <a href="javascript:void(0);">
                    <span class="mess" @click="showlist(2)">确认发货信息</span>
                    <span class="more" v-if="showIndex != 2">+</span>
                    <span class="less" v-if="showIndex == 2">-</span>
                  </a>
                  <div class="info" v-if="showIndex == 2">
                    <div class="mess">
                      <h4>到店铺取货</h4>
                      <span>(免费)</span>
                      <div class="binding">
                        <span>请选择您要取货的店铺，具体到货时间请参照下表</span>
                      </div>
                    </div>
                    <div class="mess">
                      <h4>快递送货上门</h4>
                      <span>(免费)</span>
                      <div class="binding">
                        <span>请提供您要取货的店铺，具体到货时间请参照下表</span>
                      </div>
                    </div>
                  </div>
                </li>
                <!--退货-->
                <li class="item">
                  <a href="javascript:void(0);">
                    <span class="mess" @click="showlist(3)">退货</span>
                    <span class="more" v-if="showIndex != 3">+</span>
                    <span class="less" v-if="showIndex == 3">-</span>
                  </a>
                  <div class="info" v-if="showIndex == 3">
                    <div class="sales-back">
                      <h4>在商店免费退货</h4>
                      <p class="content-back">您可前往任意一家Massimo Dutti商店进行商品退货，前提是退货与购货必须为同一市场。<br>自购买之日起30天内可进行退货。</p>
                    </div>
                    <div class="sales-back">
                      <h4>免费上门提取退货</h4>
                      <p class="content-back">您可从“我的帐户”部分申请上门提取退货（不适用于寄送至商店的订单）。<br>自购买之日起30天内可进行退货。</p>
                    </div>
                    <p class="email">E-mail: contact@massimodutti.com</p>
                  </div>
                </li>
              </ul>
            </div>
            <!--帮助-->
            <div class="need-help">
              <a href="javascript:void(0);">
                <span>需要帮助吗？</span>
              </a>
            </div>
            <div class="weibo">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--添加按钮，根据滚动距离出现-->
    <transition name="addWrap">
      <div class="addition-wrap" v-show="scroll>=1960">
        <div class="addition">
          <div class="addition-name">
            <p>{{good.goodName}}</p>
            <div class="price">
              <span class="oldprice">￥{{good.oldPrice}}</span>
              <span class="newprice">￥{{good.price}}</span>
            </div>
          </div>
          <div class="add-btn" @click="addcart">
            <span>添加</span>
          </div>
        </div>
      </div>
    </transition>
    <my-foot></my-foot>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import MyHeader from '../MyHead/MyHead';
  import MyFoot from '../MyFoot/MyFoot';
  
  export default {
    name: "GoodDetail",
    components: {
      swiper,
      swiperSlide,
      MyHeader,
      MyFoot,
    },
    data() {
      return {
        //轮播图配置
        swiperOption: {
          //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          // notNextTick: true,
          observeParents: true,
          initialSlide: 0,
          autoplay: 3000,
          //分页器设置
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1;
            this.index = swiper.realIndex;
          },
        },
        //当前尺寸下标
        currentIndex: 0,
        //当前颜色图片选择下标
        presentIndex: 0,
        //结算按钮的显示
        showSettle: false,
        //图片详情的显示
        showImg: false,
        //获取商品列表的id
        // id:this.$route.query.goodId,
        // id:this.$route.params.goodId,
        Id: "",
        //获取商品列表所有的id
        goodsId: this.$route.query.goodsId,
        IdIndex: -1,
        //商品数据
        good: {},
        //颜色文本
        colors: "",
        //颜色图片
        colorPic: "",
        //根据点击不同颜色而显示的商品图片
        pic: [],
        //尺寸
        size: "",
        //商品详情当前显示的图片
        currentPic: "",
        //商品图片详情显示的图片数组
        showPic: [],
        //商品图片详情显示的背景图
        showBgPic: "",
        //商品图片详情显示的背景图下标
        imgIndex: 0,
        //滚动距离
        scroll: 0,
        // d: true,
        // h:false,
        // q:false,
        // t:false
        showIndex: 0,
        activeDate: 0,
      }
    },
    
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    
    created() {
      this.Id = this.$route.query.goodId;
      // console.log(this.goodsId);
      console.log(this.Id);
      this.getGoods(this.Id);
      this.getIndex(this.Id);
    },
    
    methods: {
      //通过商品Id获取数据
      getGoods(ID) {
        this.$axios.get(`${this.$api}/goods/detail`, {params: {goodid: ID}})
          .then(({data}) => {
            console.log(data);
            if (data.status == 1) {
              this.good = data.data;
              this.colors = this.good.attr[0].color;
              this.pic = this.good.attr[0].pics;
              this.colorPic = this.pic[0];
              this.currentPic = this.good.showPic;
              this.size = this.good.attr[0].size[0];
            }
          })
      },
      
      //获取当前商品id位于商品列表id的位置
      getIndex(id) {
        var array = this.goodsId;
        array.forEach((item, index) => {
          if (item == id) {
            this.IdIndex = index;
          }
        })
      },
      
      //添加购物车
      addcart() {
        // console.log(this.currentPic);
        // console.log(this.colorPic);
        // console.log(this.size);
        this.$axios.post(`${this.$api}/cart/add`, {
          userid: localStorage.getItem('userid'),
          // userid: '5b2b1781e2a1532578506fb9',
          goodsid: this.Id,
          goodName: this.good.goodName,
          showPic: this.currentPic,
          count: 1,
          color: this.colors,
          colPic: this.colorPic,
          size: this.size,
          oldPrice: this.good.oldPrice,
          price: this.good.price,
        })
          .then(({data}) => {
            if (data.status == 1) {
              this.activeDate = new Date();
              this.showSettle = true;
            } else {
              alert(data.msg);
            }
            // console.log(data);
          })
      },
      //改变颜色
      changeColor(Color, index, colpic) {
        this.colors = Color;
        this.pic = index;
        this.colorPic = colpic;
        // console.log(this.pic);
      },
      //点击轮播图的图片展示商品详情
      showImage(pics, index) {
        this.showImg = true;
        this.showPic = pics;
        console.log(this.showPic);
        this.showBgPic = pics[index];
        this.imgIndex = index;
        console.log(this.showBgPic);
      },
      //滚动之后显示添加按钮
      showAdd() {
        this.scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(this.scroll);
      },
      //选择尺寸
      chooseSize(item, index) {
        this.currentIndex = index;
        this.size = item;
      },
      
      //切换商品
      next() {
        console.log(this.IdIndex);
        this.IdIndex += 1;
        console.log(this.IdIndex);
        this.Id = this.goodsId[this.IdIndex];
        console.log(this.goodsId[this.IdIndex]);
        console.log(this.Id);
        this.getGoods(this.Id);
      },
      prev() {
        this.IdIndex -= 1;
        console.log(this.IdIndex);
        this.Id = this.goodsId[this.IdIndex];
        console.log(this.goodsId[this.IdIndex]);
        console.log(this.Id);
        this.getGoods(this.Id);
      },
      
      // showMess() {
      //   let ms = document.querySelectorAll('.mess');
      //   console.log(ms[1]);
      //   if(ms.innerHTML == 'DETAILS') {
      //       this.s = !this.s;
      //   }
      // },
      
      showlist(index) {
        console.log(index);
        if (this.showIndex == index) {
          this.showIndex = 5;
        } else {
          this.showIndex = index;
        }
        console.log(this.showIndex);
      }
    },
    
    filters: {
      bg(img) {
        // background-size: content;background-repeat: no-repeat;background-position: center center
        
        // return "background:url('"+img+"') no-repeat 0 0/100% 100%;";
        return "background-image:url('" + img + "');background-size: cover;background-repeat: no-repeat;background-position:  center center;";
      },
    },

//此阶段可获取真实节点
    mounted() {
      // window.onload = this.getIndex(this.id);
      // console.log(this.IdIndex);
      //添加浏览器滚动事件
      window.addEventListener('scroll', this.showAdd);
    }
  }
</script>

<style lang="less">
  /*轮播图*/
  .swiper-container {
    position: relative;
    width: 100%;
    margin-bottom: 40px;
    .swiper-slide {
      height: auto;
      img {
        margin-top: -6px;
        width: 100%;
      }
    }
    .swiper-pagination {
      position: absolute;
      left: 0;
      bottom: 20px;
      .swiper-pagination-bullet {
        width: 16px;
        height: 16px;
        display: inline-block;
        border-radius: 100%;
        background: #fff;
        margin: 0 10px;
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        opacity: 1;
        border: 1px solid #fff;
        background: transparent;
        box-sizing: border-box;
      }
    }
  }
</style>
<style lang="less" scoped>
  .container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 52222222;
    background: #fff;
  }
  
  a {
    text-decoration: none;
  }
  
  /*商品切换*/
  .change {
    margin-top: 104px;
    /*position: absolute;*/
    width: 100%;
    height: 104px;
    overflow: hidden;
    div {
      float: left;
      border-right: 1px solid #eaeaea;
      cursor: pointer;
      box-sizing: border-box;
      a {
        color: #505252;
        margin: 14.515px 20px;
        /*font-size: 22px;*/
        span {
          margin: 0 20px;
        }
        .iconfont {
          font-size: 24px;
        }
      }
    }
    .prev {
      width: 50%;
      a {
        padding: 30px 0 20px 35%;
        float: left;
      }
    }
    .next {
      width: 50%;
      float: right;
      a {
        padding: 30px 35% 20px 20px;
        float: right;
      }
      .iconfont {
        font-size: 25px;
      }
    }
  }
  
  /*主体*/
  .content-one {
    padding-top: 104px;
  }
  
  .content {
    background: #fff;
    .show-enter, .show-leave-to {
      opacity: 0;
    }
    .show-enter-active, .show-leave-active {
      transition: opacity .5s;
    }
    .show-enter-to, .show-leave {
      opacity: 1;
    }
    /*图片详情*/
    .showImg-wrap {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      overflow: hidden;
      background-color: #fff;
      .showimg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        .close {
          position: absolute;
          right: 10px;
          top: 10px;
          z-index: 100;
          width: 100px;
          height: 100px;
          text-align: center;
          line-height: 100px;
          font-size: 36px;
          font-family: FontDutti;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          .iconfont {
            font-size: 36px;
            color: #fff;
          }
        }
        .choose-wrap {
          width: 100%;
          background-color: rgba(192, 192, 192, 0.4);
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 100;
          .choose-img {
            padding: 30px;
            height: 158px;
            .choose {
              max-height: 160px;
              
              max-width: 700px;
              background-color: transparent;
              .img-item {
                overflow-x: scroll;
                overflow-y: hidden;
                white-space: nowrap;
                height: 160px;
                li {
                  display: inline-block;
                  position: relative;
                  width: 160px;
                  margin-right: 16px;
                  max-width: 120px;
                  z-index: 200;
                  max-height: 160px;
                  box-sizing: border-box;
                  border: 2px solid #999;
                  
                  img {
                    display: block;
                    width: 100%;
                  }
                  &.active {
                    border: 2px solid #505252;
                  }
                }
              }
            }
          }
        }
        
      }
    }
    /*商品详情*/
    .detail-wrap {
      float: left;
      position: relative;
      width: 100%;
      margin-top: 20px;
      background: #fff;
      .detail {
        float: left;
        display: inline-block;
        text-align: center;
        padding: 0px 40px 80px 40px;
        /*商品名称*/
        .product-name {
          width: 100%;
          line-height: 40px;
          span {
            font-size: 28px;
            letter-spacing: 4px;
            color: #505252;
          }
        }
        /*商品价格*/
        .product-price {
          font-size: 26px;
          color: #848686;
          margin: 20px 40px 40px;
          line-height: 30px;
          span {
            display: inline-block;
          }
          .old-price {
            text-decoration: line-through;
          }
          .new-price {
            color: #fe4342;
            margin-left: 10px;
          }
        }
        /*商品颜色*/
        .color-wrap {
          width: 100%;
          padding: 0 20px;
          padding-bottom: 30px;
          font-size: 26px;
          text-align: center;
          color: #505252;
          .color {
            letter-spacing: 2px;
            margin-bottom: 20px;
            
          }
          .color-content {
            display: inline-block;
            a {
              display: inline-block;
              margin: 0 8px;
              padding-bottom: 20px;
              box-sizing: border-box;
              &.active {
                border-bottom: 1px solid #505252;
              }
              img {
                display: block;
                width: 60px;
                height: 60px;
                border: 1px solid #e2e2e2;
              }
            }
            
          }
        }
        /*商品尺寸*/
        .product-size {
          .size {
            float: left;
            width: 100%;
            letter-spacing: 2px;
            color: #505252;
            font-size: 26px;
            margin-bottom: 40px;
            
            .product-size-item {
              float: none;
              width: auto;
              height: auto;
              display: inline-block;
              a {
                display: inline-block;
                padding: 20px;
                text-align: center;
                margin: 0 20px;
                color: #505252;
                box-sizing: border-box;
                &.select {
                  font-weight: bold;
                  border-bottom: 1px solid #505252;
                }
              }
            }
          }
        }
        .product-size-guide {
          float: left;
          width: 100%;
          padding-top: 40px;
          margin-bottom: 40px;
          border-top: 1px solid #eaeaea;
          .guide {
            display: inline-block;
            padding: 4px 24px;
            a {
              width: 50%;
              text-align: center;
              cursor: pointer;
              letter-spacing: 2px;
              color: #505252;
            }
          }
        }
        /*添加购物车*/
        .addcart {
          float: left;
          width: 100%;
          min-height: 80px;
          letter-spacing: 4px;
          color: #fff;
          font-size: 26px;
          line-height: 30px;
          text-align: center;
          background-color: #b99d6b;
          border: none;
          .cart {
            padding: 24px 28px;
          }
        }
        .hasCart {
          background-color: #848686;
          border-color: #848686;
        }
        /*结算*/
        .settle {
          float: left;
          width: 100%;
          min-height: 80px;
          letter-spacing: 4px;
          font-size: 26px;
          color: #fff;
          line-height: 30px;
          text-align: center;
          background-color: #b99d6b;
          border: none;
          margin-top: 20px;
          .settlement {
            padding: 24px 28px;
          }
        }
        /*可选商品*/
        .product-info {
          float: left;
          width: 100%;
          .optional {
            margin: 80px 0 40px 0;
            text-align: center;
            font-size: 26px;
            line-height: 1.42857143;
            a {
              color: #505252;
            }
          }
        }
        .info-item {
          float: left;
          width: 100%;
          padding: 20px 0 40px 0;
          font-size: 26px;
          .item {
            position: relative;
            width: 100%;
            border-bottom: 1px solid #eaeaea;
            box-sizing: border-box;
            display: table;
            a {
              color: #505252;
              span {
                float: left;
                letter-spacing: 4px;
                padding: 32px 0;
                width: 100%;
              }
              .more, .less {
                position: absolute;
                right: 0;
                width: 36px;
                text-align: right;
              }
            }
            .info {
              width: 100%;
              overflow: hidden;
              text-align: left;
              padding-bottom: 40px;
              letter-spacing: 2px;
              color: #505252;
              line-height: 1.42857143;
              .same {
                margin-bottom: 20px;
              }
              .consult {
                text-align: center;
                vertical-align: middle;
                img {
                  width: 6%;
                  vertical-align: middle;
                }
              }
              .reference {
                span {
                  /*font-weight: bold;*/
                }
              }
              h4 {
                display: inline-block;
                font-size: 24px;
                font-weight: bold;
                margin-top: 11px;
                padding-right: 20px;
                margin-bottom: 20px;
                line-height: 1.1;
              }
              /*details*/
              .compo {
                margin-bottom: 20px;
                padding: 0 0 20px 20px;
              }
              /*货品详情*/
              .notice {
                padding: 10px 0;
                float: left;
                width: 100%;
                img {
                  width: 38px;
                  vertical-align: middle;
                  padding: 0 20px;
                  float: left;
                }
              }
              /*确认发货信息*/
              .mess {
                margin: 20px 0;
                padding: 0 0 20px 20px;
                
              }
              /*退货*/
              .sales-back {
                padding: 20px 0 40px 0;
                float: left;
                p {
                  margin-bottom: 20px;
                  letter-spacing: 2px;
                }
              }
              .email {
                margin-bottom: 20px;
                letter-spacing: 2px;
              }
            }
            .show {
              display: block;
            }
          }
        }
        /*帮助*/
        .need-help {
          float: left;
          width: 100%;
          font-size: 26px;
          line-height: 1.42857143;
          padding-bottom: 40px;
          text-align: center;
          a {
            letter-spacing: 2px;
            color: #505252;
          }
        }
      }
    }
  }
  
  .addWrap-enter, .addWrap-leave-to {
    transform: translateY(-104px);
  }
  
  .addWrap-enter-active, .addWrap-leave-active {
    transition: transform .5s;
  }
  
  .addWrap-enter-to, .addWrap-leave {
    transform: translateY(0);
  }
  
  .addition-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 50000000;
    font-size: 26px;
    .addition {
      padding: 28px 40px 12px;
      .addition-name {
        width: 70%;
        line-height: 32px;
        .oldprice {
          text-decoration: line-through;
          color: #848686;
          font-weight: bold;
        }
        .newprice {
          color: #fe4342;
          margin-left: 10px;
          font-weight: bold;
        }
      }
      .add-btn {
        position: absolute;
        z-index: 50001;
        top: 15px;
        right: 40px;
        width: 27%;
        text-align: center;
        font-weight: 300;
        line-height: 1.5;
        color: #fff;
        padding: 20px 0;
        letter-spacing: 4px;
        background: #b99d6b;
      }
    }
  }
</style>

