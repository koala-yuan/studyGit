// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mintui from 'mint-ui'
import axios from 'axios'

import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import mui from './lib/mui/js/mui.js'
import moment from 'moment'
import VuePreview from 'vue-preview'
import Vuex from 'vuex'

Vue.use(VuePreview)
Vue.use(mintui)
Vue.use(Vuex)
Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.mui = mui

axios.defaults.baseURL = 'http://www.liulongbin.top:3005'

// 定义一个全局的时间过滤器
Vue.filter('timeFilter', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

var car = JSON.parse(localStorage.getItem("car")) || []
var store = new Vuex.Store({
  state: {
    count: 77,
    car: car
  },
  mutations: {
    addcount(state) {
      state.count++
    },
    jiancount(state, arr) {
      state.count -= (arr[0] + arr[1])
    },
    addToCar(state, goodsinfo) {
      var flag = true;
      // 获取之后添加，添加之前要判断ｉｄ是否重复，如果重复就只加count，否则才添加数组
      state.car.forEach(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(item.count) + parseInt(goodsinfo.count);
          flag = false;
        }
      })
      if (flag) {
        // 如果flag为假说明上面遍历的时候存在id重复，就不执行添加的操作，直接修改count的值
        state.car.push(goodsinfo)
      }
      localStorage.setItem("car", JSON.stringify(state.car))
    },
    removeFormcar(state, id) {
      // 删除car中的数据，然后更新本地存储
      state.car.forEach((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car))
    },
    updateGoods(state, info) {
      // 更新选中
      state.car.forEach((item, i) => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car))
    },
    btnchange(state, info) {
      state.car.forEach(item => {
        if (item.id == info.id) {
          item.count = info.num

        }
      })
      localStorage.setItem("car", JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount(state) {
      var c = 0
      state.car.forEach(item => {
        c += parseInt(item.count)
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var d = {}
      state.car.forEach(item => {
        d[item.id] = item.selected
      })
      return d
    },
    getGoodscountsum(state) {
      var o = {
        count: 0,
        amout: 0
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += parseInt(item.count)
          o.amout += item.count * item.price
        }

      })
      return o
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
