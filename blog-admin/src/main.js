import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import VueBus from 'vue-bus';


import 'mavon-editor/dist/css/index.css'
import "element-ui/lib/theme-chalk/index.css"
import "./utils/axios"
import "./utils/permission"

Vue.use(mavonEditor)
Vue.use(Element)
Vue.use(VueBus);

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

