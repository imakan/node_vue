// 'use strict'
require('../theme/index.css')
//swiper的css
require('swiper/dist/css/swiper.css')
import ElementUI from 'element-ui';
import Vue from 'vue'
import vuex from 'vuex'
//引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueDND from 'awe-dnd'
import store from './store'
import router from './router'
//引入Ueditor
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.js'

Vue.use(ElementUI)
Vue.use(vuex)
//使用swiper
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

