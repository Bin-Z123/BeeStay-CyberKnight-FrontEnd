<template>
    <section>
        <div class="h-12 px-4 border-b flex items-center justify-between " v-if="authStore.isAuthenticated">
            <SidebarTrigger asChild></SidebarTrigger>
            <div class=" relative border border-muesli-500 px-2 py-1 rounded-xl  group w-fit flex ">
                <h1 class="flex flex-row items-center gap-1">
                    <CircleUserRound class="inline-block" />{{ authStore.user.role.roleName }} | {{
                        authStore.user.fullname }}
                    <ChevronRight class="inline-block group-hover:rotate-90 transition-all duration-200" />
                </h1>
                <div
                    class="flex flex-col gap-1 absolute top-full  right-0 rounded-sm invisible group-hover:visible group-hover:translate-y-0 w-full h-fit border border-muesli-500 bg-white transition-all translate-y-[-10px]  transform ">
                    <button class="text-start hover:bg-muesli-200 rounded-t-sm px-2">
                        <LogOut /><span>Đăng Xuất</span>
                    </button>
                    <button class="text-start hover:bg-muesli-200 rounded-b-sm px-2">Xem Web</button>
                </div>
            </div>
        </div>
        <hr class="text-muesli-400 bg-muesli-400 h-1">
    </section>
</template>
<script setup>
import { ChevronRight, LogOut } from 'lucide-vue-next';
import { CircleUserRound } from 'lucide-vue-next';
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/auth/login';

const authStore = useAuthStore();
</script>