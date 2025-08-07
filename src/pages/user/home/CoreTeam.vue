<template>
    <div class="flex flex-col container mx-auto py-25 gap-5 items-center justify-center px-4 lg:px-0"
        data-aos="fade-up">
        <p class="text-2xl text-muesli-400">Nhóm Chúng Tôi</p>
        <h1 class="text-4xl font-bold">Đội Ngũ Phát Triển</h1>
        <div ref="users" class="keen-slider">
            <div class="keen-slider__slide flex flex-col justify-center items-center gap-2">
                <img src="@/assets/images/bin.png" alt="" class="rounded-2xl">
                <h1 class="font-bold text-2xl">Võ Thanh Bin</h1>
                <p class="text-sm">Full Stack Developer</p>
            </div>
            <div class="keen-slider__slide flex flex-col justify-center items-center gap-2">
                <img src="@/assets/images/bin.png" alt="" class="rounded-2xl">
                <h1 class="font-bold text-2xl">Võ Thanh Bin</h1>
                <p class="text-sm">Full Stack Developer</p>
            </div>
            <div class="keen-slider__slide flex flex-col justify-center items-center gap-2">
                <img src="@/assets/images/bin.png" alt="" class="rounded-2xl">
                <h1 class="font-bold text-2xl">Võ Thanh Bin</h1>
                <p class="text-sm">Full Stack Developer</p>
            </div>
            <div class="keen-slider__slide flex flex-col justify-center items-center gap-2">
                <img src="@/assets/images/bin.png" alt="" class="rounded-2xl">
                <h1 class="font-bold text-2xl">Võ Thanh Bin</h1>
                <p class="text-sm">Full Stack Developer</p>
            </div>
            <div class="keen-slider__slide flex flex-col justify-center items-center gap-2">
                <img src="@/assets/images/bin.png" alt="" class="rounded-2xl">
                <h1 class="font-bold text-2xl">Võ Thanh Bin</h1>
                <p class="text-sm">Full Stack Developer</p>
            </div>
            <div class="keen-slider__slide flex flex-col justify-center items-center gap-2">
                <img src="@/assets/images/bin.png" alt="" class="rounded-2xl">
                <h1 class="font-bold text-2xl">Võ Thanh Bin</h1>
                <p class="text-sm">Full Stack Developer</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useKeenSlider } from 'keen-slider/vue'

const [users] = useKeenSlider({
    loop: true,
    slides: {
        perView: 6,
        spacing: 15,
    },
    breakpoints: {
        '(max-width: 768px)': {
            slides: {
                perView: 1,
                spacing: 10,
            },
        },
    },
})
</script>