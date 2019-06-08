import Tab from './Tab'
import TabContent from './TabContent'

export { Tab, TabContent }

export default {
  install(Vue) {
    Vue.component('Tab', Tab)
    Vue.component('TabContent', TabContent)
  }
}
