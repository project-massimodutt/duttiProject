<template>
  <div class="container">
    <my-head></my-head>
      <div class="search-wrap">
        <!--搜索框区域-->
        <div class="input-search-wrap">
          <div class="input-search">
            <input v-model="val" type="text" placeholder="搜索" id="search">
            <span @click="sub"  class="iconfont icon-suosou btn"></span>
          </div>
          <div class="close" @click="close">
            <i class="iconfont icon-guanbi"></i>
          </div>
        </div>
      </div>
      <search v-show="goodList.length!=0" :initgood="initgoodList" @changeGood="CGood"></search>
      <good-list v-show="ShowGoodList" class="good-list" :goods="goodList"></good-list>
    <div v-show="!ShowGoodList" class="good-list-mess"><span>未搜索到该商品,试试搜索其他商品吧!</span></div>
    </div>
</template>

<script>
  import MyHead from "../components/MyHead/MyHead";
  import Search from "../components/Goods/Search";
  import GoodList from "../components/Goods/GoodList";
  export default {
    name: "GoodSearch",
    data () {
      return {
        val:"",
        goodList:[],
        initgoodList:[],
        ShowGoodList:true,
      }
    },
    components:{
      MyHead,
      Search,
      GoodList,
    },
    methods:{
      sub () {
        this.$axios.get(`${this.$api}/goods/key?key=${this.val}`)
          .then(({data}) => {
            console.log(data);
            if (data.status==1) {
              if(data.data.length == 0) {
                this.ShowGoodList = false;
              } else {
                this.goodList = data.data;
                this.initgoodList = data.data;
                this.ShowGoodList = true;
              }
              
            }
          });
      },
      close () {
        this.$router.go(-1);
      },
      CGood(value) {
        console.log(value);
        this.goodList = value;
      }
    },
    created () {
      // this.sub();
    },
  }
</script>

<style lang="less" scoped>
  .container {
    position: relative;
  }
  .search-wrap {
    position: fixed;
    top: 104px;
    left: 0;
    z-index: 2000;
    width: 100%;
    overflow: hidden;
  }
  //搜索框区域
  .input-search-wrap {

    height: 80px;
    padding: 6px;
    background: #f8f8f8;
    border-top: 1px solid rgb(234,234,234);
    border-bottom: 1px solid #eee;
    text-align: center;
    font-size: 26px;
    line-height: 0px;
    /*搜索框*/
    #search {
      width: 320px;
      /*height: 46px;*/
      border: none;
      outline: none;
      padding: 6px;
      border-bottom: 1px solid black;
      margin-top: 16px;
      background: #f8f8f8;
      &:-moz-placeholder {
        margin: 0 auto;
        text-align: center;
      }

    }
    .btn {
      display: inline-block;
      padding: 20px;
      outline: none;
      border: none;
      font-size: 36px;

    }
    .btn:hover {
      cursor: pointer;
    }
    input::-webkit-input-placeholder { /* WebKit browsers */

      text-align: center;
      line-height: 26px;

    }
    /*关闭按钮*/
    .close {
      position: absolute;
      top: 0;
      right: 50px;
      text-align: right;
      /*width: 140px;*/
      padding: 0;

      i {
        display: inline-block;
        padding: 32px;
        font-size: 32px;
        line-height: 28px;
      }
    }
  }
  .good-list {
    margin-top:283px;
  }
  .good-list-mess {
    margin-top: 283px;
    width: 100%;
    height: 590px;
    text-align: center;
    line-height: 590px;
    color: red;
  }
</style>
