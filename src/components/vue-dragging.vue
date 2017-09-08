<template>
    <div class="color-list">
        <div
                class="color-item"
                v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
                :key="color.text"
        ><img :src="color.text" alt=""></div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                colors: [{
                    text: "/images/1.jpg"
                }, {
                    text: "/images/2.jpg"
                }, {
                    text: "/images/3.jpg"
                }, {
                    text: "/images/4.jpg"
                }, {
                    text: "/images/5.jpg"
                }, {
                    text: "/images/6.jpg"
                },
                ]
            }
        },
        mounted () {
            this.$dragging.$on('dragged', ({ value }) => {
                console.log(value.item)
                console.log(value.list)
                console.log(value.group)
            })
        }
    }
</script>
<style scoped>
    .color-list{
        clear: both;
        width: 600px;
    }
    .color-item{
        width: 160px;
        height: 160px;
        float: left;
        cursor: move;
        margin: 20px;
    }
    img{
        width: 156px;
        height: 156px;
        border: 2px solid #8c939d;
    }
</style>
