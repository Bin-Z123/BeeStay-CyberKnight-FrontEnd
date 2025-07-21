<template>
  <SidebarProvider>
    <div class="flex h-screen w-full">
      <div class="py-5">
        <Sidebar />
      </div>
      <div class="bg-white w-full flex flex-col">
        <div class="sticky top-0 z-10 bg-white shadow-md">
          <Header></Header>
        </div>
        <div class="bg-gray-100 h-fit">
          <RouterView />
        </div>
      </div>
    </div>
  </SidebarProvider>
</template>
<script setup lang="ts">
import Header from "../../components/administration/Header.vue";
import Sidebar from "../../components/administration/Sidebar.vue";
import { SidebarProvider } from "@/components/ui/sidebar";
</script>
