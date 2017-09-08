import Vue from 'vue'
import Router from 'vue-router'
import * as routeType from './routeType'
Vue.use(Router)

//路由
const routes = [
    {
        path: '/',
	    components: {
		    default: routeType.App
	    },
        children:[
            {
                path: '/Vue-Awesome-Swiper',
                name:'欢迎',
                component: routeType.VueAwesomeSwiper,
	            meta:{requireAuthZ:true}
            },
            {
                path: '/v-distpicker',
                name:'欢迎',
                component: routeType.VDistpicker,
                meta:{requireAuthZ:true}
            },
            {
                path: '/vue-dragging',
                name:'欢迎',
                component: routeType.vueDragging,
                meta:{requireAuthZ:true}
            },
        ]
    },



	{ path: '*', component: routeType.notFound } //404页面
]
var _router = new Router({
	mode: 'history',
	routes:routes,
	scrollBehavior (to, from, savedPosition) {
		// to 和 from 都是 路由信息对象
		//savePosition方法接收to和from路由对象，第三个参数savePosition当且仅当（通过浏览器的前进或者后退的按钮触发时才能用）
		return { x: 0, y: 0 }
	}
})

_router.beforeEach((to, from, next) => {
	// console.log(to)  //to:router即将要进入的目标路由对象
	// console.log(from) //Router当前导航正要离开的路由
	// console.log(next) //Function 一定要调用该方法来resolve这个钩子，执行效果依赖next方法的调用参数
	//next()进行管道中的下一个钩子，如果全部钩子执行完了，则导航的状态就是confirmed(确认的)。
	//next(false)中断当前的导航，如果浏览器的URL改变了（可能是用户手动或者浏览器后退按钮后），那么URL地址或重置到from路由对应的地址
	//next('/')或者next({path:'/'})：跳转到一个不同的地址，当前的导航被中断，然后进新的导航
	//确保要调用next方法，否则钩子就不会resolved
	next()
	// ...
})

export default _router
