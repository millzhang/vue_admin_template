import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

import { message, notification, Modal } from 'ant-design-vue';

import '@/router/permisson';
import '@/assets/styles/common.scss'
import * as Util from '@/assets/utils'

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$utils = Util;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
