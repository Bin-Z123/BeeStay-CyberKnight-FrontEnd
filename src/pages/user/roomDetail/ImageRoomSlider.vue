<template>
    <div>
        <div ref="container" class="keen-slider rounded-2xl">
            <div v-for="(image, index) in images" :class="`number-slide${index + 1}`"
                class="keen-slider__slide relative rounded-2xl group " @click="clickButton(image.url)">
                <img class="w-full h-full object-cover rounded-2xl" :src="getImageUrl(image.url)">
                <div
                    class=" absolute group-hover:translate-y-0 translate-y-full transition group-hover:opacity-100 bg-black/30 bottom-0 left-0 w-full h-full  ">
                    <div
                        class=" group-hover:scale-110 transition  absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <eye class=" text-white" />
                        <div class=" text-white">Xem Ảnh</div>
                    </div>

                </div>
            </div>
        </div>
        <div ref="thumbnail" class="keen-slider thumbnail ">
            <div v-for="(image, index) in images" :class="`number-slide${index + 1}`"
                class="relative keen-slider__slide h-26 mt-3  cursor-pointer rounded-2xl">
                <img class="w-full h-full object-cover" :src="getImageUrl(image.url)">
                <div
                    class="absolute top-0 right-0 text-white bg-muesli-500 size-8 rounded-bl-xl flex flex-col justify-center items-center">
                    <div>{{ index + 1 }}</div>
                </div>
            </div>
        </div>
    </div>
    <Dialog v-model:open="isOpen">
        <preview-image-room :imageUrl="imagePayload" />
    </Dialog>

</template>
<script setup lang="ts">
import {
    Dialog,

    DialogTrigger,
} from '@/components/ui/dialog'
import { useKeenSlider } from "keen-slider/vue.es"
import "keen-slider/keen-slider.min.css"
import { useThumbnailPluginKeenSlider } from "@/hook/useKeenSlider";
import { Eye } from 'lucide-vue-next';
import PreviewImageRoom from "./PreviewImageRoom.vue";
import { ref } from 'vue';

const props = defineProps({
    images: Array
})
const isOpen = ref(false)
const baseUrl = import.meta.env.VITE_CLOUDINARY_IMG_URL;
const getImageUrl = (image: any) => `${baseUrl}/${image}`;
// KEEN SLIDER

const [container, slider] = useKeenSlider({
    initial: 0,
    loop: true,
});
const [thumbnail] = useKeenSlider({
    initial: 0,
    // loop: true,
    slides: {
        perView: 4,
        spacing: 10,
    }

}, [useThumbnailPluginKeenSlider(slider)])

// Show Image
const imagePayload = ref("")
const clickButton = (image: any) => {
    imagePayload.value = image
    isOpen.value = true
    console.log("imagePayload.value", imagePayload.value)
}


</script>

<style>
.active {
    border: 3px dashed #ab8a62 !important;
}

/* .thumbnail .keen-slider__slide {
    font-size: 30px;
    margin-top: 10px;
    height: 100px;
} */

/* .thumbnail .keen-slider__slide {
    cursor: pointer;        
}

.thumbnail .keen-slider__slide.active {
    border: 2px dashed black;
} */
</style>