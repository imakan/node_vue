<template>
    <div class="menu-box">
        <div class="menu-box">
            <el-col>
                <el-menu :default-active="''+getMenu()" class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="locationHref('/Vue-Awesome-Swiper',1)">Vue-Awesome-Swiper</el-menu-item>
                    <el-menu-item index="2" @click="locationHref('/v-distpicker',2)">Vue-distpicker</el-menu-item>
                    <el-menu-item index="3" @click="locationHref('/vue-dragging',3)">Vue-dragging</el-menu-item>
                </el-menu>
            </el-col>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'demo',
        data () {
            return {
                msg: 'bbbbbbsdasda',
            }
        },
        watch:{
            '$route'(to,from){
	            // 对路由变化作出响应...
            }
        },
        created() {
            let vm=this;
            console.log(vm.getMenu());
        },
        methods: {
            locationHref(href,index){
                let vm=this;
                vm.setMenu(index);
                console.log(vm.getMenu());
                vm.$router.push({path: href})
            },
            ...mapActions([
                'setMenu',
            ]),
            ...mapGetters([
                'getMenu',
            ])
        },
        mounted(){
        	console.log(process.env.NODE_ENV)
        }
    }
</script>
<style scoped>
    /*左侧栏更改element插件样式*/
    .menu-box .el-menu{
        background-color: #e1ecfa;
    }
    .menu-box .el-menu-item.is-active {
        color: #fff;
        background: #20a0ff;
        height: 50px;
        line-height: 50px;
        text-align: left;
    }
    .menu-box .el-menu-item:hover{
        background: #9dc4e9;
        color: #fff;
        height: 50px;
        line-height: 50px;
    }
    .menu-box .el-menu-item{
        height: 50px;
        line-height: 50px;
    }
    .hide-btn{
        text-align:right;
    }
</style>
