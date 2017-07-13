'use strict'
require('../theme/index.css')
import ElementUI from 'element-ui';
import Vue from 'vue'
import vuex from 'vuex'
import store from './store'
import router from './router'
Vue.use(ElementUI)
Vue.use(vuex)
Vue.config.devtools = true
Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm) {
    console.log('vue发生错误：',err)
}

new Vue({
    name: 'container',
    el: "#app",
	store,
    router
    // render:h => h(App)
})

