<template>
    <section>
        <div class="p-5 flex flex-col gap-5">
            <div>
                <h1 class="text-2xl font-bold">Thông Báo</h1>
                <p class="text-gray-500">Các ưu đãi và cập nhật mới nhất từ khách sạn của bạn.</p>
            </div>
            <div class="bg-white flex flex-col gap-5 p-8 rounded-2xl shadow-lg">
                <div class="bg-blue-50 p-5 rounded-2xl flex border border-blue-500 hover:shadow-lg hover:shadow-blue-200 transform duration-300 relative">
                    <div class="w-1/6 flex items-center justify-center">
                        <Tags class="text-black rounded-full bg-blue-400 w-15 h-15 p-3"/>
                    </div>
                    <div class="w-5/6">
                        <h1 class="font-bold text-blue-700 text-2xl">Ưu đãi mùa hè</h1>
                        <p class="text-md">Giảm giá 30% cho tất cả các phòng suite khi đặt trong tháng 8. Nhanh tay đặt phòng để tận
                            hưởng kỳ nghỉ tuyệt vời!</p>
                        <p class="text-sm text-gray-500">Hạn chót: 31/08/2025</p>
                    </div>
                    <button class="absolute bottom-4 right-4 bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500">Xem Chi Tiết</button>
                </div>
                <div class="bg-green-50 p-5 rounded-2xl flex border border-green-500 hover:shadow-lg hover:shadow-green-200 transform duration-300 relative">
                    <div class="w-1/6 flex items-center justify-center">
                        <Tags class="text-black rounded-full bg-green-400 w-15 h-15 p-3"/>
                    </div>
                    <div class="w-5/6">
                        <h1 class="font-bold text-green-700 text-2xl">Ưu đãi mùa hè</h1>
                        <p class="text-md">Giảm giá 30% cho tất cả các phòng suite khi đặt trong tháng 8. Nhanh tay đặt phòng để tận
                            hưởng kỳ nghỉ tuyệt vời!</p>
                        <p class="text-sm text-gray-500">Hạn chót: 31/08/2025</p>
                    </div>
                    <button class="absolute bottom-4 right-4 bg-green-400 text-white py-2 px-4 rounded-md hover:bg-green-500">Xem Chi Tiết</button>
                </div>
                <div class="bg-gray-50 p-5 rounded-2xl flex border border-gray-500 hover:shadow-lg hover:shadow-gray-200 transform duration-300 relative">
                    <div class="w-1/6 flex items-center justify-center">
                        <Tags class="text-black rounded-full bg-gray-400 w-15 h-15 p-3"/>
                    </div>
                    <div class="w-5/6">
                        <h1 class="font-bold text-gray-700 text-2xl">Ưu đãi mùa hè</h1>
                        <p class="text-md">Giảm giá 30% cho tất cả các phòng suite khi đặt trong tháng 8. Nhanh tay đặt phòng để tận
                            hưởng kỳ nghỉ tuyệt vời!</p>
                        <p class="text-sm text-gray-500">Hạn chót: 31/08/2025</p>
                    </div>
                    <button class="absolute bottom-4 right-4 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500">Xem Chi Tiết</button>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { Tags } from 'lucide-vue-next';
</script>