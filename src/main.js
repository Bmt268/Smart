import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "lib-flexible/flexible.js";
import moment from "moment"

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$bus = new Vue()
Vue.prototype.$moment = moment
// Vue.filter('datefmt', function (input, fmtstring) {
//   return moment(input).format(fmtstring);
// })
new Vue({
  router,
  store,

  render: (h) => h(App)
}).$mount("#app");
