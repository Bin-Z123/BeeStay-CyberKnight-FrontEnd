<template>
    <section>
        <div class="bg-white">
            <div class="w-full lg:h-[700px] md:h-[600px] h-96 relative">
                <div class="bg-[url('@/assets/images/header__bg.webp')] bg-cover bg-center h-full w-full"></div>
                <div class="absolute inset-0 bg-blue-900/40"></div>
            </div>
            <div class="container mx-auto pt-25">
                <div class="flex">
                    <div class="w-2/3">
                        <div>
                            <h1 class="text-4xl font-bold">Phòng Thượng Hạng</h1>
                            <p class="text-2xl text-muesli-400">120.000 VNĐ</p>
                            <div class="flex items-center gap-4 text-gray-500">
                                <span>
                                    <Square class="inline-block w-5 h-5" />30 m²
                                </span>
                                <span>
                                    <User class="inline-block w-5 h-5" />30 m²
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/3">
                        <div class="bg-gray-100 h-full w-full rounded-2xl">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { Square, User } from 'lucide-vue-next';
</script>