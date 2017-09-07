<template>
    <div class="">
        <!-- swiper -->
        <swiper :options="swiperOption0" id="cube">
            <swiper-slide v-for="image in images1"><img :src="image" alt=""></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <swiper :options="swiperOption">
            <swiper-slide v-for="image in images"><img :src="image" alt=""></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <swiper :options="swiperOption1">
            <swiper-slide v-for="image in images1"><img :src="image" alt=""></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <swiper :options="swiperOption2">
            <swiper-slide v-for="image in images"><img :src="image" alt=""></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: 'demo',
        data() {
            return {
                images:["/images/1.jpg","/images/2.jpg","/images/3.jpg","/images/4.jpg",],
                images1:["/images/4.jpg","/images/2.jpg","/images/3.jpg","/images/1.jpg",],
                swiperOption0: {
                    pagination: '.swiper-pagination',
                    effect: 'cube',
                    grabCursor: true,
                    cube: {
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    },
                    loop: true
                },
                swiperOption: {
                    pagination: '.swiper-pagination',
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 30,
                    loop: true
                },
                swiperOption1: {
                    pagination: '.swiper-pagination',
                    direction: 'vertical',
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 30,
                    mousewheelControl: true
                },
                swiperOption2: {
                    pagination: '.swiper-pagination',
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflow: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows : true
                    }
                }
            }
        }
    }
</script>
<style>
    .swiper-container{
        width: 600px;
        height: 250px;
        margin-bottom: 20px;
    }
    #cube{
        width: 300px;
        height: 300px;
        margin-bottom: 20px;
    }
    img{
        width: 100%;
        height: 100%;
    }
</style>