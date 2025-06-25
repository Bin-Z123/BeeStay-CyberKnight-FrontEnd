<template>
    <section>
        <div class="py-20 flex md:flex-row flex-col">
            <div class="md:w-1/2">
                <h1 class="text-4xl font-bold md:text-right mx-4 text-center">
                    Tham Gia Bản Tin Của Chúng Tôi
                </h1>
            </div>
            <div class="md:w-1/2 md:mt-0 mt-10 flex items-center justify-center md:justify-start px-4">
                <div class="relative w-full md:w-3/5">
                    <input type="email" class="w-full h-14 rounded-sm bg-white focus:outline-none px-5 shadow-sm pr-32 focus:ring-2 focus:ring-muesli-200"
                        placeholder="Nhập email" />
                    <button
                        class="absolute top-1.5 right-1.5 h-11 px-4 rounded-sm bg-muesli-400 hover:bg-muesli-600 text-white">
                        Theo Dõi
                    </button>
                </div>
            </div>
        </div>
        <div class="flex md:flex-row flex-col container md:mx-auto md:px-0 px-4 mb-10 gap-5">
            <div class="md:w-4/10 md:mx-auto mx-1">
                <img src="@/assets/images/BeeStay.png" alt="" class="w-1/3">
                <h1 class="md:ps-6 md:pe-40 text-gray-500">Each room features plush bedding, high-quality linens, and a
                    selection of ensure a restful night's sleep.</h1>
            </div>
            <div class="md:w-2/10">
                <h1>Liên Kết</h1>
                <div class="text-gray-500 flex flex-col gap-2 pt-5 text-sm">
                    <RouterLink to="">Phòng</RouterLink>
                    <RouterLink to="">Phòng</RouterLink>
                    <RouterLink to="">Phòng</RouterLink>
                    <RouterLink to="">Phòng</RouterLink>
                </div>
            </div>
            <div class="md:w-2/10">
                <h1>Dịch Vụ Khách Hàng</h1>
                <div class="text-gray-500 flex flex-col gap-2 pt-5 text-sm">
                    <RouterLink to="">Phòng</RouterLink>
                    <RouterLink to="">Phòng</RouterLink>
                    <RouterLink to="">Phòng</RouterLink>
                    <RouterLink to="">Phòng</RouterLink>
                </div>
            </div>
            <div class="md:w-2/10">
                <h1>Liên Hệ Với Chúng Tôi</h1>
                <div class="flex flex-col gap-2 pt-5 text-sm text-gray-500">
                    <span>
                        <Phone class="w-4 h-4 inline-block" /> 0123456789
                    </span>
                    <span>
                        <Mail class="w-4 h-4 inline-block" /> email@gmail.com
                    </span>
                    <span>
                        <MapPin class="w-4 h-4 inline-block" /> 1F 16, Bà Điểm, Hóc Môn, Hồ Chí Minh
                    </span>
                </div>
            </div>
        </div>
        <hr>
        <div class="container mx-auto py-8 flex md:flex-row flex-col gap-5">
            <div class="md:w-1/2 flex md:justify-start justify-center">
                <h1 class="text-center text-gray-500">Copyright © 2025 BeeStay. All rights reserved.</h1>
            </div>
            <div class="md:w-1/2 flex md:justify-end justify-center gap-5 text-gray-500 text-sm">
                <RouterLink to="" class="border-r-1 pe-5 border-black">Facebook</RouterLink>
                <RouterLink to="" class="border-r-1 pe-5 border-black">Zalo</RouterLink>
                <RouterLink to="">Tiktok</RouterLink>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { Phone, Mail, MapPin } from 'lucide-vue-next';
</script>