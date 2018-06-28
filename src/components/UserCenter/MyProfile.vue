<template>
  <div>
    <my-head></my-head>
    <div class="myProfile">
      <div class="address-head">
        <i @click="back" class="iconfont icon-fanhui"></i>
        <div>
          <p>账户明细</p>
        </div>
      </div>
      <div v-if="isShow1 == false" class="myAddress-row">
        <div class="row-xing">
          <input type="text" placeholder="姓氏" v-model="firName">
          <i v-if="isfirName == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isfirName == false" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isfirName == true">必须填写</p>
        </div>
        <div class="row-ming">
          <input type="text" placeholder="名" v-model="secName">
          <i v-if="isSecName == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isSecName == false" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isSecName == true">必须填写</p>
        </div>
        <div class="row-birthday">
          <input type="text" placeholder="出生日期(yyyy-mm-dd)" v-model="birthday	">
          <i v-if="isBirthday == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isBirthday == false" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isBirthday == true">必须填写</p>
        </div>
        <div class="row-sex">
          <div class="row-sex-left">
            <input type="radio" name="sex" value="男" v-model="sex">
            <p>男性</p>
          </div>
          <div class="row-sex-right">
            <input type="radio" name="sex" value="女" v-model="sex">
            <p>女性</p>
          </div>

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
            <i v-if="isPhone == false" class="iconfont icon-htmal5icon22"></i>
          </div>
          <div class="row-mid-txt">
            <span v-if="isPhone == true">必须填写</span>
          </div>
        </div>
        <div class="row-site">
          <input type="text" placeholder="地址" v-model="address">
          <i v-if="isAddress == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isAddress == false" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isAddress == true">必须填写</p>
        </div>
        <div class="row-else">
          <input type="text" placeholder="其他信息" v-model="other">
          <i v-if="isOther == true" class="iconfont icon-chuyidong"></i>
          <i v-if="isOther == false" class="iconfont icon-htmal5icon22"></i>
          <p v-if="isOther == true">必须填写</p>
        </div>
        <div class="row-min-bot">
          <div class="row-postcode">
            <input type="text" placeholder="邮政 编码" v-model="postCode">
            <i v-if="isPostCode == true" class="iconfont icon-chuyidong"></i>
            <i v-if="isPostCode == false" class="iconfont icon-htmal5icon22"></i>
            <p v-if="isOther == true">必须填写</p>
          </div>
        </div>
        <myarea @select="haha" pindex="1"></myarea>

        <div class="row-bottom">
          <h2>中国</h2>
          <i class="iconfont icon-htmal5icon22"></i>
        </div>
        <div class="firm">
          <div class="firm-head">
            <h3>企业</h3>
            <i v-if="isCard1" @click="firm" class="iconfont icon-arrow-down"></i>
            <i v-if="isCard1 == false" @click="firm" class="iconfont icon-arrow-up"></i>
          </div>
          <div v-if="isCard" class="firm-con">
            <div class="card">
              <input type="text" placeholder="身份证" v-model="idCard">
              <i v-if="isCardc == true" class="iconfont icon-chuyidong"></i>
              <i v-if="isCardc == false" class="iconfont icon-htmal5icon22"></i>
              <span v-if="isCardc == true">必须填写</span>
            </div>
            <div class="firm-name">
              <input type="text" placeholder="企业名称" v-model="comName">
              <i v-if="isfirmName == true" class="iconfont icon-chuyidong"></i>
              <i v-if="isfirmName == false" class="iconfont icon-htmal5icon22"></i>
              <span v-if="isfirmName">必须填写</span>
            </div>
          </div>
        </div>
        <div class="row-btn">
          <button @click="add">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import myarea from 'vue-myarea'
  import MyHead from "../MyHead/MyHead";

  export default {
    name: "MyProfile",
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
        birthday: "",
        sex: "",
        idCard: "",
        comName: "",
        isShow1: false,
        isHead: false,
        isfirName: false,
        isSecName: false,
        isPhone: false,
        isPhoneT: false,
        isAddress: false,
        isOther: false,
        isPostCode: false,
        isUpdata: false,
        isBirthday: false,
        isCard: false,
        isCard1: false,
        isCardc: false,
        isfirmName: false,
        profileData: [],
      }
    },
    components: {
      myarea,
      MyHead
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      haha(d) {
        this.pro = d.pro.name;
        this.city = d.city.name;
        this.county = d.county.name;
      },
      firm() {
        if (this.isCard == true) {
          this.isCard = false;
          this.isCard1 = false;
        } else {
          this.isCard = true;
          this.isCard1 = true;
        }
      },
      add() {
        let userid = localStorage.getItem("userid");
        if (this.firName && this.secName && this.birthday && this.sex && this.market && this.phone && this.address && this.other && this.postCode && this.pro && this.city && this.county) {
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
          //判断出生日期
          let add5 = /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
          if (add5.test(this.birthday) == true) {
            this.isBirthday = false;
          } else {
            this.isBirthday = true;
          }
          let add3 = /^[0-9]{6}$/;
          if (add3.test(this.postCode) == true) {
            this.isPostCode = false;
          } else {
            this.isPostCode = true;
          }
          if (this.isCard == true && this.idCard != "" && this.comName != "") {
            let reg4 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg4.test(this.idCard) == true) {
              this.isCardc = false;
            } else {
              this.isCardc = true;
            }
            this.isfirmName = false;
          } else {
            this.isfirmName = true;
          }
          this.$axios.post(`${this.$api}/info/update`, {
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
            idCard: this.idCard,
            comName: this.comName,
            birthday: this.birthday,
            sex: this.sex,
          }).then(({data}) => {
            console.log(data);
            if (data.status == 1) {
              this.$router.push("/userCenter");
            } else {
            }
          }).catch((err) => {

          })
        } else {
          console.log(this.sex);
          this.isfirName = true;
          this.isSecName = true;
          this.isPhone = true;
          this.isAddress = true;
          this.isOther = true;
          this.isPostCode = true;
          this.isCardc = true;
          this.isBirthday = true;
          if (this.isCard == true && this.idCard != "" && this.comName != "") {
            let reg4 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg4.test(this.idCard) == true) {
              this.isCardc = false;
            } else {
              this.isCardc = true;
            }
            this.isfirmName = false;
          } else {
            this.isfirmName = true;
          }
        }
      },
    },
    created() {
      this.$axios.get(`${this.$api}/user/info?userid=${localStorage.getItem("userid")}`).then(({data}) => {
        this.profileData = data.data;
        this.firName = this.profileData.firName;
        this.secName = this.profileData.secName;
        this.market = this.profileData.market;
        this.phone = this.profileData.phone;
        this.address = this.profileData.address;
        this.other = this.profileData.other;
        this.postCode = this.profileData.postCode;
        this.pro = this.profileData.province;
        this.city = this.profileData.city;
        this.birthday = this.profileData.birthday;
        this.sex = this.profileData.sex;
        this.idCard = this.profileData.idCard;
        this.comName = this.profileData.comName;
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

  .myProfile {
    position: fixed;
    top: 104px;
    width: 100%;
    height: calc(100% - 104px);
    overflow: scroll;
    z-index: 110;
    .myAddress-row {
      padding: 20px 50px;
      width: calc(100% - 100px);
      div {
        margin-top: 20px;
      }
      .row-xing, .row-ming, .row-site, .row-else, .row-city, .row-room, .row-birthday {
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
      .row-sex {
        width: 50%;
        text-align: center;
        .row-sex-left {
          width: 50%;
          float: left;
        }
        .row-sex-right {
          width: 50%;
          float: left;
        }
        input {
          width: 30px;
          height: 30px;
          margin-bottom: 20px;
          outline: none;
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
      .firm {
        margin-top: 50px;
        .firm-head {
          h3 {
            display: inline-block;
            font-size: 30px;
            margin-right: 10px;
          }
          i {
            font-size: 35px;
          }
        }
        .firm-con {
          display: block;
          .card {
            position: relative;
            top: 0;
            left: 0;
            font-size: 26px;
            input {
              border: none;
              border-bottom: 1px solid #eaeaea;
              height: 72px;
              width: 100%;
              font-weight: 700;
              font-style: italic;
              outline: none;
            }
            input:hover {
              border-bottom: 1px solid black;
            }
            i {
              position: absolute;
              top: 30px;
              right: 30px;
              font-size: 30px;
            }
            ul {
              li {
                display: inline-block;
                width: 49%;
                span {
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  background: #b99d6b;
                  vertical-align: middle;
                }
                p {
                  width: 80%;
                  display: inline-block;
                  vertical-align: middle;
                  font-size: 24px;
                  overflow: hidden;
                  letter-spacing: 1px;
                }
              }
            }
          }
          .firm-name {
            position: relative;
            top: 0;
            left: 0;
            font-size: 26px;
            input {
              border: none;
              border-bottom: 1px solid #eaeaea;
              height: 72px;
              width: 100%;
              font-weight: 700;
              font-style: italic;
              outline: none;
            }
            input:hover {
              border-bottom: 1px solid black;
            }
            i {
              position: absolute;
              top: 30px;
              right: 30px;
              font-size: 30px;
            }
            ul {
              li {
                display: inline-block;
                width: 49%;
                span {
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  background: #b99d6b;
                  vertical-align: middle;
                }
                p {
                  width: 80%;
                  display: inline-block;
                  vertical-align: middle;
                  font-size: 24px;
                  overflow: hidden;
                  letter-spacing: 1px;
                }
              }
            }
          }
          span {
            display: inline-block;
            font-size: 24px;
            color: #a94442;
            letter-spacing: 3px;
            margin: 10px 0;
          }
        }

      }
      .row-bottom {
        margin-top: 10px;
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
