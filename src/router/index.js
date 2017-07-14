import Vue from 'vue'
import Router from 'vue-router'
import * as routeType from './routeType'
Vue.use(Router)

//路由
const routes = [
    {
        path: '/',
        component: routeType.App,
        children:[
            {
                path: '/hello',
                name:'欢迎',
                component: routeType.hello
            },
            {
                path: '/demo',
                component: routeType.demo
            },
        ]
    },



	{ path: '*', component: routeType.notFound } //404页面
]


export default new Router({
    mode: 'history',
    routes:routes,
    scrollBehavior (to, from, savedPosition) {
	    // to 和 from 都是 路由信息对象
        return { x: 0, y: 0 }
    }
})
