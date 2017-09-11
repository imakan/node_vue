<template>
    <div id="app" style="clear: both;">
        <head-component></head-component>
        <div class="left">
            <demoComponent></demoComponent>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex';
    import demoComponent from './components/demo.vue';
    import headComponent from "./components/head.vue"
	export default {
		name: 'app',
		created(){
			this.setRandomId()
			this.getRandomId()
//            this.$router.push({path: '/Vue-Awesome-Swiper'});
		},
        components:{
            demoComponent,
            headComponent
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
    .left{
        float: left;
        width: 15%;
        height: 100%;
    }
    .right{
        float: left;
        width: 83%;
        min-height: 500px;
        background: #fff;
        margin: 10px 1%;
        padding: 10px 0;
    }
</style>
