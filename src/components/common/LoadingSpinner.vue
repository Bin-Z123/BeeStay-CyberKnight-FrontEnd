<template>
    <div class="absolute inset-0 z-30 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
        <div class="flex flex-col items-center justify-center">
            <div class="text-4xl font-bold text-blue-500 animate-spin">
                <Loader />
            </div>
            <p class="mt-2 text-black text-sm">Đang tải dữ liệu, xin chờ xíu nha...</p>
        </div>
    </div>
</template>
<script setup>
import { Loader } from 'lucide-vue-next';
</script>
