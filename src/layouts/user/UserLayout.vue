<template>
    <SidebarProvider>
        <div class="flex h-screen w-full overflow-hidden">
            <div class="py-5">
                <Sidebar class="lg:hidden md:hidden" />
            </div>
            <div class="flex-1 flex flex-col overflow-hidden bg-white">
                <div class="flex-1 overflow-y-auto flex flex-col">
                    <HeaderUser />
                    <div class="sticky top-0 z-30 bg-white shadow-md">
                        <HeaderUserTwo />
                    </div>
                    <div class="flex-1 bg-gray-100">
                        <RouterView />
                    </div>
                </div>
            </div>
        </div>
    </SidebarProvider>
</template>

<script setup>
import HeaderUser from '@/components/user/HeaderUser.vue';
import HeaderUserTwo from '@/components/user/HeaderUserTwo.vue';
import Sidebar from '@/components/administration/Sidebar.vue';
import { SidebarProvider } from "@/components/ui/sidebar";
</script>