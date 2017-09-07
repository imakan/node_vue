<template>
    <div class="head">
        {{title}}
    </div>
</template>
<script>
    export default {
        name:'app',
        data(){
            return{
                title:'VUE插件集成'
            }
        },
    }
</script>
<style scoped>
    .head{
        height: 90px;
        font-size: 32px;
        color: #288ce3;
        line-height: 85px;
        font-weight: bold;
        background-color: #fff;
        text-indent: 10px;
    }
</style>