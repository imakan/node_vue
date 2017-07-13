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
                msg: 'bbbbbb '
            }
        },
        mounted(){
        	console.log(process.env.NODE_ENV)
        }
    }
</script>
