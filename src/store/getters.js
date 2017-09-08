export default {
	activeIds (state) {
		const {activeType, itemsPerPage, lists} = state

		if (!activeType) {
			return []
		}
		const page = Number(state.route.params.page) || 1
		const start = (page - 1) * itemsPerPage
		const end = page * itemsPerPage
		return lists[activeType].slice(start, end)
	},

	activeItems (state, getters) {
		return getters.activeIds.map(id => state.items[id]).filter(_ => _)
	},
	getRandomId(state,getters){
		// console.log(getters)   //这里不能写getters.activeIds  形成递归 造成栈溢出
		return state.mutations.randomId;
	},
	getMenu(state,getters){
		return state.mutations.menu;
	}
}
