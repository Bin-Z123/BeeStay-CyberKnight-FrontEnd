<template>
    <DialogContent class="sm:max-w-[70rem] sm:max-h-[50rem]">
        <div>
            <img class="w-full h-full" :src="getImageUrl(imagePayload)" alt="">
        </div>

    </DialogContent>
</template>
<script setup lang="ts">
import {
    DialogContent,
} from '@/components/ui/dialog'

import { ref, watch } from 'vue';
const baseUrl = import.meta.env.VITE_CLOUDINARY_IMG_URL;
const getImageUrl = (image: any) => `${baseUrl}/${image}`;

const props = defineProps({
    imageUrl: String
})
const imagePayload = ref(props.imageUrl)
watch(() => props.imageUrl, (newVal) => {
    imagePayload.value = newVal
})
</script>