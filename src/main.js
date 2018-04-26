// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App';
import router from './router';
// import './libs/jquery-3.2.1.min.js';
import './libs/base.css';
import './libs/fonticon.js';
import echarts from "echarts";
import store from './store';
import axios from 'axios';
Vue.prototype.$http = axios;
import qs from 'qs';
Vue.prototype.qs = qs;
Vue.use(ElementUI, echarts);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
