'use strict'
require('../theme/index.css')
require('swiper/dist/css/swiper.css')
import ElementUI from 'element-ui';
import Vue from 'vue'
import vuex from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueDND from 'awe-dnd'
import store from './store'
import router from './router'
Vue.use(ElementUI)
Vue.use(vuex)
Vue.use(VueAwesomeSwiper)
Vue.use(VueDND)
Vue.config.devtools = true
Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm) {
    console.log('vue发生错误：',err)
}

new Vue({
    name: 'container',
    el: "#app",
	store,
    router,
    // render:h => h(App)
})

