/**
 * @param resolve
 * 按需引入组件
 */
export const App = resolve => require(['@/App'], resolve)
export const hello = resolve => require(['@/components/Hello'], resolve)
export const notFound = resolve => require(['@/components/notFound'], resolve)
