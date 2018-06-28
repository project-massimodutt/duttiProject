import Vue from 'vue'
import Router from 'vue-router'
import Index from '../view/Index'
import Login from '../view/Login'
import Register from '../view/Register'
import GoodSearch from '../view/GoodSearch'
import Good from '../view/Good'
import ShoppingCart from '../view/ShoppingCart'
import UserCenter from '../view/UserCenter'
import MyIndent from "../components/UserCenter/MyIndent"
import MyAddress from "../components/UserCenter/MyAddress"
import MyProfile from "../components/UserCenter/MyProfile"
import Newsletter from "../components/UserCenter/Newsletter"
import Download from "../components/UserCenter/Download"
import MyPwd from "../components/UserCenter/MyPwd"
import GoodDetail from "../components/Goods/GoodDetail";
import AddGoods from "../view/addGoods";
import Help from "../view/help"
import EntityStore from "../view/entityStore"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      alias: '/'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/goodSearch',
      name: 'GoodSearch',
      component: GoodSearch,
    },
    //商品列表
    {
      path: '/good',
      name: 'Good',
      component: Good,
    },
    //商品详情
    {
      path: '/goodDetail',
      name: 'GoodDetail',
      component: GoodDetail,
    },
    {
      path: '/shoppingCart',
      name: 'ShoppingCart',
      component: ShoppingCart,
    },
    {
      path: '/userCenter',
      name: 'UserCenter',
      component: UserCenter,
    },
    {
      path: "/myIndent",
      name: "MyIndent",
      component: MyIndent,
    },
    {
      path: "/myAddress",
      name: "MyAddress",
      component: MyAddress,
    },
    {
      path: "/myProfile",
      name: "MyProfile",
      component: MyProfile,
    },
    {
      path: "/newsletter",
      name: "Newsletter",
      component: Newsletter,
    },
    {
      path: "/download",
      name: "Download",
      component: Download,
    },
    {
      path: "/myPwd",
      name: "MyPwd",
      component: MyPwd,
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
    },
    {
      path: '/entityStore',
      name: 'EntityStore',
      component:EntityStore
    },
    {
      path: '/addGoods',
      name: 'AddGoods',
      component: AddGoods,
    },
  ],
  mode: 'history',
})
