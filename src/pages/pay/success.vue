<template>
    <div class="bg-gray-100 flex items-center justify-center h-screen"><!-- Main container for the success message -->
        <div class="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-md w-full text-center">
            <!-- Green checkmark icon -->
            <div class="mx-auto bg-green-100 rounded-full w-24 h-24 flex items-center justify-center">
                <svg class="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>

            <!-- Success message heading -->
            <h1 class="text-3xl font-bold text-gray-800 mt-6">Thanh toán thành công!</h1>

            <!-- Detailed message -->
            <p class="text-gray-600 mt-4 text-lg">
                Cảm ơn bạn đã mua hàng. Đơn hàng của bạn sẽ được xử lý và giao đến bạn trong thời gian sớm nhất.
            </p>

            <!-- Order details section (optional) -->
            <div class="mt-8 text-left bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-700">Chi tiết đơn hàng</h3>
                <p class="text-gray-600 mt-2">Mã đơn hàng: <span class="font-medium text-gray-800">####</span></p>
                <p class="text-gray-600">Tổng cộng: <span class="font-medium text-gray-800">******** VNĐ</span></p>
            </div>

            <!-- Back to home button -->
            <router-link :to="redirectPath"
                class="mt-8 inline-block w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300">
                Quay về trang chủ
            </router-link>
        </div>
    </div>

</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const redirectPath = computed(() => (route.meta.redirectPath || '/user/home'))
</script>