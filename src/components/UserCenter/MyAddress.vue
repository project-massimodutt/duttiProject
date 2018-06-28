<template>
  <div>
    <my-head></my-head>
    <div class="myAddress">
      <div class="address-head">
        <i @click="back" class="iconfont icon-fanhui"></i>
        <div>
          <p>我的寄送地址</p>
        </div>
      </div>
      <div v-if="isHead == false " class="myAddress-con">
        <div v-for="item in addressData" class="myAddress-con-site">
          <div class="myAddress-con-site-left">
            <p>{{item.address}},{{item.other}}</p>
            <span>{{item.postCode}}</span>
            <span>{{item.province}},</span>
            <span>中国</span>
          </div>
          <div class="myAddress-con-site-right">
            <span @click="updata(item)">编辑</span>
            <span @click="del(item._id)">删除</span>
          </div>
        </div>
        <div class="myAddress-con-btn">
          <button @click="red">新增地址</button>
        </div>
      </div>
      <!--遮盖层填写地址-->
      <div v-if="isShow1" class="myAddress-row">
        <div class="row-xing">
          <input type="text" placeholder="姓氏" v-model="firName">
          <i v-if="isfirName == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isfirName == false" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isfirName">必须填写</p>
        </div>
        <div class="row-ming">
          <input type="text" placeholder="名" v-model="secName">
          <i v-if="isSecName == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isSecName == false" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isSecName">必须填写</p>
        </div>
        <div class="row-mid">
          <div class="row-place">
            <select name="" id="" v-model="market">
              <option value="中国大陆">中国大陆</option>
              <option value="香港">香港</option>
              <option value="澳门">澳门</option>
            </select>
          </div>
          <div class="row-phone">
            <span>+86</span>
            <input type="text" placeholder="手机号码" v-model="phone">
            <i v-if="isPhone == true" class="iconfont icon-chuyidong"></i>
            <i v-if="isPhone" class="iconfont icon-htmal5icon22"></i>
          </div>
          <div class="row-mid-txt">
            <span v-if="isPhone == false">必须填写</span>
          </div>
        </div>
        <div class="row-site">
          <input type="text" placeholder="地址" v-model="address">
          <i v-if="isAddress == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isAddress" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isAddress">必须填写</p>
        </div>
        <div class="row-else">
          <input type="text" placeholder="其他信息" v-model="other">
          <i v-if="isOther == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isOther" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isOther">必须填写</p>
        </div>
        <div class="row-min-bot">
          <div class="row-postcode">
            <input type="text" placeholder="邮政 编码" v-model="postCode">
            <i v-if="isPostCode == true" class="iconfont icon-chuyidong"></i>
            <i v-if="postCode" class="iconfont icon-htmal5icon22"></i>
          </div>
        </div>
        <myarea @select="haha" pindex="1"></myarea>
        <div class="row-bottom">
          <h2>MAINLAND CHINA / 中国大陆</h2>
          <i class="iconfont icon-htmal5icon22"></i>
        </div>
        <div class="row-btn">
          <button @click="add">添加</button>
        </div>
      </div>
      <!--编辑页面-->
      <div v-if="isUpdata" class="myAddress-row">
        <div class="row-xing">
          <input type="text" placeholder="姓氏" v-model="firName">
          <i v-if="isfirName == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isfirName == false" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isfirName">必须填写</p>
        </div>
        <div class="row-ming">
          <input type="text" placeholder="名" v-model="secName">
          <i v-if="isSecName == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isSecName == false" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isSecName">必须填写</p>
        </div>
        <div class="row-mid">
          <div class="row-place">
            <select v-model="market">
              <option value="中国大陆">中国大陆</option>
              <option value="香港">香港</option>
              <option value="澳门">澳门</option>
            </select>
          </div>
          <div class="row-phone">
            <span>+86</span>
            <input type="text" placeholder="手机号码" v-model="phone">
            <i v-if="isPhone == true" class="iconfont icon-chuyidong"></i>
            <i v-if="isPhone" class="iconfont icon-htmal5icon22"></i>
          </div>
          <div class="row-mid-txt">
            <span v-if="isPhone == false">必须填写</span>
          </div>
        </div>
        <div class="row-site">
          <input type="text" placeholder="地址" v-model="address">
          <i v-if="isAddress == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isAddress" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isAddress">必须填写</p>
        </div>
        <div class="row-else">
          <input type="text" placeholder="其他信息" v-model="other">
          <i v-if="isOther == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isOther" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isOther">必须填写</p>
        </div>
        <div class="row-min-bot">
          <div class="row-postcode">
            <input type="text" placeholder="邮政 编码" v-model="postCode">
            <i v-if="isPostCode == true" class="iconfont icon-chuyidong"></i>
            <i v-if="postCode" class="iconfont icon-htmal5icon22"></i>
          </div>
        </div>
        <myarea @select="haha" pindex="1"></myarea>
        <div class="row-bottom">
          <h2>MAINLAND CHINA / 中国大陆</h2>
          <i class="iconfont icon-htmal5icon22"></i>
        </div>
        <div class="row-btn">
          <button @click="upda(_id)">更新</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import myarea from 'vue-myarea'
  import MyHead from "../MyHead/MyHead";
  
  export default {
    name: "MyAddress",
    components: {
      myarea,
      MyHead
    },
    data() {
      return {
        firName: "",
        secName: "",
        market: "",
        phone: "",
        address: "",
        other: "",
        postCode: "",
        pro: "",
        city: "",
        county: "",
        isShow1: false,
        isHead: false,
        isfirName: false,
        isSecName: false,
        isPhone: false,
        isPhoneT: false,
        isAddress: false,
        isOther: false,
        isPostCode: false,
        addressData: [],
        isUpdata: false,
        id: "",
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      red() {
        if (this.isShow1 == true) {
          this.isShow1 = false;
          this.isHead = false;
        } else {
          this.isShow1 = true;
          this.isHead = true;
        }
      },
      haha(d) {
        this.pro = d.pro.name;
        this.city = d.city.name;
        this.county = d.county.name;
      },
      add() {
        let userid = localStorage.getItem("userid");
        if (this.firName && this.secName && this.market && this.phone && this.address && this.other && this.postCode && this.pro && this.city && this.county) {
          let add1 = /^[\u4e00-\u9fa5]+$/;
          if (add1.test(this.firName) == true) {
            this.isfirName = false;
          } else {
            this.isfirName = true;
          }
          if (add1.test(this.secName) == true) {
            this.isSecName = false;
          } else {
            this.isSecName = true;
          }
          let add2 = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$/;
          if (add2.test(this.phone) == true) {
            this.isPhone = false;
          } else {
            this.isPhone = true;
          }
          //判断地址
          this.isAddress = false;
          //判断其他信息
          this.isOther = false;
          let add3 = /^[0-9]{6}$/;
          if (add3.test(this.postCode) == true) {
            this.isPostCode = false;
          } else {
            this.isPostCode = true;
          }
          this.$axios.post(`${this.$api}/address/add`, {
            userid: userid,
            firName: this.firName,
            secName: this.secName,
            market: this.market,
            phone: this.phone,
            address: this.address,
            other: this.other,
            postCode: this.postCode,
            province: this.pro,
            city: this.city,
            area: this.county,
          }).then(({data}) => {
            console.log(data);
            if (data.status == 1) {
              this.isShow1 = false;
              this.isHead = false;
              location.reload();
            } else {
              alert(data.msg);
              this.isShow1 = true;
              this.isHead = true;
            }
          }).catch((err) => {
            console.error(err);
          })
        } else {
          this.isfirName = true;
          this.isSecName = true;
          this.isPhone = true;
          this.isAddress = true;
          this.isOther = true;
          this.isPostCode = true;
        }
      },
      del(id) {
        this.$axios.get(`${this.$api}/address/del?addressid=${id}`).then(({data}) => {
          if (data.status == 1) {
            location.reload()
          } else {
            alert(data.msg);
          }
        }).catch((err) => {
          console.error(err);
        })
        
      },
      updata(item) {
        this.address = item.address;
        this.city = item.city;
        this.firName = item.firName;
        this.market = item.market;
        this.other = item.other;
        this.phone = item.phone;
        this.postCode = item.postCode;
        this.secName = item.secName;
        this.county = item.area;
        this.pro = item.province;
        this.id = item._id;
        if (this.isUpdata == true) {
          this.isUpdata = false;
          this.isHead = false;
        } else {
          this.isUpdata = true;
          this.isHead = true;
        }
      },
      upda() {
        let userid = localStorage.getItem("userid");
        this.$axios.post(`${this.$api}/address/update`, {
          addressid: this.id,
          userid: userid,
          firName: this.firName,
          secName: this.secName,
          market: this.market,
          phone: this.phone,
          address: this.address,
          other: this.other,
          postCode: this.postCode,
          province: this.pro,
          city: this.city,
          area: this.county,
        }).then(({data}) => {
          if (data.status == 1) {
            this.isUpdata = false;
            this.isHead = false;
            location.reload();
          } else {
            alert(data.msg);
            this.isUpdata = true;
            this.isHead = true;
          }
        }).catch((err) => {
          console.error(err);
        })
      }
    },
    created() {
      this.$axios.get(`${this.$api}/user/address?userid=${localStorage.getItem("userid")}`).then(({data}) => {
        if (data.status==1) {
          this.addressData = data.data;
        } else {
          alert(data.msg);
        }
      }).catch((err) => {
        console.error(err);
      })
    }
  }
</script>

<style lang="less" scoped>
  .address-head {
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
  
  .myAddress {
    position: fixed;
    top: 104px;
    width: 100%;
    height: calc(100% - 104px);
    overflow: scroll;
    z-index: 110;
    .myAddress-con {
      padding: 0 20px;
      .myAddress-con-site {
        padding: 50px 48px;
        background: rgb(247, 247, 247);
        overflow: hidden;
        margin-top: 30px;
        .myAddress-con-site-left {
          width: 384px;
          float: left;
          font-size: 22px;
          letter-spacing: 1px;
          p {
            color: #505252;
            line-height: 30px;
            font-weight: 700;
            margin-bottom: 15px;
          }
          span {
            margin: 4px 0;
            color: #505252;
          }
        }
        .myAddress-con-site-right {
          width: calc(100% - 385px);
          float: left;
          text-align: right;
          font-size: 22px;
          span {
            margin-left: 25px;
            color: #505252;
          }
        }
      }
      .myAddress-con-btn {
        width: 614px;
        margin: 50px auto;
        button {
          padding: 26px 30px;
          width: 100%;
          background: #505252;
          color: white;
          font-size: 26px;
          letter-spacing: 4px;
        }
      }
    }
    .myAddress-row {
      padding: 60px 50px;
      width: calc(100% - 100px);
      div {
        margin-top: 20px;
      }
      .row-xing, .row-ming, .row-site, .row-else, .row-city, .row-room {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        input {
          width: calc(100% - 50px);
          font-size: 26px;
          padding-right: 50px;
          border-bottom: 1px solid #eaeaea;
          height: 72px;
          font-style: italic;
          border-radius: 0;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          box-shadow: none;
          font-weight: 700;
          color: #555555;
          outline: none;
        }
        i {
          position: absolute;
          top: 22px;
          right: 0;
          font-size: 35px;
        }
        p {
          font-size: 20px;
          color: #a94442;
          margin-top: 20px;
        }
        input:hover {
          border-bottom: 1px solid black;
        }
      }
      .row-mid {
        width: 100%;
        overflow: hidden;
        .row-place {
          width: 196px;
          height: 72px;
          padding-right: 24px;
          float: left;
          margin-bottom: 20px;
          select {
            width: 100%;
            height: 100%;
            outline: none;
            margin-bottom: 1px;
            border-bottom: 1px solid black;
          }
        }
        .row-phone {
          width: calc(100% - 220px);
          height: 72px;
          float: left;
          position: relative;
          top: 0;
          left: 0;
          margin-bottom: 20px;
          span {
            position: absolute;
            top: 18px;
            left: 0;
            display: inline-block;
            width: 80px;
            padding: 8px;
            text-align: center;
            background-color: #f0f0f0;
            z-index: 5;
          }
          input {
            position: absolute;
            top: 0;
            left: 0;
            width: calc(100% - 100px);
            height: 100%;
            padding-left: 100px;
            margin-bottom: 1px;
            border-bottom: 1px solid black;
            outline: none;
            font-style: italic;
            color: black;
            font-size: 26px;
            letter-spacing: 1px;
            line-height: 36px;
          }
          i {
            position: absolute;
            top: 22px;
            right: 0;
            font-size: 35px;
          }
        }
        .row-mid-txt {
          p {
            font-size: 26px;
            letter-spacing: 1px;
          }
          span {
            font-size: 20px;
            color: #a94442;
            margin-top: 20px;
          }
        }
      }
      .row-min-bot {
        width: 100%;
        height: 130px;
        overflow: hidden;
        .row-postcode {
          width: 196px;
          height: 72px;
          padding-right: 24px;
          float: left;
          position: relative;
          top: 0;
          left: 0;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            outline: none;
            font-size: 26px;
            font-style: italic;
            font-weight: 700;
            color: #555555;
            border-bottom: 1px solid black;
            
          }
          i {
            position: absolute;
            top: 22px;
            right: 20px;
            font-size: 35px;
          }
          p {
            font-size: 20px;
            color: #a94442;
            margin-top: 12px;
          }
        }
        .row-pro {
          width: calc(100% - 220px);
          height: 72px;
          float: left;
          position: relative;
          top: 0;
          left: 0;
          margin-bottom: 20px;
          select {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            margin-bottom: 1px;
            border-bottom: 1px solid black;
            outline: none;
            font-style: italic;
            color: black;
            font-size: 26px;
            letter-spacing: 1px;
            line-height: 36px;
          }
          i {
            position: absolute;
            top: 22px;
            right: 0;
            font-size: 35px;
          }
          p {
            position: absolute;
            bottom: -30px;
            font-size: 20px;
            color: #a94442;
          }
        }
      }
      .row-bottom {
        margin-top: 250px;
        font-size: 26px;
        width: 100%;
        height: 72px;
        border-bottom: 1px solid black;
        position: relative;
        top: 0;
        left: 0;
        h2 {
          line-height: 72px;
          font-style: italic;
          color: #505252;
          font-weight: 700;
        }
        i {
          position: absolute;
          top: 22px;
          right: 0;
          font-size: 35px;
        }
      }
      .row-btn {
        padding: 100px 0;
        button {
          width: 100%;
          text-align: center;
          font-size: 26px;
          font-weight: 400;
          color: white;
          background: #848686;
          padding: 26px 30px;
        }
      }
    }
  }
</style>
<style lang="less">
  .container {
    .row {
      display: block !important;
    }
    height: 40px;
    .col:nth-child(1) {
      top: 888px;
      right: 60px;
      border-bottom: 1px solid black;
      select {
        margin: 0;
        width: 100%;
        font-size: 26px;
        border-radius: 0px;
        padding: 10px 0 30px;
        border: none;
        outline: none;
        font-style: italic;
        color: #555555;
        font-weight: 700;
      }
    }
    .col:nth-child(2) {
      display: block;
      width: 100%;
      border-bottom: 1px solid #eaeaea;
      select {
        margin: 0;
        width: 100%;
        font-size: 26px;
        border-radius: 0px;
        padding: 30px 0 10px;
        border: none;
        outline: none;
        font-style: italic;
        color: #555555;
        font-weight: 700;
      }
    }
    .col:nth-child(3) {
      display: block;
      width: 100%;
      border-bottom: 1px solid #eaeaea;
      margin-top: 30px;
      select {
        margin: 0;
        width: 100%;
        font-size: 26px;
        border-radius: 0px;
        padding: 10px 0;
        border: none;
        outline: none;
        font-style: italic;
        color: #555555;
        font-weight: 700;
      }
    }
  }
</style>

