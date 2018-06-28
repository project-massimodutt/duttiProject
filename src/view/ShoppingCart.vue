<template>
  <div>
    <div class="cart">
      <div class="cart-head">
        <div class="cart-head-left">
          <i @click="back" class="iconfont icon-fanhui"></i>
        </div>
        <div class="cart-head-min">
          <h1>查看购物车</h1>
        </div>
        <div class="cart-head-right">
          <div class="cart-edit">
            <p @click="show" v-if="isShow">ok</p>
            <p @click="show" v-if="isShow2">编辑</p>
          </div>
        </div>
      </div>
      <div class="cart-con">
        <div v-if="isContext1" class="cart-ul">
          <ul>
            <li v-for="(item,index) in cartData">
              <div class="cart-ul-li">
                <div class="cart-ul-li-con">
                  <div @click="check(item.goodsid)" class="cart-ul-li-left">
                    <img :src="item.showPic" alt="">
                  </div>
                  <div class="cart-ul-li-right">
                    <p @click="check(item.goodsid)">{{item.goodName}}</p>
                    <p>货号 <span>2018/074/710</span></p>
                    <div class="colpic">
                      <span>{{item.color}}</span>
                      <img :src="item.colPic" alt="">
                    </div>
                    <div class="size">
                      <span>{{item.size}}</span>
                    </div>
                    <div class="right-bottom">
                      <div class="right-bottom-left">
                        <p>数量 <span>{{item.count}}</span></p>
                      </div>
                      <div class="right-bottom-right">
                        <p>¥ {{item.oldPrice}}<i></i></p>
                        <span>¥ 590</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="isEdi" class="cart-ul-li-bottom">
                  <div class="cart-ul-li-bottom-left">
                    <span @click="del(index)">-</span>
                    <span>{{item.count}}</span>
                    <span @click="add(index)">+</span>
                  </div>
                  <div class="cart-ul-li-bottom-right">
                    <span @click="check(item._id)">查看</span>
                    <span @click="dell(index)">删除</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="cart-ul-bottom">
            <div class="cart-ul-bottom-head">
              <span>产品</span>
              <span>¥ {{money}}</span>
            </div>
            <div class="cart-ul-bottom-mid">
              <span>预计的运费</span>
              <span>¥ 10.00</span>
            </div>
            <div class="cart-ul-bottom-bot">
              <span>总计（包括增值税）</span>
              <span>¥ {{money+10}}</span>
            </div>
          </div>
        </div>
        <div v-if="isContext1" class="cart-bottom">
          <div class="cart-bottom-head">
            <span>总计（包括增值税）</span>
            <span>¥ {{money+10}}</span>
          </div>
          <button @click="ha">继续</button>
        </div>
        <div v-if="isContext" class="cart-con-text">
          <h2>购物车为空!</h2>
        </div>
      </div>
    </div>
    <div v-if="isYes == true" class="al">
      <div class="al-con">
        <div class="al-con-txt">
          <p>确认购买吗</p>
          <div>
            <button @click="yes('已支付')">确认</button>
            <button @click="yes('未支付')">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShoppingCart",
    data() {
      return {
        isShow: false,
        isShow2: true,
        isEdi: false,
        cartData: [],
        isYes: false,
        isContext: false,
        isContext1: true,
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      show() {
        this.isShow = !this.isShow;
        this.isShow2 = !this.isShow2;
        if (this.isShow == true) {
          this.isEdi = true;
        } else {
          this.isEdi = false;
        }
      },
      dell(index) {
        this.$axios.get(`${this.$api}/cart/del?cartid=${this.cartData[index]._id}`).then(({data}) => {
          console.log(data);
          if (data.status == 1) {
            this.cartData.splice(index, 1);
          } else {
            alert(data.msg);
          }
        }).catch((err) => {
          console.error(err);
        })
      },
      del(index) {
        this.cartData[index].count--;
        if (this.cartData[index].count <= 0) {
          this.$axios.get(`${this.$api}/cart/del?cartid=${this.cartData[index]._id}`).then(({data}) => {
            console.log(data);
            if (data.status == 1) {
              this.cartData.splice(index, 1);
            } else {
              alert(data.msg);
            }
          }).catch((err) => {
            console.error(err);
          })
        } else {
          this.$axios.post(`${this.$api}/cart/update`, {
            cartid: this.cartData[index]._id,
            count: this.cartData[index].count,
          }).then(({data}) => {
            console.log(data);
            if (data.status == 0) {
              alert(data.msg);
            }
          }).catch((err) => {
            console.error(err);
          })
        }
      },
      add(index) {
        this.cartData[index].count++;
        this.$axios.post(`${this.$api}/cart/update`, {
          cartid: this.cartData[index]._id,
          count: this.cartData[index].count,
        }).then(({data}) => {
          console.log(data);
          if (data.status == 0) {
            alert(data.msg);
          }
        }).catch((err) => {
          console.error(err);
        })
      },
      yes(status) {
        this.$axios.post(`${this.$api}/order/add`, {
          userid: localStorage.getItem("userid"),
          status: status,
          goods: this.cartData,
        }).then(({data}) => {
          console.log(data);
          if (data.status == 1) {
            for (let j of this.cartData) {
              this.$axios.get(`${this.$api}/cart/del?cartid=${j._id}`).then(({data}) => {
                console.log(data);
                if (data.status == 1) {
                  location.reload();
                } else {
                  alert(data.msg);
                }
              }).catch((err) => {
                console.error(err);
              })
            }
          } else {
            alert(data.msg);
          }
        }).catch((err) => {
          console.error(err);
        })
        if (this.isYes == true) {
          this.isYes = false;
        } else {
          this.isYes = true;
        }
      },
      ha() {
        if (this.isYes == false) {
          this.isYes = true;
        } else {
          this.isYes = false;
        }
      },
      check(id) {
        this.$router.push({
          name: 'GoodDetail',
          query: {goodId: id, goodsId: []},
        })
      }
    },
    created() {
      if (!localStorage.getItem('userid')) {
        this.$router.go(-1);
      } else {
        this.$axios.get(`${this.$api}/user/cart`).then(({data}) => {
          console.log(data);
          this.cartData = data.data;
          console.log(this.cartData)
          if (this.cartData.length <= 0) {
            this.isContext = true;
            this.isContext1 = false;
          } else {
            this.isContext = false;
            this.isContext1 = true;
          }
        }).catch((err) => {
          console.error(err)
        })
      }
    },
    computed: {
      money() {
        let money1 = 0;
        for (let i of this.cartData) {
          money1 += i.count * i.price;
        }
        return money1;
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    .cart-head {
      position: relative;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      height: 102px;
      
      .cart-head-left {
        padding-left: 10px;
        i {
          font-size: 36px;
          color: #505252;
          font-weight: 400;
          line-height: 102px;
        }
      }
      .cart-head-min {
        font-size: 28px;
        letter-spacing: 2px;
        color: inherit;
        font-weight: 800;
        line-height: 102px;
      }
      .cart-head-right {
        .cart-edit {
          p {
            width: 110px;
            font-size: 22px;
            letter-spacing: 2px;
            font-weight: 400;
            text-align: center;
            line-height: 102px;
          }
        }
      }
    }
    .cart-con {
      padding: 40px;
      width: calc(100% - 80px);
      .cart-ul {
        width: 100%;
        li {
          border-bottom: 1px solid rgb(234, 234, 234);
          .cart-ul-li {
            padding: 20px 0;
            .cart-ul-li-con {
              overflow: hidden;
              .cart-ul-li-left {
                width: 160px;
                height: 212px;
                float: left;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .cart-ul-li-right {
                float: left;
                width: 469px;
                color: #505252;
                padding: 0 20px;
                p {
                  font-size: 22px;
                  font-weight: 700;
                  letter-spacing: 2px;
                  line-height: 30px;
                }
                .colpic {
                  margin: 12px 0 16px;
                  span {
                    font-size: 22px;
                    letter-spacing: 2px;
                    vertical-align: top;
                  }
                  img {
                    vertical-align: top;
                    display: inline-block;
                    width: 36px;
                    height: 36px;
                  }
                }
                .size {
                  font-size: 20px;
                  line-height: 28px;
                  margin-bottom: 18px;
                  margin-right: 4px;
                  letter-spacing: 2px;
                }
                .right-bottom {
                  overflow: hidden;
                  .right-bottom-left {
                    float: left;
                    p {
                      font-size: 20px;
                      font-weight: 500;
                    }
                  }
                  .right-bottom-right {
                    float: right;
                    padding-right: 40px;
                    p {
                      letter-spacing: 0px;
                      margin-bottom: 5px;
                      position: relative;
                      top: 0;
                      left: 0;
                      i {
                        display: block;
                        width: 100%;
                        border-bottom: 2px solid black;
                        position: absolute;
                        top: 17px;
                      }
                    }
                    span {
                      color: red;
                      font-weight: 700;
                      font-size: 22px;
                    }
                  }
                }
              }
            }
            .cart-ul-li-bottom {
              width: 100%;
              height: 100px;
              border-top: 1px solid black;
              border-bottom: 1px solid black;
              margin-top: 5px;
              overflow: hidden;
              color: #505252;
              .cart-ul-li-bottom-left {
                float: left;
                width: 160px;
                height: 100%;
                padding: 0 40px;
                display: flex;
                justify-content: space-between;
                span {
                  line-height: 100px;
                  font-size: 26px;
                  letter-spacing: 2px;
                  
                }
              }
              .cart-ul-li-bottom-right {
                float: right;
                width: 200px;
                display: flex;
                justify-content: space-between;
                padding: 0 20px;
                vertical-align: middle;
                span {
                  line-height: 100px;
                }
              }
            }
          }
        }
        .cart-ul-bottom {
          color: #505252;
          margin-bottom: 260px;
          .cart-ul-bottom-head {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            padding-bottom: 10px;
            span:nth-child(2) {
              font-weight: 700;
            }
          }
          .cart-ul-bottom-mid {
            display: flex;
            justify-content: space-between;
            margin-bottom: 60px;
            span:nth-child(2) {
              font-weight: 700;
            }
          }
          .cart-ul-bottom-bot {
            display: flex;
            justify-content: space-between;
            span {
              font-weight: 700;
            }
          }
        }
      }
      .cart-bottom {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 650px;
        height: 128px;
        padding: 36px 50px 70px;
        background: #eaeaea;
        .cart-bottom-head {
          display: flex;
          justify-content: space-between;
          height: 46px;
          span {
            font-weight: 600;
            color: #505252;
          }
        }
        button {
          width: 100%;
          font-size: 26px;
          padding: 26px 30px;
          text-align: center;
          background: #b99d6b;
          color: white;
        }
      }
      .cart-con-text {
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: gray;
      }
    }
  }
  
  .al {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    .al-con {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 300px;
      height: 500px;
      text-align: center;
      .al-con-txt {
        width: 100%;
        height: 120px;
        background: white;
        color: #505252;
        p {
          padding-top: 10px;
          font-size: 30px;
          font-weight: 700;
        }
        div {
          padding-top: 15px;
          button {
            padding: 10px 20px;
          }
        }
      }
    }
  }
</style>
