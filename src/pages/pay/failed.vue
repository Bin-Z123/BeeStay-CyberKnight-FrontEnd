<template>
    <div class="bg-gray-100 flex items-center justify-center h-screen">
        <!-- Main container for the failure message -->
        <div class="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-md w-full text-center">
            <!-- Red X icon -->
            <div class="mx-auto bg-red-100 rounded-full w-24 h-24 flex items-center justify-center">
                <svg class="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </div>

            <!-- Failure message heading -->
            <h1 class="text-3xl font-bold text-gray-800 mt-6">Thanh toán thất bại!</h1>

            <!-- Detailed message -->
            <p class="text-gray-600 mt-4 text-lg">
                Đã có lỗi xảy ra trong quá trình xử lý thanh toán. Vui lòng kiểm tra lại thông tin của bạn.
            </p>

            <!-- Error details section (optional) -->
            <div class="mt-8 text-left bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 class="text-lg font-semibold text-red-800">Thông tin lỗi</h3>
                <p class="text-red-700 mt-2">Lý do: <span class="font-medium">Thông tin không hợp lệ.</span></p>
            </div>

            <!-- Try again button -->
            <router-link :to="redirectPath"
                class="mt-8 inline-block w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300">
                Thử lại
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
