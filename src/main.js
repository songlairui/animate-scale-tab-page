import Vue from 'vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import App from './App.vue'

Vue.use(VueVirtualScroller)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
