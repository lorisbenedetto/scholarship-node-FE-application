// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'

import axios from 'axios'

Vue.use(BootstrapVue)

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {App},
    template: '<App/>',
})
