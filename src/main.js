import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "lib-flexible/flexible.js";
import moment from "moment"
import VueLazyload from 'vue-lazyload'

// echarts

//引入基本模板
let echarts = require('echarts/lib/echarts')

// 引入折线图等组件
require('echarts/lib/chart/radar')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')//图例翻译滚动

Vue.prototype.$echarts = echarts

// 配置项
const loading = require('./assets/image/giphy.gif')
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  loading
})
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$bus = new Vue()
// Vue.prototype.$moment = moment
Vue.filter('datefmt', function (input, fmtstring) {
  return moment(Number(input)).format(fmtstring);
})
new Vue({
  router,
  store,

  render: (h) => h(App)
}).$mount("#app");
