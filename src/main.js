// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './css.css'
import Vue from 'vue'
import FastClick from 'fastclick'
import store from './store'
import router from './router'
import App from './App'
import { AjaxPlugin, ToastPlugin, cookie } from 'vux'

Vue.prototype.$cookie=cookie
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)

// FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
