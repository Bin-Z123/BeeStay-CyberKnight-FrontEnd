<template>
  <SidebarProvider>
    <div class="flex h-screen w-full">
      <div class="py-5">
        <Sidebar />
      </div>
      <div class="bg-white w-full flex flex-col">
        <div>
          <Header></Header>
        </div>
        <div class="bg-gray-100 h-screen">
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
