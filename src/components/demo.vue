<template>
    <div class="demo">
        <el-col :span="4">
            <el-menu default-active="1" class="el-menu-vertical-demo">
                <el-menu-item index="1" @click="locationHref('/hello')">导航一</el-menu-item>
                <el-menu-item index="2" @click="locationHref('/')">导航二</el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                msg: 'bbbbbbsdasda'
            }
        },
        watch:{
            '$route'(to,from){
	            // 对路由变化作出响应...
            }
        },
        methods: {
            locationHref(href){
                let vm=this;
                vm.$router.push({path: href})
            }
        },
        mounted(){
        	console.log(process.env.NODE_ENV)
        }
    }
</script>
<style scoped>

</style>
