import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

import { message,notification } from 'ant-design-vue';

import '@/router/permisson';
import '@/assets/styles/common.scss'

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
