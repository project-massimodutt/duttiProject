<template>
    <div class="container">
      <div class="search-filter">
        <ul class="search-result">
          <li @click="change(0)" class="search-item selected"><a href="JavaScript:void(0);"><span>全部 ({{initgood.length}})</span></a></li>
          <li @click="change(1)" class="search-item" v-if="dutt>0"><a href="JavaScript:void(0);"><span>季末折扣 ({{dutt}})</span></a></li>
          <li @click="change(2)" class="search-item" v-if="male>0"><a href="JavaScript:void(0);"><span>男装 ({{male}})</span></a></li>
          <li @click="change(3)" class="search-item" v-if="female>0"><a href="JavaScript:void(0);"><span>女装 ({{female}})</span></a></li>
          <li @click="change(4)" class="search-item" v-if="children>0"><a href="JavaScript:void(0);"><span>男女童装 ({{children}})</span></a></li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Search",
      props:["initgood"],
      methods:{
        change(type){
          $(".search-result>li").eq(type).addClass("selected").siblings().removeClass("selected")
          console.log(type);
          let temp= [];
          switch (type) {
            case 0:
              /*全部搜索结果*/
              temp = this.initgood;
              break;
            case 1:
              for (let v of this.initgood) {
                for (let i of v.tags) {
                  if (i == "季末折扣") {
                    temp.push(v);
                  }
                }
              }
              break;
            case 2:
              for (let v of this.initgood) {
                for (let i of v.tags) {
                  if (i == "男装") {
                    temp.push(v);
                  }
                }
              }
              break;
            case 3:
              for (let v of this.initgood) {
                for (let i of v.tags) {
                  if (i == "女装") {
                    temp.push(v);
                  }
                }
              }
              break;
            case 4:
              let count = 0;
              for (let v of this.initgood) {
                for (let i of v.tags) {
                  if (i == "男童装" || i=="女童装") {
                    temp.push(v);
                  }
                }
              }
              break;
            default:
              break;
          }
          console.log(temp);
          this.$emit("changeGood",temp);
        }
      },
      computed: {
        dutt() {
          let count = 0;
          for (let v of this.initgood) {
            for (let i of v.tags) {
              if (i == "季末折扣") {
                count++;
              }
            }
          }
          return count;
        },
        male() {
          let count = 0;
          for (let v of this.initgood) {
            for (let i of v.tags) {
              if (i == "男装") {
                count++;
              }
            }
          }
          return count;
        },
        female() {
          let count = 0;
          for (let v of this.initgood) {
            for (let i of v.tags) {
              if (i == "女装") {
                count++;
              }
            }
          }
          return count;
        },
        children() {
          let count = 0;
          for (let v of this.initgood) {
            for (let i of v.tags) {
              if (i == "男童装" || i=="女童装") {
                count++;
              }
            }
          }
          return count;
        },
      }
    }
</script>

<style lang="less" scoped>
  a {
    text-decoration: none;
  }
  .container {
    position: relative;
  }
  .search-filter {
    position: fixed;
    z-index: 2000;
    top: 198px;
    background: white;
    width: 100%;
    .search-result {
      padding: 0 40px;
      border-bottom: 1px solid rgb(232,232,232);
      overflow-x: scroll;
      white-space: nowrap;
      height: 84px;
      .search-item {
        display: inline-block;
        /*float: left;*/
        &.selected>a {
          border-bottom: 1px solid black;
          color: rgb(80,82,82);
          opacity: 1;
          font-weight: bold;
        }
        a {
          font-size: 23px !important;
          padding: 30px 20px;
          display: inline-block;
          white-space: nowrap;
          color: rgba(78,81,81,0.3);
          cursor: pointer;
          span {
            letter-spacing: 2px;
          }
        }
      }
    }
  }
</style>
