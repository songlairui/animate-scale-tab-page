import Vue from 'vue'
import App from './App.vue'
import VueRx from 'vue-rx'
import TransferDom from 'v-transfer-dom'
import Lib from './lib'

Vue.use(TransferDom)
Vue.use(VueRx)
Vue.use(Lib)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
