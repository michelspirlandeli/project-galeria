import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import galeriaServices from './services/galeriaServices';
import {configClass} from './classes/configClass';

let server = `${configClass.getUrlApi().toString()}`;

Vue.prototype.$galeriaServices = galeriaServices
Vue.prototype.$server = server


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
