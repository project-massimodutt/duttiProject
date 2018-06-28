<template>
  <div class="wrap">
    <div class="container">
      <h1 style="text-align: center;font-size: 40px;padding: 0px 0;color:black;">商品添加页面</h1>
      <!--添加的页面-->
      <form method="post" enctype="multipart/form-data" name="form1">
        <div class="selectgoods">
          <table class="table1">
            <tr>
              <td>标题</td>
              <td><input type="text" class="in" v-model="goodName"></td>
            </tr>
            <tr>
              <td>标签数组：</td>
              <td><input type="text" class="in" v-for="(value,index) in tag2" v-model="tag2[index]">
              </td>
              <td style=""><input type="button" value="继续添加" @click="tag2.push('')"></td>
            </tr>
            <tr>
              <td>搜索页面大图：</td>
              <td>
                <input type="txet" class="in" placeholder="存储图片在线地址" v-model="showPic">
              </td>
            </tr>
            <tr>
              <td>原价：</td>
              <td><input type="number" class="in" v-model="oldPrice"></td>
            </tr>
            <tr>
              <td>现价：</td>
              <td><input type="text" class="in" v-model="price"></td>
            </tr>
            <tr>
              <td>购物车数量：</td>
              <td>
                <input class="in" type="number" value="0" v-model="count">
              </td>
            </tr>
            <tr>
              <td style="position: relative;top: -130px;">DETAILS信息：</td>
              <td>
                <textarea rows="5" cols="46" style="border: 1px solid" v-model="details"></textarea>
                <!--<input class="in" type="text">-->
              </td>
            </tr>
            <tr>
              <td>货品详情：</td>
              <td><input type="text" class="in" v-for="(value,index) in more" v-model="more[index]">
              </td>
              <td style=""><input type="button" value="继续添加" @click="more.push('')"></td>
            </tr>
            <tr>
              <td>货品详情类型：</td>
              <td><input type="text" class="in" v-model="type"></td>
            </tr>
            <tr class="attr">
              <td>商品样式(至少一个)：</td>
              <td>
                <div v-for="(value,index) in attr" style="margin-top:10px">
                  <p><span> 颜色：</span><input type="text" v-model="value.color"></p>
                  <p><span>颜色小图标：</span><input type="text" v-model="value.colPic"></p>
                  <div class="size">
                    <span>尺寸：</span>
                    <span>
                      <input type="text" class="in" v-for="(value2,index2) in value.size"
                             v-model="value.size[index2]">
                    </span>
                    <span><input type="button" value="继续添加" @click="value.size.push('')"></span>
                  </div>
                  <div class="size">
                    <span>商品图片：</span>
                    <span><input type="txet" class="in" placeholder="图片在线地址"
                                 v-for="(value3,index3) in value.pics" v-model="value.pics[index3]">
                    </span>
                    <span><input type="button" value="继续添加" @click="value.pics.push('')"></span>
                  </div>

                </div>
              </td>
              <td style="">
                <input type="button" value="继续添加"
                       @click="attr.push({color:'',colPic:'',size: ['','',''], pics: ['','','']})">
              </td>
            </tr>

          </table>
          <input type="button" id="add" class="add" value="提交数据" @click="add">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "manage",
    data() {
      return {
        goodName: '',
        tag2: ["", "", ""],
        showPic: '',
        oldPrice: '',
        price: '',
        count: '',
        details: '',
        more: ["", "", ""],
        type: '',
        attr: [{
          color: '',
          colPic: '',
          size: ["", "", ""],
          pics: ["", "", ""]
        }],

      }
    },
    created() {

    },
    methods: {
      add() {
        let data = {
          goodName: this.goodName,
          tags: this.tag2,
          showPic: this.showPic,
          oldPrice: this.oldPrice,
          price: this.price,
          count: this.count,
          details: this.details,
          more: this.more,
          type: this.type,
          attr: this.attr,
        }
        console.log(data)
        // let formData = this.$qs.stringify(data, {indices: false});
        this.$axios.post('/api/goods/add', data,).then(({data}) => {
          if (data.status == 0) {
            alert(data.msg);
            location.reload();
          }
          if (data.status == 1) {
            alert(data.msg)
            location.reload();
          }
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .wrap {
    color: black;
  }
  input {
    border: 1px solid;
  }
  .container {
    width: 90%;
    margin: 10px auto;
    height: 900px;
    font-size: 16px;
    .selectgoods {
      text-align: center;
      margin: 30px 0;
      .table1 {
        margin: 0 auto;
        tr {
          display: block;
          line-height: 40px;
          margin-top: 30px;
          border-bottom: 1px solid #e5e5e5;
          td {
            width: 250px;
            margin-top: 30px;
          }
        }
        .in {
          width: 400px;
        }
        .size {
          span {
            display: block;
            margin-top: 5px;
            &:nth-child(1) {
              float: left;
            }
            &:last-child {
              margin-top: 5px;
            }
          }
          margin-top: 20px;
        }
        .attr {
          p {
            margin-left: 100px;
            margin-top: 2px;
            span {
              float: left;
              margin-left: -100px;
            }
          }
        }
      }
      .add {
        padding: 15px 20px;
        color: white;
        background-color: blue;
        font-size: 16px;
        border-radius: 5px;
        display: block;
        margin: 40px auto;
      }
    }
  }
</style>
