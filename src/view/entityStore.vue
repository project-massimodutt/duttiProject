<template>
  <div>
    <my-header></my-header>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo">
      </el-amap>

      <div id="panel" class="panel" vid="amapDemo"></div>
      <div class="btnSearch">
        <input type="text" placeholder="输入城市查询" v-model="keyword">
        <button class="btn" @click="citySearch"><i class="iconfont icon-suosou"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../components/MyHead/MyHead'
  import {AMapManager} from 'vue-amap';

  export default {
    name: "entityStore",
    components: {
      myHeader
    },
    data() {
      return {
        keyword: "",
        zoom: 12,
        center: [121.59996, 31.197646],
        amapManager: '',
        cityCode: "北京",
      };
    },
    methods: {
      citySearch() {
        let placeSearch = new AMap.PlaceSearch({ //构造地点查询类
          pageSize: 100,
          pageIndex: 1,
          city: this.keyword, //城市
          panel: "panel"
        });

        //关键字查询
        placeSearch.search('massimodutti', function (status, result) {
          console.log(status, result)
          if (status == "complete" && result.info == "OK") {
            var pois = result.poiList.pois;
            console.log(pois);
            pois.forEach((poi) => {

            })
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .panel {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 120px;
    right: 0;
    width: 100%;
  }

  .btnSearch {
    position: absolute;
    bottom: 0;
    height: 80px;
    width: 100%;
    font-size: 30px;
    input {
      width: 80%;
      height: 80px;
      outline: none;
      padding-left: 3%;
      border: 1px solid grey;
      box-sizing: border-box;
    }
    .btn {
      width: 20%;
      height: 80px;
      float: right;
      color: white;
      background: rgb(63, 65, 65);
      text-align: center;
      .iconfont {
        font-size: 60px;
        font-weight: bold;
      }
    }
  }

</style>
<style lang="less">
  #panel {
    position: absolute;
    top: 104px;
    bottom: 80px;
    overflow: scroll;
    .poibox{
      margin-top: 20px;
      height: 280px;
      font-size: 32px;
      line-height: 32px;
      .amap_lib_placeSearch_poi{
        height: 62px;
        width: 38px;
        background-size: 100% 100%;
        font-size: 28px;
        line-height: 1.5;
        margin-left: 18px;
      }
      .poi-img {
        width: 240px;
        height: 130px;
        margin: 30px 15px 0;
        background-repeat: no-repeat;
        background-size: 200px 130px;
        background-position: center;
      }
      .poi-title {
        font-size: 32px;
        line-height: 32px;
        margin-left: 66px;
        .poi-more {
          width: 32px;
          height: 32px;
        }
      }
      .poi-info {
        margin-left: 66px;
        font-family: "lato","lato-int",Arial,sans-serif;
        p {
          font-family: "lato","lato-int",Arial,sans-serif;
          font-size: 28px;
          line-height: 1.5;
          margin-top: 20px;
          color: #505252;
          font-weight: normal;
        }
      }
    }
  }
</style>
