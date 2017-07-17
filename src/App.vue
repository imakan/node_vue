<template>
    <div id="app">
        <img src="~assets/logo.png">
        <transition>
            <router-view class="view one"></router-view>
            <router-view class="view two" name="a"></router-view>
            <router-view class="view three" name="b"></router-view>
        </transition>
    </div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	export default {
		name: 'app',
		created(){
			this.setRandomId()
			this.getRandomId()
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

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
