import Vue from 'vue'
import App from './App.vue'
import VueRx from 'vue-rx';
import TransferDom from 'v-transfer-dom'

Vue.use(TransferDom)
Vue.use(VueRx);

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
