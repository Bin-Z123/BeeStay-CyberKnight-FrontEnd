<template>
    <div class="lg:flex lg:container mx-auto pb-20">
        <div class="w-1/3 lg:block hidden">
            <Sidebar></Sidebar>
        </div>
        <div class="lg:w-2/3">
            <RouterView></RouterView>
        </div>
    </div>
    <hr class="text-muesli-400 bg-muesli-400 h-1">
</template>
<script setup>
import { RouterView } from "vue-router";
import Sidebar from "@/components/user/SidebarUserSetting.vue";
</script>