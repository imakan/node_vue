<template>
    <div id="app">
        <div>
            <demoComponent></demoComponent>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex';
    import demoComponent from './components/demo.vue';
	export default {
		name: 'app',
		created(){
			this.setRandomId()
			this.getRandomId()
		},
        components:{
            demoComponent
        },
		methods: {
			...mapActions([
				'setRandomId'
			]),
			...mapGetters([
				'getRandomId'
			])
		}
	}
</script>

<style scoped>

</style>
