<template>
  <div>
    <!--商品列表区域-->
    <!--v-for="item in 12"-->
    <div class="product-list-wrap">

      <!--商品列表-->
      <div class="product-list" v-for="(item,index) in goods">
        <!--每一个商品-->
        <div class="product">
          <div class="product-img" @click="selectFood(item._id)">
            <img :src="item.showPic" alt="" >
          </div>
          <!--商品信息-->
          <div class="product-view">
            <div class="product-name">
              <a href="javascript:void(0);">{{item.goodName}}</a>
            </div>
            <div class="product-price">
              <span class="oldprice">￥{{item.oldPrice}}</span>
              <span class="newprice">￥{{item.price}}</span>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  // import BScroll from "better-scroll";
  export default {
    name: "GoodList",
    data() {
      return{
        selectedFood:{},
        ScrollY:0,
        goodsId:[],
      }
    },
    props:["goods"],
    components:{
      // Good,
    },
    methods:{
      selectFood(item) {
        this.goods.forEach((data,i) => {
          // console.log(data._id);
          this.goodsId[i] = data._id;
          // console.log(this.goodsId);
        })
        this.$router.push({
            // path: '/goodList',
          // query:{goodId:item},
          name:'GoodDetail',
          query:{goodId:item,goodsId:this.goodsId},
          })
      },
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  a {
    text-decoration: none;
    color: #505252;
  }
  /*商品列表区域*/
  .product-list-wrap {
    width: 100%;
    .product-list {
      position: relative;
      float: left;
      max-width: 100%;
      width: 50%;
      .product {
        padding-left: 20px;
        padding-right: 20px;
        .product-img {
          width: 100%;
          img {
            width: 100%;
            vertical-align: bottom;
          }
        }
        .product-view {
          padding-top: 34px;
          font-size: 24px;
          text-align: center;
          line-height: 1.42857143;
          height: 110px;
          .product-name {
            display: inline-block;
            vertical-align: top;
            width: 100%;
            margin-bottom: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          /*商品价格*/
          .product-price {
            font-weight: bold;
            .oldprice {
              display: inline-block;
              color: #848686;
              text-decoration: line-through;
            }
            .newprice {
              display: inline-block;
              margin-left: 4%;
              color: #fe4342;
            }
          }
          /*更多颜色*/
          .product-color {
            /*margin-top: 16px;*/
            a {
              display: inline-block;
              margin-left: 10px;
              height: auto;
              padding: 4px;
              color: #000;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
</style>

