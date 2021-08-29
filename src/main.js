import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 事件总线
Vue.prototype.$EventBus = new Vue()

import "./plugins/vant.js"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
