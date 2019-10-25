import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

import '@/router/permisson';
import '@/assets/styles/common.scss'
import * as Util from '@/assets/utils'
import '@/components/AntVue'
import '@/components/MilkVue'


Vue.prototype.$utils = Util;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
