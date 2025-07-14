<template>
    <section>
        <div class="pt-5 lg:ms-5 lg:me-25 mx-4">
            <h1 class="text-2xl font-bold">Điểm Thưởng Của Tôi</h1>
            <div class="flex flex-col lg:flex-row gap-2">
                <div class="lg:w-1/2 flex bg-muesli-300 py-4 rounded-lg px-4">
                    <div class="w-1/3 text-white flex flex-col justify-center py-6">
                        <p>Điểm Thưởng</p>
                        <p class="font-bold"><CircleDollarSign class="w-4 h-4 inline-block"/> 0 Điểm</p>
                    </div>
                    <div class="w-2/3 flex flex-col justify-start items-end">
                        <button class="bg-white text-muesli-300 py-1 px-4 rounded-2xl font-bold text-sm">Điểm Dùng Để Làm Gì?</button>
                    </div>
                </div>
                <div class="lg:w-1/2 flex bg-muesli-300 py-4 rounded-lg px-4 text-white">
                    <div class="flex flex-col justify-center items-center w-full gap-1">
                        <p>Tìm Hiểu Thêm Về <span class="font-bold">Điểm</span></p>
                        <p class="text-sm">Cách kiếm và đổi <span class="font-bold">Điểm</span></p>
                        <button class="bg-white text-muesli-300 py-1 px-4 rounded-2xl font-bold text-sm">Tìm Hiểu Thêm</button>
                    </div>
                </div>
            </div>

            <div>
                <h1 class="text-xl font-bold mt-5">Lịch Sử Tích Điểm</h1>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { ChevronDown, Router, User, CircleDollarSign, Wallet, TicketPercent, LogOut, ChevronRight } from 'lucide-vue-next';
</script>