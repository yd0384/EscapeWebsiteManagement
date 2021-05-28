<template>
    <div class="container">
        <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="768"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
        >
        <b-carousel-slide>
            <template #img>
            <img
                class="d-block img-fluid w-100"
                width="1024"
                height="768"
                src="../assets/Img_door.jpg"
                alt="image slot"
            >
            </template>
        </b-carousel-slide>
        <b-carousel-slide>
            <template #img>
            <img
                class="d-block img-fluid w-100"
                width="1024"
                height="768"
                src="../assets/Img_road.jpg"
                alt="image slot"
            >
            </template>
        </b-carousel-slide>
        <b-carousel-slide>
            <template #img>
            <img
                class="d-block img-fluid w-100"
                width="1024"
                height="768"
                src="../assets/Img_flower.jpg"
                alt="image slot"
            >
            </template>
        </b-carousel-slide>
        <b-carousel-slide>
            <template #img>
            <img
                class="d-block img-fluid w-100"
                width="1024"
                height="768"
                src="../assets/Img_milkyway.jpg"
                alt="image slot"
            >
            </template>
        </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
    export default {
        data() {
        return {
            slide: 0,
            sliding: null
        }
        },
        methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        }
        }
    }
</script>
<style scoped>
    .container{
        width: 50%;
        margin-top: 20px;
    }
</style>