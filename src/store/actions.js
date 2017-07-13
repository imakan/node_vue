// dispatch 和comit的区别 ：异步操作与同步操作的区别
export default {
	setRandomId:({commit, state}) => {
		commit('RANDOMNUMBER',{
			randomId: Math.floor(Math.random() * 1000)
		})
	},
	ENSURE_ACTIVE_ITEMS: ({dispatch, getters}) => {
		return dispatch('FETCH_ITEMS', {
			ids: getters.activeIds
		})
	},
	FETCH_USER: ({commit, state}, {id}) => {
		return state.users[id]
			? Promise.resolve(state.users[id])
			: fetchUser(id).then(user => commit('SET_USER', {id, user}))
	}
}






// export const setRandomId = ({commit}) => {
// 	dispatch(FETCH_USER, {
// 		randomId: Math.floor(Math.random() * 1000)
// 	})
// }
