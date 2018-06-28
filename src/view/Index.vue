<template>
  <div class="index">
    <my-head></my-head>
    <div class="index-wrapper">
      <div class="bg-img">
        <img v-show="showImg" src="https://static.massimodutti.cn/3/static2/media/2017/home_sales/sales-women_2.jpg?tm=2018062204000062353306" alt="">
        <img
          v-for="(items, index) in imgs"
          v-show="index == num"
          @click="showCategory(index)"
          :src="items">
        <div class="discount">
          <p>SALE</p>
          <p>低至</p>
          <p>5折</p>
        </div>
      </div>
      <ul class="tab">
        <li class="tab-item"
            v-for="(item,index) in label"
            :class="{active:index == num, isClick:index == num}"
            @click="showCategory(index,item)">{{item.tag1}}
        </li>
      </ul>
      <ul class="goods-category" v-show="categoryShow">
        <li v-for="item in labels" @click="skipLists(item)">{{item}}
          <i class="iconfont icon-tubiao_gengduo"></i>
        </li>
      </ul>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyHead from '../components/MyHead/MyHead'
  import MyFooter from '../components/MyFoot/MyFoot'
  // import BScroll from 'better-scroll'
  export default {
    name: "Index",
    components: {
      MyHead,
      MyFooter
    },
    data() {
      return {
        label:[],
        labels:[],
        tagArr:[],
        //当前标签集合
        tags:{},
        // good:{},
        // img: require()
        imgs:["https://static.massimodutti.cn/3/static2/media/2017/home_sales/sales-women_2.jpg?tm=2018062204000062353306","https://static.massimodutti.cn/3/static2/media/2017/home_sales/sales-men_2.jpg?tm=2018062204000062353306","https://static.massimodutti.cn/3/static2/media/2017/home_sales/sales-girls_2.jpg?tm=2018062204000062353306","https://static.massimodutti.cn/3/static2/media/2017/home_sales/sales-boys_2.jpg?tm=2018062204000062353306"],
        num:90,
        categoryShow: false,
        showImg: true
      }
    },
    created() {
      this.$axios.get("/api/index/tagList1")
        .then(({data}) => {
          if (data.status == 1) {
            this.label = data.data;
          }
        }).catch((err) => {
        console.error(err);
      })
    },
    methods: {
      showCategory(index,item) {
        this.categoryShow = true;
        this.showImg = false;
        this.num = index;
        this.labels = item.tag2;
        this.borderLine = document.querySelector(".tab");
        this.borderLine.style.borderBottom = 'none';
        this.tagArr[0] = item.tag1;
        //当前标签集合
        localStorage.setItem('tagList',JSON.stringify(item));
      },
      skipLists(item) {
        this.tagArr[1] = item;
        localStorage.setItem('tag', JSON.stringify(this.tagArr));
        this.$router.push({
          name: 'Good',
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  @base-color:#848686;
  .index{
    font-family: "lato","lato-int",Arial,sans-serif;
    letter-spacing: 5px;
    .index-wrapper{
      margin-top: 100px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      /*margin-bottom: 60px;*/
      .bg-img{
        position: relative;
        height: 614px;
        img{
          width: 100%;
          height: 100%;
        }
        .discount{
          position: absolute;
          width: 100%;
          top: 50%;
          margin-top: -120px;
          color: rgb(255,255,255);
          text-align: center;
          overflow: hidden;
          p:nth-child(1) {
            font-size: 55px;
            font-weight: bold;
          }
          p:nth-child(2) {
            font-size: 26px;
            margin: 24px 0;
          }
          p:nth-child(3) {
            font-size: 130px;
          }
        }
      }
      .tab{
        letter-spacing: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-weight: bold;
        color: @base-color;
        border-bottom: 1px solid @base-color;
        box-sizing: border-box;
        .tab-item{
          position: relative;
          padding: 38px;
          flex: 1;
          &:after {
            content: "";
            position: absolute;
            left: 190px;
            top: 26px;
            width: 2px;
            background: rgb(229,229,229);
            height: 50px;
          }
          &:last-child:after{
            width: 0;
          }
        }
        .isClick{
          color: rgb(240,32,32);
          border-bottom: 5px solid;
        }
      }
      .goods-category{
        /*position: absolute;*/
        width: 100%;
        font-weight: bold;
        text-align: center;
        font-size: 26px;
        color: #323434;
        background: rgb(229,229,229);
        padding: 48px 0;
        /*overflow: auto;*/
        li{
          width: 100%;
          margin-bottom: 54px;
          vertical-align: middle;
          .iconfont{
            font-size: 36px;
            padding-left: 10px;
            vertical-align: middle;
          }
        }
        li:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
