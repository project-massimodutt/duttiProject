<template>
  <div>
    <my-head></my-head>
    <div class="myIndent">
      <!--订单-->
      <div v-if="isCon" class="myIndent-con-box1" ref="indentCon">
        <div class="myIndent-con" >
          <div class="myIndent-head">
            <i @click="back"  class="iconfont icon-fanhui"></i>
            <div>
              <p>我的订单</p>
            </div>
          </div>
          <ul>
            <li v-for="item in indexData">
              <div @click="show(item)" class="indent">
                <div class="indent-left">
                  <img :src="item.goods[0].showPic" alt="">
                </div>
                <div class="indent-right">
                  <p>{{item.orderNum}}</p>
                  <p>21 / 06 / 2018</p>
                  <p>¥ {{money(item)}}</p>
                  <p>1 产品</p>
                </div>
                <div class="indent-bottom">
                  <p>pq {{item.status}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--订单明细-->
      <div v-if="isConver"  class="myIndent-cover-box" ref="cover">
        <div class="myIndent-cover">
          <!--上中部分-->
          <div class="myIndent-head">
            <i @click="show2" class="iconfont icon-fanhui"></i>
            <div>
              <p>订单明细</p>
            </div>
          </div>
          <div class="myIndent-cover-mid-box">
            <div class="myIndent-cover-mid">
              <div class="mid-a1">
                <p>订单号</p>
                <span>{{itemData.orderNum}}</span>
              </div>
              <div class="mid-a1">
                <p>购买日期</p>
                <span>21/06/2018</span>
              </div>
              <div class="mid-a1">
                <p>支付</p>
                <span>Alipay_Mobile</span>
              </div>
              <div class="mid-a1">
                <p>状态</p>
                <span style="color: #b99d6b">{{itemData.status}}</span>
              </div>
              <div class="mid-a1">
                <p>发货</p>
                <span>快递当日送货上门</span>
              </div>
            </div>
          </div>
          <div class="myIndent-cover-mid-express">
            <div class="express-a1">
              <div class="express-a1-left">
                <span></span>
                <i class="iconfont icon-htmal5icon22"></i>
                <div></div>
              </div>
              <div class="express-a1-right express-a1-right-con">
                <p>已确认</p>
              </div>
            </div>
            <div class="express-a1">
              <div class="express-a1-left express-a1-left-con">
                <span></span>
                <i class="iconfont icon-htmal5icon22"></i>
                <div></div>
              </div>
              <div class="express-a1-right express-a1-left-con">
                <p>运输中</p>
              </div>
            </div>
            <div class="express-a1">
              <div class="express-a1-left express-a1-left-con">
                <span></span>
                <i class="iconfont icon-htmal5icon22"></i>
                <div></div>
              </div>
              <div class="express-a1-right">
                <p>配送中</p>
              </div>
            </div>
            <div style="border-bottom: 1px solid gray" class="express-a1">
              <div class="express-a1-left express-a1-left-con">
                <span></span>
                <i class="iconfont icon-htmal5icon22"></i>
              </div>
              <div class="express-a1-right-bottom">
                <div>
                  <p>已交货</p>
                  <p>上海松江区泗泾镇九干路168号,丽德创业园蓝鸥科技前台</p>
                  <p>201600 上海市 松江区</p>
                  <p>预计交货日期:2018-06-023 09:57:53:53</p>
                </div>
              </div>
            </div>
          </div>
          <!--产品-->
          <div class="myIndent-product">
            <div class="myIndent-product-head">
              <h2>1 产品</h2>
              <i v-if="isIshow" @click="xian" class="iconfont icon-arrow-up"></i>
              <i v-if="isIhied" @click="xian" class="iconfont icon-arrow-down"></i>
            </div>
            <div v-if="isIhied" v-for="data in itemData.goods" class="myIndent-product-con">
              <div class="myIndent-product-con-img">
                <img :src="data.showPic" alt="">
              </div>
              <div class="myIndent-product-con-right">
                <div class="product-right">
                  <div>{{data.goodName}}</div>
                  <div class="product-colour">
                    <p>{{data.color}}</p>
                    <img :src="data.colPic" alt="">
                  </div>
                  <p>尺码 <span>{{data.size}}</span></p>
                </div>
                <div class="product-right-bottom">
                  <p>数量<span>{{data.count}}</span></p>
                  <p>¥ {{data.price}}</p>
                </div>
              </div>
            </div>
          </div>
          <!--COMPLETE ORDER-->
          <div class="myIndent-com">
            <div class="myIndent-com-head">
              <h2>COMPLETE ORDER</h2>
            </div>
            <div class="myIndent-com-mid">
              <div class="myIndent-com-mid-pro">
                <p><span>{{length}}</span> 产品</p>
                <span>¥ {{money1}}</span>
              </div>
              <div class="myIndent-com-mid-fre">
                <p>运费</p>
                <span>¥10.00</span>
              </div>
              <div class="myIndent-com-mid-total">
                <p>总计 (包括增值税)</p>
                <span>¥ {{money1+10}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  import MyHead from "../MyHead/MyHead"

  export default {
    name: "MyIndent",
    components: {
      MyHead
    },
    data(){
      return{
        indexData:[],
        orderNum:"",
        isConver:false,
        isCon:true,
        itemData:[],
        isIshow:false,
        isIhied:true,
        length:0,
      }
    },
    mounted() {
      let indentConWrapper = this.$refs.indentCon;
      let coverConWrapper = this.$refs.cover;
      this.indentWrapper = new BScroll(indentConWrapper, {
        click: true,
      });
      this.coverWrapper = new BScroll(coverConWrapper, {
        click: true,
      })
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      money(item){
        let price = 0;
        for (let v of item.goods){
          price += v.count * v.price;
        }
        return price;
      },
      show(item){
        this.isConver = !this.isConver;
        this.isCon = !this.isCon;
        if ((typeof item) != String) {
          this.itemData = item;
          this.length = this.itemData.goods.length;
        }
      },
      show2(){
        this.isConver = !this.isConver;
        this.isCon = !this.isCon;
      },
      xian(){
        this.isIshow = !this.isIshow;
        this.isIhied = !this.isIhied;
      }
    },
    computed:{
      money1(){
        let money = 0;
        for(let i of this.itemData.goods){
          money += i.count * i.price;
        }
        return money;
      }
    },
    created(){
      console.log(localStorage.getItem("userid"));
      this.$axios.get(`${this.$api}/user/order?userid=${localStorage.getItem("userid")}`).then(({data})=>{
        if (data.status==1){
          this.indexData = data.data;
        } else {
          console.log(data.msg);
        }
      }).catch((err)=>{
        console.error(err)
      })
    }
  }
</script>

<style lang="less" scoped>
  .myIndent {
    position: relative;
    top: 104px;
    left: 0;
    .myIndent-head {
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
    .myIndent-con-box1 {
      position: fixed;
      top: 104px;
      left: 0;
      width: 100%;
      height: calc(100% - 180px);
      overflow: hidden;
      .myIndent-con {
        width: 100%;
          li {
            display: block;
            margin: 0 auto;
            .indent {
              background: #f8f8f8;
              padding: 30px 30px 30px 20px;
              width: 604px;
              margin: 28px auto;
              overflow: hidden;
              .indent-left {
                float: left;
                vertical-align: top;
                img {
                  width: 130px;
                }
              }
              .indent-right {
                float: left;
                width: calc(100% - 170px);
                padding: 0 20px;
                vertical-align: top;
                p {
                  margin-bottom: 20px;
                  font-size: 22px;
                  letter-spacing: 1px;
                  line-height: 30px;
                  color: #505252;
                }
              }
              .indent-bottom {
                text-align: right;
                color: #b99d6b;
                font-weight: bold;
                font-size: 22px;
              }
            }
          }
      }
    }
    .myIndent-cover-box{
      position: fixed;
      top: 104px;
      left: 0;
      bottom: 180px;
      width: 100%;
      background: white;
      overflow: hidden;
      .myIndent-cover {
        width: 100%;
        .myIndent-cover-mid-box {
          padding: 28px 48px 0;
          height: 100%;
          width: calc(100% - 96px);
          .myIndent-cover-mid {
            height: 100%;
            background: rgb(248, 248, 248);

            .mid-a1{
              padding: 34px 30px;
              overflow: hidden;
              border-bottom: 1px solid #eaeaea ;
              font-size: 22px;
              color: #505252;
              p{
                display: inline-block;
                float: left;
              }
              span{
                float: right;
              }
            }
          }

        }
        .myIndent-cover-mid-express{
          padding: 0 48px;
          width: calc(100% - 96px);
          .express-a1{
            background: rgb(248, 248, 248);
            position: relative;
            top: 0;
            left: 0;
            height: 170px;
            .express-a1-left{
              float: left;
              position: relative;
              top: 0;
              left: 0;
              line-height: 170px;
              span{
                display: inline-block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #505252;
                margin-left: 34px;
              }
              i{
                position: absolute;
                top: -8px;
                left: 42px;
                font-size: 24px;
                color: white;

              }
              div{
                position: absolute;
                top: 120px;
                left: 55px;
                width: 1px;
                height:80px;
                border-left: 1px solid black;
                z-index: 3;
              }
            }
            .express-a1-left-con{
              span{
                background:#c1c1c1 ;
              }
            }
            .express-a1-right{
              width: 84%;
              position: absolute;
              top: 0;
              left: 0;
              margin-left: 104px;
              color: #c1c1c1;
              min-height: 170px;
              border-bottom: 1px solid #eaeaea;
              vertical-align: middle;
              z-index: 10;
              p{
                width: 100%;
                line-height: 150px;
              }
            }
            .express-a1-right-bottom {
              width: 84%;
              position: absolute;
              top: 0;
              left: 0;
              margin-left: 104px;
              color: #c1c1c1;
              min-height: 170px;
              vertical-align: middle;
             div{
               width: 100%;
               margin-top: 15px;
               height: 100%;
               p{
                  margin-top: 7px;
               }
             }
            }
            .express-a1-right-con{
              color:#505252;
              font-weight: 700;
            }
          }
        }
        .myIndent-product{
          width: 614px;
          margin: 30px auto;
          background:rgb(248, 248, 248) ;
          .myIndent-product-head{
            padding: 20px 10px;
            color: #505252;
            border-bottom: 1px solid #eaeaea;
            h2{
              display: inline-block;
              width: 85%;
              font-size: 22px;
              padding: 0 20px ;
              vertical-align: middle;
            }
            i{
              font-size: 22px;
              vertical-align: middle;
            }
          }
          .myIndent-product-con{
            overflow: hidden;
            padding: 20px 20px 40px;
            .myIndent-product-con-img{
              float: left;
              width: 160px;
              img{
                width: 100%;
              }
            }
            .myIndent-product-con-right{
              float: left;
              width: calc(100% - 200px);
              padding: 0 20px;
              .product-right{
                div{
                  font-size: 24px;
                  font-weight: 700;
                  margin-bottom: 20px;
                }
                .product-colour{
                  img{
                    width: 30px;
                    height: 30px;
                  }
                }
                p{
                  font-size: 20px;
                  color: #505252;
                  margin: 0 4px 20px ;
                  span{
                    margin-left: 8px;
                  }
                }
              }
              .product-right-bottom{
                p{
                  display: inline-block;
                  font-size: 20px;
                  color: #505252;
                  span{
                    font-weight: 700;
                    margin-left: 10px;
                  }
                }
                p:nth-child(1){
                  float: left;
                }
                p:nth-child(2){
                  float: right;
                }
              }
            }
          }
        }
        .myIndent-com{
          width: 614px;
          margin: 50px auto;
          .myIndent-com-head{
            font-size: 26px;
            width: 584px;
            margin: 0 30px 20px 0;
            color: #505252;
            line-height: 36px;
            border-bottom: 2px solid #c1c1c1;
            height: 44px;
            letter-spacing: 1px;

          }
          .myIndent-com-mid{
            padding: 50px 20px;
            .myIndent-com-mid-pro{
              overflow: hidden;
              font-size: 22px;
              color: #505252;
              letter-spacing: 2px;
              margin-bottom: 20px;
              p{
                float: left;
                span{
                  float: left;
                  margin-right: 10px;
                }
              }
              span{
                float: right;
                font-weight: 600;
              }
            }
            .myIndent-com-mid-fre{
              overflow: hidden;
              font-size: 22px;
              color: #505252;
              letter-spacing: 2px;
              margin-bottom: 60px;
              p{
                float: left;
              }
              span{
                float: right;
                font-weight: 600;
              }
            }
            .myIndent-com-mid-total{
              overflow: hidden;
              font-size: 22px;
              color: #505252;
              letter-spacing: 2px;
              font-weight: 600;
              p{
                float: left;
              }
              span{
                float: right;

              }
            }
          }

        }
      }
    }

  }
</style>
