import Vue from 'vue'
const state = {
	randomId: Math.floor(Math.random() * 1000),//随机生成验证码ID
	menu:1

	// activeType: null,
	// itemsPerPage: 20,
	// items: {/* [id: number]: Item */},
	// users: {/* [id: string]: User */},
	// lists: {
	// 	top: [/* number */],
	// 	new: [],
	// 	show: [],
	// 	ask: [],
	// 	job: []
	// }
};
const mutations = {
	//随机生成验证码ID
	RANDOMNUMBER:(state, mutation) => {
		state.randomId = mutation.randomId;
	},
    MENUNUMBER:(state, mutation) => {
        state.menu = mutation.menu;
	}


	// FETCH_USER:(state, {type}) => {
	// 	state.randomId = mutation.randomId;
	// },

	// SET_ACTIVE_TYPE: (state, {type}) => {
	// 	state.activeType = type
	// },
	//
	// SET_LIST: (state, {type, ids}) => {
	// 	state.lists[type] = ids
	// },
	//
	// SET_ITEMS: (state, {items}) => {
	// 	items.forEach(item => {
	// 		if (item) {
	// 			Vue.set(state.items, item.id, item)
	// 		}
	// 	})
	// },
	//
	// SET_USER: (state, {id, user}) => {
	// 	Vue.set(state.users, id, user || false)
	// 	/* false means user not found */
	// }
}

export default{
	state,
	mutations
}
