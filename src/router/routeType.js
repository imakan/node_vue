/**
 * @param resolve
 * 按需引入组件
 */
export const App = resolve => require(['@/App'], resolve)
export const VueAwesomeSwiper = resolve => require(['@/components/Vue-Awesome-Swiper'], resolve)
export const notFound = resolve => require(['@/components/notFound'], resolve)
export const VDistpicker = resolve => require(['@/components/v-distpicker'], resolve)
export const vueDragging = resolve => require(['@/components/vue-dragging'], resolve)