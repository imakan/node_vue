<template>
    <div class="demo">
        <h1>{{ msg }}</h1>
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
        mounted(){
        	console.log(process.env.NODE_ENV)
        }
    }
</script>
