<template>
    <section>
        <div class="bg-white my-5 ms-25 rounded-lg border px-4 py-6" v-if="authStore.user">
            <div class="pb-4">
                <div class="flex items-center gap-2">
                    <!-- <img src="@/assets/images/bin.png" alt="" class="rounded-full w-10"> -->
                    <h1 class="font-bold">{{ authStore.user.fullname }}</h1>
                </div>
                <div class="bg-muesli-400 px-4 py-2 mt-2 text-white rounded-lg" v-if="authStore.user.point !== 0">
                    <p class="flex items-center gap-2">
                        <CircleDollarSign class="w-4 h-4 inline-block" />Bạn là thành viên <span
                            class="font-bold">Đồng</span>
                        <ChevronRight class="ml-auto" />
                    </p>
                </div>
            </div>
            <hr>
            <div class="py-2 flex flex-col gap-2">
                <RouterLink to="/user/setting/point"
                    class="flex items-center gap-3 py-2 px-4 text-gray-700 hover:bg-muesli-100"
                    exact-active-class="bg-muesli-300 text-white hover:bg-muesli-300">
                    <CircleDollarSign class="w-4 h-4 inline-block" /> {{ authStore.user.point }} Điểm
                </RouterLink>
            </div>
            <hr>
            <div class="py-2 flex flex-col gap-2">
                <RouterLink to="/user/setting/historybooking"
                    class="flex items-center gap-3 py-2 px-4 text-gray-700 hover:bg-muesli-100"
                    exact-active-class="bg-muesli-300 text-white hover:bg-muesli-300">
                    <ClipboardList class="w-4 h-4 inline-block" /> Đặt Chổ Của Tôi
                </RouterLink>
                <RouterLink to="/user/setting/historypayment"
                    class="flex items-center gap-3 py-2 px-4 text-gray-700 hover:bg-muesli-100"
                    exact-active-class="bg-muesli-300 text-white hover:bg-muesli-300">
                    <ScrollText class="w-4 h-4 inline-block" /> Lịch Sử Giao Dịch
                </RouterLink>
                <RouterLink to="/user/setting/refund"
                    class="flex items-center gap-3 py-2 px-4 text-gray-700 hover:bg-muesli-100"
                    exact-active-class="bg-muesli-300 text-white hover:bg-muesli-300">
                    <Wallet class="w-4 h-4 inline-block" /> Hoàn Tiền
                </RouterLink>
                <RouterLink to="/user/setting/notification"
                    class="flex items-center gap-3 py-2 px-4 text-gray-700 hover:bg-muesli-100"
                    exact-active-class="bg-muesli-300 text-white hover:bg-muesli-300">
                    <Bell class="w-4 h-4 inline-block" /> Thông Báo
                </RouterLink>
            </div>
            <hr>
            <div class="pt-2 flex flex-col gap-2">
                <RouterLink to="/user/setting/profile"
                    class="flex items-center gap-3 py-2 px-4 text-gray-700 hover:bg-muesli-100"
                    exact-active-class="bg-muesli-300 text-white hover:bg-muesli-300">
                    <Settings class="w-4 h-4 inline-block" /> Cài Đặt
                </RouterLink>
                <button class="flex w-full items-center gap-3 py-2 px-4 text-gray-700 hover:bg-muesli-100"
                    exact-active-class="bg-muesli-300 text-white hover:bg-muesli-300" @click.prevent="handleLogout">
                    <LogOut class="w-4 h-4 inline-block" /> Đăng Xuất
                </button>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { ChevronRight, Router, User, CircleDollarSign, Wallet, Bell, TicketPercent, LogOut, ClipboardList, Settings, ScrollText } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth/login';
import { onMounted } from 'vue';
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
};

onMounted( async () => {
  await authStore.fetchUser();
});
</script>