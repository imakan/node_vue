<template>
    <div>
        <v-distpicker></v-distpicker>
        <v-distpicker :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
        <v-distpicker type="mobile" class="mod"></v-distpicker>
        <v-distpicker type="mobile" class="mod" province="广东省" city="广州市" area="海珠区"></v-distpicker>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'

    export default {
        data() {
            return {
                select: { province: '广东省', city: '广州市', area: '海珠区' },
            }
        },
        components: { VDistpicker },
    }
</script>
<style>
    .address{
        margin: 50px 100px;
        width: 500px;
    }
    .mod{
        width: 500px;
        height: 300px;
        border: 1px solid #ccc;
    }
    .address-container{
        width: 500px;
        height: 258px;
        overflow-y: auto;
    }
</style>