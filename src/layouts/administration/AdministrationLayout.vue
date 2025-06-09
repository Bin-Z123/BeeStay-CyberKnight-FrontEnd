<template>
  <div class="flex h-screen">
    <div class="bg-muesli-400 text-white py-5"><Sidebar /></div>
    <div class="bg-white w-full flex flex-col">
      <div>
        <Header></Header>
      </div>
      <div class="bg-gray-100 h-screen">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "../../components/administration/Header.vue";
import Sidebar from "../../components/administration/Sidebar.vue";
</script>
