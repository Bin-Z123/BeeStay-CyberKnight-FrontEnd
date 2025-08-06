<template>
    <h1>TEST GSAP</h1>
    <div class="box box1 h-40">1</div>
    <div class="box box2 h-60" data-speed="0.5">2</div>
    <div class="box box3 h-100" data-speed="0.7">3</div>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { onMounted } from "vue";

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

onMounted(() => {
    // let smoother = ScrollSmoother.create({
    //     smooth: 1.5,
    //     effects: true
    // })
    // smoother.effects(".box")
})
</script>
<style scoped>
@import "tailwindcss";
@import "tw-animate-css";

.box {
    @apply w-40 bg-amber-500 text-center justify-self-center
}

.box {
    /* position: absolute; */
    margin-top: 80vh;
}

#smooth-content1 {
    /* overflow: hidden; */
    width: 100%;
    /* set a height because the contents are position: absolute, thus natively there's no height */
    /* height: 4000px; */
}
</style>